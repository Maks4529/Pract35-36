const _ = require('lodash');
const { literal, Op } = require('sequelize');
const createHttpError = require('http-errors');
const { Phone, Processor } = require('../database/models');

// CRUD
module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);

    if (!createdPhone) {
      // return res.status(400).send("Creation error!");
      next(createHttpError(400, 'Creation error!'));
    }

    const preparedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send(preparedPhone);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      limit,
      offset,
      order: [['yearOfManufacture', 'DESC']],
    });
    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPhoneById = await Phone.findByPk(id, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!foundPhoneById) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phone is not found' }]);
    }

    res.status(200).send({ data: foundPhoneById });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedPhonesCount, [updatedPhones]] = await Phone.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedPhonesCount) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phone is not found.' }]);
    }

    const preparedPhone = _.omit(updatedPhones, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPhonesCount = await Phone.destroy({ where: { id } });

    if (!deletedPhonesCount) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phone is not found.' }]);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//Filters
module.exports.getPhonesByYear = async (req, res, next) => {
  const { year } = req.params;
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;

  try {
    const foundPhones = await Phone.findAll({
      where: {
        yearOfManufacture: {
          [Op.between]: [start, end],
        },
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (foundPhones.length === 0) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phones not found.' }]);
    }

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhonesOlderThan = async (req, res, next) => {
  const { year } = req.params;
  const start = `${year}-01-01`;

  try {
    const foundPhones = await Phone.findAll({
      where: {
        yearOfManufacture: {
          [Op.lt]: start,
        },
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (foundPhones.length === 0) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phones not found.' }]);
    }

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhonesByYear = async (req, res, next) => {
  const {
    body,
    params: { year },
  } = req;
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;

  try {
    const [updatedPhonesCount, updatedPhones] = await Phone.update(body, {
      where: {
        yearOfManufacture: {
          [Op.between]: [start, end],
        },
      },
      raw: true,
      returning: true,
    });

    if (!updatedPhonesCount) {
      return res
        .status(404)
        .send({ status: 404, message: 'Phone is not found.' });
    }

    const preparedPhone = updatedPhones.map(phone =>
      _.omit(phone, ['createdAt', 'updatedAt'])
    );

    res.status(200).send(preparedPhone);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhonesByYear = async (req, res, next) => {
  const { year } = req.params;
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;

  try {
    const deletedPhonesCount = await Phone.destroy({
      where: {
        yearOfManufacture: {
          [Op.between]: [start, end],
        },
      },
    });

    if (!deletedPhonesCount) {
      return res
        .status(404)
        .send([{ status: 404, message: 'Phone is not found.' }]);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getProcessorPhones = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundProcessor = await Processor.findByPk(id);

    if (!foundProcessor) {
      return next(createHttpError(404, 'Processor not found.'));
    }

    const foundPhonesWithProcessor = await foundProcessor.getPhones({
      raw: true,
    });

    res.status(200).send(foundPhonesWithProcessor);
  } catch (err) {
    next(err);
  }
};
