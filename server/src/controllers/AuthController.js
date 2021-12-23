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
  async authenticate(req, res) {
    try {
      const { usuario, senha } = req.body;
      const user = await Usuarios.findOne({ where: { usuario } });
      const validPassword = await bcrypt.compare(senha, user.senha);
      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado!" });
      }
      if (!validPassword) {
        return res.status(400).send({ message: "Senha inválida!" });
      }
      res.status(200).send({
        message: "Login efetuado com sucesso",
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      res.status(500).send({
        message:
          "Não foi possível fazer o login, verifique seu usuário e senha!",
      });
    }
},
  validateSession(req, res, next) {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      res
        .status(401)
        .send({ message: "Sua sessão é inválida ou está expirada" });
      return;
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send({ message: "Sua sessão é inválida ou está expirada" });
      }

      req.data = decoded;

      next();
    });
  },
};
