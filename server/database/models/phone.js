'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate(models) {
      Phone.belongsTo(models.Processor, {
        foreignKey: 'processorId',
      })
    }
  }
  Phone.init({
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
      },
    },
    yearOfManufacture: {
      type: DataTypes.DATEONLY,
      validate: {
        isBefore: new Date().toISOString(),
      },
    },
    ramSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 24,
      },
    },
    screenDiagonal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
    isNfc: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    processorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'processors',
      key: 'id',
    },
  }

  }, {
    sequelize,
    modelName: 'Phone',
    underscored: true,
  });
  return Phone;
};