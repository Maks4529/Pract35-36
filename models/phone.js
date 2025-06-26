'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'Phone',
    underscored: true,
  });
  return Phone;
};