const { Model, DataTypes } = require("sequelize");

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        placa: DataTypes.STRING,
        vinculo: DataTypes.STRING,
        filial: DataTypes.STRING,
        canal: DataTypes.STRING,
        motivo: DataTypes.STRING,
        registro: DataTypes.STRING,
        data: DataTypes.DATE,
        usuario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "atendimentos_ccom",
      }
    );
  }
}

module.exports = Atendimento;
