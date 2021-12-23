const express = require("express");
const routes = express.Router();

//Controllers
const AuthController = require("./controllers/AuthController");
const AtendimentosController = require("./controllers/AtendimentosController");
const OcorrenciasController = require("./controllers/OcorrenciasController");
const UsuariosController = require("./controllers/UsuariosController");
const SolicitarChecklistController = require("./controllers/SolicitarChecklistController");
const RegistrarChecklistController = require("./controllers/RegistrarChecklistController");
const RelatoriosController = require("./controllers/RelatoriosController");
const ViagemController = require("./controllers/ViagemController");
const DDRController = require("./controllers/DDRController");
const EmailFiliaisController = require("./controllers/EmailFiliaisController");
const FeedbacksController = require("./controllers/FeedbacksController");

//Login
routes.post("/api/login", AuthController.authenticate);

/* Feedback */

//Pesquisar feedback
routes.get("/api/feedbacks", AuthController.validateSession, FeedbacksController.index);
//Cadastrar feedback
routes.post(
  "/api/feedbacks",
  AuthController.validateSession,
  FeedbacksController.store
);
//Atualizar feedback
routes.put("/api/feedbacks/:id", AuthController.validateSession, FeedbacksController.update);
//Deletar feedback
routes.delete("/api/feedbacks/:id", AuthController.validateSession, FeedbacksController.delete);

/* Atendimento */
//Pesquisar atendimento
routes.get(
  "/api/atendimento",
  AuthController.validateSession,
  AtendimentosController.index
);
//Registrar atendimento
routes.post(
  "/api/atendimento",
  AuthController.validateSession,
  AtendimentosController.store
);
//Deletar atendimento
routes.delete(
  "/api/atendimento/:id",
  AuthController.validateSession,
  AtendimentosController.delete
);

/* Ocorrência */
//Pesquisar ocorrência
routes.get(
  "/api/ocorrencia",
  AuthController.validateSession,
  OcorrenciasController.index
);
//Registrar ocorrência
routes.post(
  "/api/ocorrencia",
  AuthController.validateSession,
  OcorrenciasController.store
);

routes.post(
  "/api/ocorrencia-operacional",
  AuthController.validateSession,
  OcorrenciasController.storeOcOperacional
);

//Deletar ocorrência
routes.delete(
  "/api/ocorrencia/:id",
  AuthController.validateSession,
  OcorrenciasController.delete
);

/* Usuários */
//Pesquisar usuario
routes.get("/api/usuarios", AuthController.validateSession, UsuariosController.index);
//Cadastrar usuario
routes.post(
  "/api/usuarios",
  AuthController.validateSession,
  UsuariosController.store
);
//Atualizar usuário
routes.put("/api/usuarios/:id", AuthController.validateSession, UsuariosController.update);
//Deletar usuário
routes.delete("/api/usuarios/:id", AuthController.validateSession, UsuariosController.delete);

/* Checklist */
//Pesquisar checklist
routes.get(
  "/api/pesquisar-checklist",
  AuthController.validateSession,
  RegistrarChecklistController.index
);
//Registrar checklist
routes.post(
  "/api/registrar-checklist",
  AuthController.validateSession,
  RegistrarChecklistController.store
);
//Solicitação do Checklist
routes.get("/api/checklist", SolicitarChecklistController.index);
//Registrar checklist
routes.post("/api/checklist", SolicitarChecklistController.store);
//Pesquisar checklist pelo ID
routes.get("/api/checklist/:id", SolicitarChecklistController.show);
//Alterar o status do checklist
routes.put("/api/checklist/:id", SolicitarChecklistController.changeStatus);
//Deletar solicitação
routes.delete(
  "/api/checklist/:id",
  AuthController.validateSession,
  SolicitarChecklistController.delete
);

/* Relatórios */
//Relatório de Atendimento
routes.get(
  "/api/relatorio-atendimento",
  AuthController.validateSession,
  RelatoriosController.relatorioAtendimento
);
//Relatório de Ocorrencia
routes.get(
  "/api/relatorio-ocorrencia",
  AuthController.validateSession,
  RelatoriosController.relatorioOcorrencia
);
//Relatório de Checklist
routes.get(
  "/api/relatorio-checklist",
  AuthController.validateSession,
  RelatoriosController.relatorioChecklist
);
//Relatório de Viagem Vazio
routes.get("/api/relatorio-viagem", RelatoriosController.relatorioViagemVazio);
//Relatório de DDR
routes.get("/api/relatorio-ddr", RelatoriosController.relatorioDDR);

/* Viagem vazio */
//Listar viagens
routes.get("/api/viagem-vazio", ViagemController.index);
//Solicitar viagem vazio
routes.post("/api/viagem-vazio", ViagemController.store);
//Alterar o status do checklist
routes.put("/api/viagem-vazio/:id", ViagemController.changeStatus);

/* DDR */
//Pesquisar DDR
routes.get("/api/ddr", DDRController.index);
//Cadastrar DDR
routes.post("/api/ddr", DDRController.store);
//Editar DDR
routes.put("/api/ddr/:id", DDRController.update);
//Deletar DDR
routes.delete("/api/ddr/:id", DDRController.delete);
module.exports = routes;

/* Email Filiais */
//Cadastrar e-mail
routes.post("/api/parametros", EmailFiliaisController.store);
//Obter todos os e-mails
routes.get("/api/email-filial", EmailFiliaisController.index);
