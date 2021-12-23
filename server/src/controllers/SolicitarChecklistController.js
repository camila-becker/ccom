const SolicitarChecklist = require("../models/SolicitarChecklist");
const nodemailer = require("nodemailer");
const { date } = require("../helpers");

module.exports = {
  async index(req, res) {
    try {
      const checklist = await SolicitarChecklist.findAll({
        raw: true,
        where: {
          status: "Aberto",
        },
        order: [["data", "ASC"]],
      });
      return res.json(checklist);
    } catch (error) {
      res.status(400).json({ error: "Checklist não encontrado" });
    }
  },
  async store(req, res) {
    try {
      const {
        protocolo,
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
        motorista,
        telefone,
        filial,
        observacao,
        status,
      } = req.body;
      const output = `
      <p>Solicitação de Checklist <strong>${placa}</strong> / <strong>${filial}</strong></p>
      <h1>Protocolo: ${protocolo}</h1>
      <h3>Dados do checklist</h3>
      <ul>
        <li><strong>Placa do Cavalo:</strong> ${placa}</li>
        <li><strong>Placa da Carreta 1:</strong> ${
          placaCarreta1 !== undefined ? placaCarreta1 : ""
        }</li>
        <li><strong>Placa da Carreta 2:</strong> ${
          placaCarreta2 !== undefined ? placaCarreta2 : ""
        }</li>
        <li><strong>Tipo de Veículo:</strong> ${tipo}</li>
        <li><strong>Número do Rastreador:</strong> ${numeroRastreador}</li>
        <li><strong>Tecnologia:</strong> ${tecnologia}</li>
        <li><strong>Nome do Motorista:</strong> ${motorista}</li>
        <li><strong>Telefone do Motorista:</strong> ${telefone}</li>
        <li><strong>Vínculo do motorista:</strong> ${vinculo}</li>
        <li><strong>Quem solicitou o teste:</strong> ${nome}</li>
        <li><strong>Filial:</strong> ${filial}</li>
        <li><strong>Observação:</strong> ${
          observacao !== undefined ? observacao : ""
        }</li>
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
      const checklist = await SolicitarChecklist.create({
        protocolo,
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
        motorista,
        telefone,
        filial,
        observacao,
        status,
        data: date(),
      });
      res.json(checklist);
      transporter
        .sendMail({
          from: "Checklist CCOM <ccom.checklists@gmail.com>",
          to: `${email}, ccom.controle@modular.com.br, ccom.gestao@modular.com.br`,
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
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const checklist = await SolicitarChecklist.findByPk(id);
      return res.json(checklist);
    } catch (error) {
      console.log(error);
    }
  },
  async changeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const checklist = await SolicitarChecklist.update(
        { status },
        { where: { id } }
      );
      return res.json(checklist);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const checklist = await SolicitarChecklist.destroy({ where: { id } });
      return res.json(checklist);
    } catch (error) {
      console.log(error);
    }
  },
};
