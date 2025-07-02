'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Processor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Processor.init({
    model: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    frequencyGHz: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Processor',
    underscored: true,
  });
  return Processor;
};