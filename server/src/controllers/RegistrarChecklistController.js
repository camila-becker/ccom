const Checklist = require("../models/Checklist");
const nodemailer = require("nodemailer");
const { addDaysToDate } = require("../helpers");

module.exports = {
  async index(req, res) {
    try {
      const checklist = await Checklist.findAll();
      return res.json(checklist);
    } catch (error) {
      res.status(400).json({ error: "Nenhum registro encontrado!" });
    }
  },

  async store(req, res) {
    try {
      const {
        email,
        email2,
        placa,
        placaCarreta1,
        placaCarreta2,
        tipo,
        numeroRastreador,
        tecnologia,
        vinculo,
        nome,
        filial,
        motivo,
        status,
        base,
        usuario,
        plataforma,
      } = req.body;
      const output = `
      <h3>Resultado Checklist <strong>${placa}</strong> / <strong>${filial}</strong></h3>
      <h1>${status}</h1>
      <h3>Observação: ${motivo !== undefined ? motivo : ""}</h3>
      <h3>Dados do checklist</h3>
      <ul>
        <li><strong>Placa do Cavalo:</strong> ${placa}</li>
        <li><strong>Placa da Carreta 1:</strong> ${placaCarreta1}</li>
        <li><strong>Placa da Carreta 2:</strong> ${placaCarreta2}</li>
        <li><strong>Tipo de Veículo:</strong> ${tipo}</li>
        <li><strong>Número do Rastreador:</strong> ${numeroRastreador}</li>
        <li><strong>Tecnologia:</strong> ${tecnologia}</li>
        <li><strong>Vínculo do motorista:</strong> ${vinculo}</li>
        <li><strong>Quem solicitou o teste:</strong> ${nome}</li>
        <li><strong>Filial:</strong> ${filial}</li>
        <li><strong>Status:</strong> ${status}</li>
        <li><strong>Realizado por:</strong> ${base}</li>
      </ul>
    `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ccom.checklists@gmail.com",
          pass: "ccom092018",
        },
      });
      transporter
        .sendMail({
          from: "Checklist CCOM <ccom.checklists@gmail.com>",
          to: `${email}, ${email2}, ccom.controle@modular.com.br, ccom.gestao@modular.com.br`,
          subject: `Checklist veículo: ${placa}`,
          text: "",
          html: output,
        })
        .then((message) => {
          console.log(message);
        })
        .catch((err) => {
          console.log(err);
        });
      const checklist = await Checklist.create({
        placa,
        placaCarreta1,
        placaCarreta2,
        tipo,
        numeroRastreador,
        tecnologia,
        vinculo,
        nome,
        filial,
        motivo,
        status,
        base,
        usuario,
        plataforma,
        data: Date.now(),
        validade: addDaysToDate(30),
      });
      console.log(checklist);
      return res.json(checklist);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Não foi possível registrar o checklist!" });
      console.log(error);
    }
  },
};
