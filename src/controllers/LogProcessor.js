const Axios = require('axios');
const async = require('async');

const processLogs = ({ urls = [], maxParallelLimit = 10 }) => {
  try {
    for(url of urls) {
      console.log(url);
    }
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