"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("checklist_ccom", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      placa_carreta1: {
        type: Sequelize.STRING,
      },
      placa_carreta2: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero_rastreador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tecnologia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vinculo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivo: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      base: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.DATE,
      },
      validade: {
        type: Sequelize.STRING,
      },
      usuario: {
        type: Sequelize.STRING,
      },
      plataforma: {
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
    return queryInterface.dropTable("checklist_ccom");
  },
};
