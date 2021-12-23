const { Model, DataTypes } = require("sequelize");

class Ocorrencia extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        placa: DataTypes.STRING,
        expresso: DataTypes.STRING,
        origem: DataTypes.STRING,
        destino: DataTypes.STRING,
        gerenciadora: DataTypes.STRING,
        smp: DataTypes.STRING,
        valor: DataTypes.STRING,
        vinculo: DataTypes.STRING,
        filial: DataTypes.STRING,
        canal: DataTypes.STRING,
        motivo: DataTypes.STRING,
        registro: DataTypes.STRING,
        tipo: DataTypes.STRING,
        data: DataTypes.DATE,
        usuario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "ocorrencias_ccom",
      }
    );
  }
}

module.exports = Ocorrencia;
