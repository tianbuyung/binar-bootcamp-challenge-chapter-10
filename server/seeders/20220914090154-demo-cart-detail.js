'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const newData = [];

    for (let i = 0; i < 20; i++) {
      const seedData = {
        CartId: Math.floor(Math.random() * 5) + 1,
        ProductId: Math.floor(Math.random() * 20) + 1,
        qty: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      newData.push(seedData);
    }

    await queryInterface.bulkInsert('CartDetails', newData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CartDetails', null, {});
  }
};
