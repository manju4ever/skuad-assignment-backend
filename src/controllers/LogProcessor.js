const Axios = require('axios');
const PromisePool = require('@supercharge/promise-pool');


const generateTimeMap = (intervalInMinutes = 15) => {
  const result = {};
  const hours = new Array(24).fill(0).map((rec, idx) => idx);
  const intervals = new Array(Math.ceil(60 / intervalInMinutes)).fill(0).map((rec, idx) => idx * intervalInMinutes)
  for(let i = 0; i < hours.length; i++) {
    result[hours[i]] = {};
    intervals.forEach(interval => result[hours[i]][interval] = {})
  }
  return result;
}

class LogProcessor {
  constructor() {
    this.finalResult = [];
    this.timeMap = generateTimeMap(15);
  }
  process(records = []) {
    console.log(records);
    console.log(`Total Records:`, records.length);
    const sorted = records.map(line => line.split(' '))
           .map(([ start, end , exception]) => [parseInt(start), parseInt(end), exception])
           .sort((recA, recB) =>  recA[0] - recB[0]);
    sorted.map(([start, end, exception]) => {
      const someDateTime = new Date(start);
      console.log(someDateTime.getUTCHours(), someDateTime.getUTCMinutes());
      // I'm stuck here but i started programming late, i can do this :)
    });
  }
  getSortedResults() {
    return this.finalResult;
  }
}

const x = new LogProcessor();


const processLogs = async ({ urls = [], maxParallelLimit = 15 }) => {
  try {
    const processor = new LogProcessor();
    await PromisePool
              .for(urls)
              .withConcurrency(maxParallelLimit)
              .process(async (logUrl) => {
                console.log(`Fetching for:`, logUrl);
                try {
                  const { data: logs } = await Axios.get(logUrl);
                  return processor.process(logs.split(`\r\n`))
                } catch(err) {
                  console.error(`[processLogs] Cannot fetch logs from one of the specified URL's`, err);
                }
              });
    return processor.finalResult;
  }catch(err) {
    console.error(`[processLogs] Something went wrong`, err);
    return err;
  }
};

module.exports = {
  processLogs,
}