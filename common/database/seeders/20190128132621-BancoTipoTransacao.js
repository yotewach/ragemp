'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BankTypeTransaction', [{
      id: '1',
      name: 'Credit',
      identifier: 'credit',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    }, {
      id: '2',
      name: 'Debit',
      identifier: 'debit',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
