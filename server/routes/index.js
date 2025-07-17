const {Router} = require('express');
const phonesRouter = require('./phonesRouter');
const processorsRouter = require('./processorsRouter');

const router = Router();
router.use('/phones', phonesRouter);
router.use('/processors', processorsRouter);

module.exports = router;