const Viagem = require("../models/Viagem");
const nodemailer = require("nodemailer");

module.exports = {
  async index(req, res) {
    try {
      const viagem = await Viagem.findAll({
        raw: true,
        where: {
          status: "Aberto",
        },
        order: [["createdAt", "DESC"]],
      });
      return res.json(viagem);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        placa,
        motorista,
        estadoOrigem,
        cidadeOrigem,
        estadoDestino,
        cidadeDestino,
        distancia,
        nome,
        jornada,
        observacao,
        status,
      } = req.body;
      const output = `
      <p>Frota - Viagem vazio <strong>${placa ? placa : ""}</strong></p>
      <h3>Dados da viagem</h3>
      <ul>
        <li><strong>Autorizado por:</strong> ${nome ? nome : ""}</li>
        <li><strong>Placa do Cavalo:</strong> ${placa ? placa : ""}</li>
        <li><strong>Estado de Origem:</strong> ${
          estadoOrigem ? estadoOrigem : ""
        }</li>
        <li><strong>Cidade de Origem:</strong> ${
          cidadeOrigem ? cidadeOrigem : ""
        }</li>
        <li><strong>Estado de Destino:</strong> ${
          estadoDestino ? estadoDestino : ""
        }</li>
        <li><strong>Cidade de Destino:</strong> ${
          cidadeDestino ? cidadeDestino : ""
        }</li>
        <li><strong>Distancia a percorrer:</strong> ${
          distancia ? distancia : ""
        }</li>
        <li><strong>Observação:</strong> ${observacao ? observacao : ""}</li>
        <li><strong>Controle de Jornada:</strong> ${jornada ? jornada : ""}</li>
      </ul>
    `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ccom.viagens@gmail.com",
          pass: "ccom2020",
        },
      });
      transporter
        .sendMail({
          from: "Viagem Vazio <ccom.viagens@gmail.com>",
          to:
            "ccom.controle@modular.com.br, ccom.gestao@modular.com.br, giulian@modular.com.br",
          cc: `alexsandro.velho@modular.com.br, everson.fernandes@modular.com.br, adilson.eichendorf@modular.com.br, frota.controle@modular.com.br, gabriel.maia@modular.com.br, frota.monitoramento@modular.com.br`,
          subject: `Veículo em viagem vazio - ${placa}`,
          text: "",
          html: output,
        })
        .then((message) => {
          console.log(message);
        })
        .catch((err) => {
          console.log(err);
        });

      const viagem = await Viagem.create({
        placa,
        motorista,
        estadoOrigem,
        cidadeOrigem,
        estadoDestino,
        cidadeDestino,
        distancia,
        nome,
        jornada,
        observacao,
        status,
        data: Date.now(),
      });
      return res.json(viagem);
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  },
  async changeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const viagem = await Viagem.update({ status }, { where: { id } });
      return res.json(viagem);
    } catch (error) {
      console.log(error);
    }
  },
};
