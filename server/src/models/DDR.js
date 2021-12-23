const { Model, DataTypes } = require("sequelize");

class DDR extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        seguradora: DataTypes.STRING,
        status: DataTypes.STRING,
        assinaturas: DataTypes.STRING,
        intranet: DataTypes.STRING,
        apisul: DataTypes.STRING,
        clicktrans: DataTypes.STRING,
        recebimento: DataTypes.STRING,
        vencimento: DataTypes.STRING,
        observacao: DataTypes.STRING,
        data: DataTypes.DATE,
        usuario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "DDRs_ccom",
      }
    );
  }
}

module.exports = DDR;
