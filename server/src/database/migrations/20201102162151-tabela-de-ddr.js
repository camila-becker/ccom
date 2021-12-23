"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("DDRs_ccom", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cliente: {
        type: Sequelize.STRING,
      },
      responsavel: {
        type: Sequelize.STRING,
      },
      cnpj: {
        type: Sequelize.STRING,
      },
      seguradora: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      assinaturas: {
        type: Sequelize.STRING,
      },
      intranet: {
        type: Sequelize.STRING,
      },
      apisul: {
        type: Sequelize.STRING,
      },
      clicktrans: {
        type: Sequelize.STRING,
      },
      recebimento: {
        type: Sequelize.STRING,
      },
      vencimento: {
        type: Sequelize.STRING,
      },
      observacao: {
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
    return queryInterface.dropTable("DDRs_ccom");
  },
};
