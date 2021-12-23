const { Model, DataTypes } = require("sequelize");

class Feedback extends Model {
  static init(sequelize) {
    super.init(
      {
        colaborador: DataTypes.STRING,
        motivo: DataTypes.STRING,
        observacao: DataTypes.STRING,
        expectativas: DataTypes.STRING,
        data: DataTypes.DATE,
        usuario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "feedbacks_ccom",
      }
    );
  }
}

module.exports = Feedback;
