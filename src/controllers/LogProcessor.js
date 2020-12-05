const Axios = require('axios');
const async = require('async');

const processLogs = ({ urls = [], maxParallelLimit = 10 }) => {
  try {
    console.log(`Processing following URL(s):`);
    urls.map((url, idx) => console.log(`-${idx+1}. - ${url}`));
    return [{
      timestamp:'21:15-21:30',
      "exception": "IllegalAgrumentsException",
      "count": 1
    }];
  }catch(err) {
    console.error(`[processLogs] Something went wrong`, err);
    return err;
  }
};

module.exports = {
  processLogs,
}