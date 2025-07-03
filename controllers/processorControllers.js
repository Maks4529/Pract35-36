const {Processor} = require('./../models');

module.exports.getProcessors = async (req, res, next) => {
    try {
       const foundProcessors = await Processor.findAll({
        raw: true,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        include: 'Phones',
       });

       res.status(200).send(foundProcessors);
    } catch (err) {
        next(err);
    }
};