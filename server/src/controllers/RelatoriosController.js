const { Op } = require("sequelize");
const Atendimentos = require("../models/Atendimentos");
const Ocorrencias = require("../models/Ocorrencias");
const Checklist = require("../models/Checklist");
const Viagem = require("../models/Viagem");
const DDRModel = require("../models/DDR");

module.exports = {
  async relatorioAtendimento(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const atendimento = await Atendimentos.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: dataInicio,
              [Op.lte]: dataFim,
            },
          },
        },
      });
      return res.json(atendimento);
    } catch (error) {
      console.log(error);
    }
  },

  async relatorioOcorrencia(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const ocorrencia = await Ocorrencias.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: dataInicio,
              [Op.lte]: dataFim,
            },
          },
        },
      });
      return res.json(ocorrencia);
    } catch (error) {
      console.log(error);
    }
  },

  async relatorioChecklist(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const checklist = await Checklist.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: dataInicio,
              [Op.lte]: dataFim,
            },
          },
        },
      });
      return res.json(checklist);
    } catch (error) {
      console.log(error);
    }
  },

  async relatorioViagemVazio(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const viagem = await Viagem.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: dataInicio,
              [Op.lte]: dataFim,
            },
          },
        },
        attributes: { exclude: ["status"] },
      });
      return res.json(viagem);
    } catch (error) {
      console.log(error);
    }
  },
  async relatorioDDR(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const ddr = await DDRModel.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: dataInicio,
              [Op.lte]: dataFim,
            },
          },
        },
      });
      return res.json(ddr);
    } catch (error) {
      console.log(error);
    }
  },
};
