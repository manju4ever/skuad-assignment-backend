const Joi = require('@hapi/joi');
const LogProcessor = require('../controllers/LogProcessor');

// Schema of the payload to be verified before processing
const ProcessLogsSchema = Joi.object().keys({
  logFiles: 
      Joi.array()
            .unique()
            .min(1)
            .max(30)
            .items(Joi.string().uri())
            .required(),
  parallelFileProcessingCount: 
      Joi.number()
            .integer()
            .min(1)
            .max(15)
            .required()
});

// Primary Routes definition, can also expand from other routes
const Routes = [{
  path: '/api/process-logs',
  method: 'GET',
  config: {
    validate: {
      payload: ProcessLogsSchema,
    }
  },
  handler: async (request, h) => {
    try {
        return h.response(await LogProcessor.processLogs);
    }catch(err) {
      return err;
    }
  }
}];

module.exports = Routes;