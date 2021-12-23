import Vue from "vue";
import Router from "vue-router";

import AppLogin from "../components/app-login/AppLogin";
import Home from "../views/Home/Home";
import Atendimento from "../views/Atendimento/Atendimento";
import OcorrenciaModular from "../views/Ocorrencia/OcorrenciaModular";
import OcorrenciaJornada from "../views/Ocorrencia/OcorrenciaJornada";
import OcorrenciaGerenciadora from "../views/Ocorrencia/OcorrenciaGerenciadora";
import OcorrenciaGeral from "../views/Ocorrencia/OcorrenciaGeral";
import OcorrenciaOperacional from "../views/Ocorrencia/OcorrenciaOperacional";
import NovoCadastro from "../views/Cadastro/NovoCadastro";
import Relatorio from "../views/Relatorio/Relatorio";
import PainelChecklist from "../views/Checklist/PainelChecklist";
import PainelViagem from "../views/Viagem/PainelViagem";
import PesquisarAtendimento from "../views/Pesquisa/PesquisarAtendimento";
import PesquisarOcorrencia from "../views/Pesquisa/PesquisarOcorrencia";
import PesquisarChecklist from "../views/Pesquisa/PesquisarChecklist";
import Checklist from "../views/Checklist/Checklist";
import RegistrarChecklist from "../views/Checklist/RegistrarChecklist";
import ViagemVazio from "../views/Viagem/ViagemVazio";
import AdmAtendimento from "../views/Administrativo/AdmAtendimento";
import AdmOcorrencia from "../views/Administrativo/AdmOcorrencia";
import AdmChecklist from "../views/Administrativo/AdmChecklist";
import AppFeedback from '../views/Feedback/AppFeedback';
import DDR from "../views/DDR/DDR";
import PesquisarDDR from "../views/Pesquisa/PesquisarDDR";
import PesquisarCadastro from "../views/Pesquisa/PesquisarCadastro";
import PesquisarFeedback from '../views/Pesquisa/PesquisarFeedback';
import Parametros from "../views/Parametros/Email";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/adm-atendimento",
      name: "adm-atendimento",
      component: AdmAtendimento,
      beforeEnter: (to, from, next) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/adm-ocorrencia",
      name: "adm-ocorrencia",
      component: AdmOcorrencia,
      beforeEnter: (to, from, next) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/adm-checklist",
      name: "adm-checklist",
      component: AdmChecklist,
      beforeEnter: (to, from, next) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/novo-feedback",
      name: "novo-feedback",
      component: AppFeedback,
      beforeEnter: (to, from, next) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/feedback",
      name: "feedback",
      component: PesquisarFeedback,
      beforeEnter: (to, from, next) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: AppLogin,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/atendimento",
      name: "atendimento",
      component: Atendimento,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ocorrencia-modular",
      name: "ocorrencia-modular",
      component: OcorrenciaModular,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ocorrencia-jornada",
      name: "ocorrencia-jornada",
      component: OcorrenciaJornada,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ocorrencia-gerenciadora",
      name: "ocorrencia-gerenciadora",
      component: OcorrenciaGerenciadora,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ocorrencia-geral",
      name: "ocorrencia-geral",
      component: OcorrenciaGeral,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ocorrencia-operacional",
      name: "ocorrencia-operacional",
      component: OcorrenciaOperacional,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/cadastros",
      name: "cadastros",
      component: PesquisarCadastro,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/novo-cadastro",
      name: "novo-cadastro",
      component: NovoCadastro,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/checklist",
      name: "checklist",
      component: PainelChecklist,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/registrar-checklist",
      name: "novo checklist",
      component: RegistrarChecklist,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/viagem",
      name: "viagem",
      component: PainelViagem,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/pesquisar-atendimento",
      name: "pesquisar-atendimento",
      component: PesquisarAtendimento,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/pesquisar-ocorrencia",
      name: "pesquisar-ocorrencia",
      component: PesquisarOcorrencia,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/pesquisar-checklist",
      name: "pesquisar-checklist",
      component: PesquisarChecklist,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/relatorio",
      name: "relatorio",
      component: Relatorio,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/ddr",
      name: "ddr",
      component: DDR,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/pesquisar-ddr",
      name: "pesquisar-ddr",
      component: PesquisarDDR,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/parametros-email",
      name: "parametros-email",
      component: Parametros,
      beforeEnter(to, from, next) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = currentUser.user;
        if (user && user.usuario) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/solicitar-checklist",
      name: "solicitar-checklist",
      component: Checklist,
    },
    {
      path: "/viagem-vazio",
      name: "viagem-vazio",
      component: ViagemVazio,
    },
  ],
  mode: "history",
});
