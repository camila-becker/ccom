"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("feedbacks_ccom", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      colaborador: {
        type: Sequelize.STRING,
      },
      motivo: {
        type: Sequelize.STRING,
      },
      observacao: {
        type: Sequelize.STRING,
      },
      expectativas: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.DATE,
      },
      usuario: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("feedbacks_ccom");
  },
};
