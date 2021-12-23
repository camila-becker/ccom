const EmailFiliais = require("../models/EmailFiliais");

module.exports = {
  async index(req, res) {
    try {
      const emailFiliais = await EmailFiliais.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return res.json(emailFiliais);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async getEmailFilial(req, res) {
    try {
      const { filial } = req.query;
      const emailFiliais = await emailFiliais.findAll({
        where: {
          filial: {
            [Op.eq]: filial,
          },
        },
      });
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const { filial, email, nome, usuario } = req.body;

      const emailFiliais = await EmailFiliais.create({
        filial,
        email,
        nome,
        usuario,
        data: Date.now(),
      });
      return res.json(emailFiliais);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { filial, email, nome } = req.body;
      const emailFiliais = await emailFiliais.update(
        {
          filial,
          email,
          nome,
        },
        { where: { id } }
      );
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const emailFiliais = await EmailFiliais.destroy({ where: { id } });
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },
};
