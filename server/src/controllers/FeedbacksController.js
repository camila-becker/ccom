const Feedback = require("../models/Feedback");

module.exports = {
  async index(req, res) {
    try {
      const feedback = await Feedback.findAll({
        raw: true,
        order: [["data", "DESC"]],
      });
      return res.json(feedback);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        colaborador,
        motivo,
        observacao,
        expectativas,
        usuario,
      } = req.body;
      const feedback = await Feedback.create({
        colaborador,
        motivo,
        observacao,
        expectativas,
        usuario,
        data: Date.now(),
      });
      return res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { colaborador, motivo, observacao, expectativas } = req.body;
      const feedbacks = await Feedback.update(
        {
            colaborador,
            motivo,
            observacao,
            expectativas,
        },
        { where: { id } }
      );
      return res.json(feedbacks);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const feedback = await Feedback.destroy({ where: { id } });
      return res.json(feedback);
    } catch (error) {
      console.log(error);
    }
  },
};
