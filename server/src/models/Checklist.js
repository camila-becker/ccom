const { Model, DataTypes } = require("sequelize");

class Checklist extends Model {
  static init(sequelize) {
    super.init(
      {
        placa: DataTypes.STRING,
        placaCarreta1: DataTypes.STRING,
        placaCarreta2: DataTypes.STRING,
        tipo: DataTypes.STRING,
        numeroRastreador: DataTypes.STRING,
        tecnologia: DataTypes.STRING,
        vinculo: DataTypes.STRING,
        nome: DataTypes.STRING,
        filial: DataTypes.STRING,
        motivo: DataTypes.STRING,
        status: DataTypes.STRING,
        base: DataTypes.STRING,
        data: DataTypes.DATE,
        validade: DataTypes.STRING,
        usuario: DataTypes.STRING,
        plataforma: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "checklist_ccom",
      }
    );
  }
}

module.exports = Checklist;
