const Joi = require('@hapi/joi');
const LogProcessor = require('../controllers/LogProcessor');

// Schema of the payload to be verified before processing
const ProcessLogsSchema = Joi.object().keys({
  logFiles: 
      Joi.array()
            .items(Joi.string().uri())
            .min(1)
            .max(30)
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
  path: '/api/process-logs/',
  method: 'POST',
  config: {
    validate: {
      payload: ProcessLogsSchema,
      options: {
        allowUnknown: true,
      },
    }
  },
  handler: async (request, h) => {
    try {
        const { logFiles, parallelFileProcessingCount } = request.payload;
        return h.response(await LogProcessor.processLogs({
          urls: logFiles,
          maxParallelLimit: parallelFileProcessingCount,
        }));
    }catch(err) {
      return err;
    }
  }
}];

module.exports = Routes;