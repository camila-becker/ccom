const { Model, DataTypes } = require("sequelize");

class Viagem extends Model {
  static init(sequelize) {
    super.init(
      {
        placa: DataTypes.STRING,
        motorista: DataTypes.STRING,
        estadoOrigem: DataTypes.STRING,
        cidadeOrigem: DataTypes.STRING,
        estadoDestino: DataTypes.STRING,
        cidadeDestino: DataTypes.STRING,
        distancia: DataTypes.STRING,
        nome: DataTypes.STRING,
        jornada: DataTypes.STRING,
        observacao: DataTypes.STRING,
        status: DataTypes.STRING,
        data: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "viagem_vazio",
      }
    );
  }
}

module.exports = Viagem;
