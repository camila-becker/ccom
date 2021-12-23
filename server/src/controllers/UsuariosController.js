const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const Usuarios = require("../models/Usuarios");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async index(req, res) {
    try {
      const usuarios = await Usuarios.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return res.json(usuarios);
    } catch (error) {
      res.status(400).json({ error: "Nenhum usuário encontrado!" });
    }
  },

  async store(req, res) {
    try {
      const { nome, usuario, senha, permissao } = req.body;
      await Usuarios.findOne({ where: { usuario } }).then((user) => {
        if (user == undefined) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(senha, salt);

          const newUser = Usuarios.create({
            nome,
            usuario,
            senha: hash,
            permissao,
          }).then(() => {
            return res
              .status(200)
              .json({ newUser, token: generateToken({ id: user.id }) });
          });
        } else {
          res.redirect("/cadastros");
        }
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, usuario, senha, permissao } = req.body;
      const usuarios = await Usuarios.update(
        {
          nome,
          usuario,
          senha,
          permissao,
        },
        { where: { id } }
      );
      return res.json(usuarios);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuarios = await Usuarios.destroy({ where: { id } });
      return res.json(usuarios);
    } catch (error) {
      console.log(error);
    }
  },
};
