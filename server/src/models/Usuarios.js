const { Model, DataTypes } = require("sequelize");

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        usuario: DataTypes.STRING,
        senha: DataTypes.STRING,
        permissao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "usuarios_ccom",
      }
    );
  }
}

module.exports = Usuarios;
