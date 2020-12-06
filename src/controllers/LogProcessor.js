const Axios = require('axios');
const PromisePool = require('@supercharge/promise-pool');

const generateTimeMap = (intervalInMinutes = 15) => {
  const result = {};
  const hours = new Array(24).fill(0).map((rec, idx) => idx);
  const intervals = new Array(Math.ceil(60 / intervalInMinutes)).fill(0).map((rec, idx) => idx * intervalInMinutes);
  for(let i = 0; i < hours.length; i++) {
    result[hours[i]] = {};
    intervals.forEach(interval => result[hours[i]][interval] = []);
  }
  return result;
}

class LogProcessor {
  constructor() {
    this.timeMap = generateTimeMap(15);
  }
  whichInterval(minutes) {
    if(minutes >=15 && minutes < 30) return '15';
    if(minutes >=30 && minutes < 45) return '30';
    if(minutes >=45 && minutes <= 59) return '45';
    return '0';
  }
  process(records = []) {
    console.log(`-- Total Records to process:`, records.length);
    const sorted = records.map(line => line.split(' '))
           .map(([ start, end , exception]) => [parseInt(start), parseInt(end), exception])
           .sort((recA, recB) =>  recA[0] - recB[0]);
    sorted.map(([start, end, exception]) => {
      const startTime = new Date(start), endTime = new Date(end);
      this.timeMap[startTime.getUTCHours()][this.whichInterval(startTime.getUTCMinutes())].push(exception);
    });
  }
  getSortedResults() {
    const minuteIntervals = [0, 15, 30, 45];
    const TIME_MAP = Object.assign({}, this.timeMap); // For Immutablility
    // Step 1  - Assign 15 minute intervals with their values
    const interval_division_map = Object.keys(this.timeMap).map(eachHour => {
       let interim_result = {};
       minuteIntervals.forEach(minuteInterval => { 
        interim_result[`${eachHour}:${minuteInterval}-${eachHour}:${minuteInterval+15 === 60 ? 59: minuteInterval+15}`] = this.timeMap[eachHour][minuteInterval];
       });
       return interim_result;
    });
    // Step 2 - Filter only those which have exceptions
    const TIME_MAP_AVAILABLE = interval_division_map.reduce((finalRes, eachIntervalSet) => {
      let res = {};
      Object.keys(eachIntervalSet).forEach(split => {
        if(eachIntervalSet[split].length) {
          res[split] = eachIntervalSet[split]
        }
      });
      return Object.keys(res).length ? {...finalRes, ...res} : finalRes;
    }, {});
    // Step 3 - Lexically Sort the exceptions with their counts
    const finalResult = Object.keys(TIME_MAP_AVAILABLE).reduce((finalRes, eachIntervalDivision) => {
      const unique_exceptions = Array.from(new Set(TIME_MAP_AVAILABLE[eachIntervalDivision]));
      const res_interim = unique_exceptions.map(exception => {
        return {
          name: exception,
          count: TIME_MAP_AVAILABLE[eachIntervalDivision].filter(type => type === exception).length,
        }
      });
      return {
        ...finalRes,
        [eachIntervalDivision]: res_interim,
      }
    }, {});
    return finalResult;
  }
}

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
    return processor.getSortedResults();
  }catch(err) {
    console.error(`[processLogs] Something went wrong`, err);
    return err;
  }
};

module.exports = {
  processLogs,
}