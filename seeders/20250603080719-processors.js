'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('processors', [
    {
    model: 'Snapdragon 8 Gen 2',
    manufacturer: 'Qualcomm',
    frequency_ghz: 3.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    model: 'A17 Pro',
    manufacturer: 'Apple',
    frequency_ghz: 3.78,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    model: 'Exynos 2200',
    manufacturer: 'Samsung',
    frequency_ghz: 2.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    model: 'Dimensity 9200+',
    manufacturer: 'MediaTek',
    frequency_ghz: 3.35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    model: 'Kirin 9000',
    manufacturer: 'Huawei',
    frequency_ghz: 3.13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processors', null, {});
  }
};
