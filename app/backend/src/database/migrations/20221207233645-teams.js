'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'team_name',
      },
    }, { underscored: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
