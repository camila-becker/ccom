const { Model, DataTypes } = require("sequelize");

class EmailFiliais extends Model {
  static init(sequelize) {
    super.init(
      {
        filial: DataTypes.STRING,
        email: DataTypes.STRING,
        nome: DataTypes.STRING,
        data: DataTypes.DATE,
        usuario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "email_filiais",
      }
    );
  }
}

module.exports = EmailFiliais;
