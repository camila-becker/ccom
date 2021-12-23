const Atendimento = require("../models/Atendimentos");

module.exports = {
  async index(req, res) {
    try {
      const atendimento = await Atendimento.findAll({
        raw: true,
        order: [["data", "DESC"]],
      });
      return res.json(atendimento);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        nome,
        placa,
        vinculo,
        filial,
        canal,
        motivo,
        registro,
        usuario,
      } = req.body;
      const atendimento = await Atendimento.create({
        nome,
        placa,
        vinculo,
        filial,
        canal,
        motivo,
        registro,
        usuario,
        data: Date.now(),
      });
      return res.json(atendimento);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const atendimento = await Atendimento.destroy({ where: { id } });
      return res.json(atendimento);
    } catch (error) {
      console.log(error);
    }
  },
};
