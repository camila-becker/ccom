"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("atendimentos_ccom", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
      },
      placa: {
        type: Sequelize.STRING,
      },
      vinculo: {
        type: Sequelize.STRING,
      },
      filial: {
        type: Sequelize.STRING,
      },
      canal: {
        type: Sequelize.STRING,
      },
      motivo: {
        type: Sequelize.STRING,
      },
      registro: {
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
    return queryInterface.dropTable("atendimentos_ccom");
  },
};
