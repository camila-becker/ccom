"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("ocorrencias_ccom", {
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
      expresso: {
        type: Sequelize.STRING,
      },
      origem: {
        type: Sequelize.STRING,
      },
      destino: {
        type: Sequelize.STRING,
      },
      gerenciadora: {
        type: Sequelize.STRING,
      },
      smp: {
        type: Sequelize.STRING,
      },
      valor: {
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
      tipo: {
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
    return queryInterface.dropTable("ocorrencias_ccom");
  },
};
