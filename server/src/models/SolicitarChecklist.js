const { Model, DataTypes } = require("sequelize");

class SolicitarChecklist extends Model {
  static init(sequelize) {
    super.init(
      {
        protocolo: DataTypes.STRING,
        email: DataTypes.STRING,
        email2: DataTypes.STRING,
        placa: DataTypes.STRING,
        placaCarreta1: DataTypes.STRING,
        placaCarreta2: DataTypes.STRING,
        tipo: DataTypes.STRING,
        numeroRastreador: DataTypes.STRING,
        tecnologia: DataTypes.STRING,
        vinculo: DataTypes.STRING,
        nome: DataTypes.STRING,
        motorista: DataTypes.STRING,
        telefone: DataTypes.STRING,
        filial: DataTypes.STRING,
        observacao: DataTypes.STRING,
        status: DataTypes.STRING,
        data: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "solicitar_checklist",
      }
    );
  }
}

module.exports = SolicitarChecklist;
