"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("solicitar_checklist", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      protocolo: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      email2: {
        type: Sequelize.STRING,
      },
      placa: {
        type: Sequelize.STRING,
      },
      placa_carreta1: {
        type: Sequelize.STRING,
      },
      placa_carreta2: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      numero_rastreador: {
        type: Sequelize.STRING,
      },
      tecnologia: {
        type: Sequelize.STRING,
      },
      vinculo: {
        type: Sequelize.STRING,
      },
      nome: {
        type: Sequelize.STRING,
      },
      motorista: {
        type: Sequelize.STRING,
      },
      telefone: {
        type: Sequelize.STRING,
      },
      filial: {
        type: Sequelize.STRING,
      },
      observacao: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Aberto",
      },
      data: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("solicitar_checklist");
  },
};
