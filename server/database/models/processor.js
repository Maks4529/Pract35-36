'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Processor extends Model {
    static associate(models) {
      Processor.hasMany(models.Phone, {
        foreignKey: {
          name: 'processorId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    }
  }
  Processor.init({
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    frequencyGHz: {
      type:DataTypes.FLOAT,
    field: 'frequency_ghz',
  },
  }, {
    sequelize,
    modelName: 'Processor',
    underscored: true,
  });
  return Processor;
};