const { Processor } = require('../database/models');

module.exports.getProcessors = async (req, res, next) => {
  try {
    const foundProcessors = await Processor.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: 'Phones',
    });

    res.status(200).send({data: foundProcessors});
  } catch (err) {
    next(err);
  }
};
