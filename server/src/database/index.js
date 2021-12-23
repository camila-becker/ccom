const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Atendimentos = require("../models/Atendimentos");
const Ocorrencias = require("../models/Ocorrencias");
const Checklist = require("../models/Checklist");
const Usuarios = require("../models/Usuarios");
const SolicitarChecklist = require("../models/SolicitarChecklist");
const Viagem = require("../models/Viagem");
const DDRModel = require("../models/DDR");
const EmailFiliais = require("../models/EmailFiliais");
const Feedback = require("../models/Feedback");

const conexao = new Sequelize(dbConfig);

Atendimentos.init(conexao);
Ocorrencias.init(conexao);
Checklist.init(conexao);
Usuarios.init(conexao);
SolicitarChecklist.init(conexao);
Viagem.init(conexao);
DDRModel.init(conexao);
EmailFiliais.init(conexao);
Feedback.init(conexao);

module.exports = conexao;
