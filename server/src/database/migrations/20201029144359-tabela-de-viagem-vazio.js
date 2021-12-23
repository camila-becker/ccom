"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("viagem_vazio", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING,
      },
      motorista: {
        type: Sequelize.STRING,
      },
      estado_origem: {
        type: Sequelize.STRING,
      },
      cidade_origem: {
        type: Sequelize.STRING,
      },
      estado_destino: {
        type: Sequelize.STRING,
      },
      cidade_destino: {
        type: Sequelize.STRING,
      },
      distancia: {
        type: Sequelize.STRING,
      },
      nome: {
        type: Sequelize.STRING,
      },
      jornada: {
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
    return queryInterface.dropTable("viagem_vazio");
  },
};
