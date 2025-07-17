const {Router} = require('express');
const {processorControllers} = require('./../controllers');

const processorsRouter = Router();

processorsRouter.get('/', processorControllers.getProcessors);

module.exports = processorsRouter;