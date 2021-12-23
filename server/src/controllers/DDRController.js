const DDRModel = require("../models/DDR");

module.exports = {
  async index(req, res) {
    try {
      const ddr = await DDRModel.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return res.json(ddr);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        cliente,
        responsavel,
        cnpj,
        seguradora,
        status,
        assinaturas,
        intranet,
        apisul,
        clicktrans,
        recebimento,
        vencimento,
        observacao,
        usuario,
      } = req.body;
      const ddr = await DDRModel.create({
        cliente,
        responsavel,
        cnpj,
        seguradora,
        status,
        assinaturas,
        intranet,
        apisul,
        clicktrans,
        recebimento,
        vencimento,
        observacao,
        usuario,
        data: Date.now(),
      });
      return res.json(ddr);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        cliente,
        responsavel,
        cnpj,
        seguradora,
        liberado,
        assinaturas,
        intranet,
        apisul,
        clicktrans,
        recebimento,
        vencimento,
        observacao,
      } = req.body;
      const ddr = await DDRModel.update(
        {
          cliente,
          responsavel,
          cnpj,
          seguradora,
          liberado,
          assinaturas,
          intranet,
          apisul,
          clicktrans,
          recebimento,
          vencimento,
          observacao,
        },
        { where: { id } }
      );
      return res.json(ddr);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const ddr = await DDRModel.destroy({ where: { id } });
      return res.json(ddr);
    } catch (error) {
      console.log(error);
    }
  },
};
