import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: {},
    checklist: [],
    viagens: [],
    emails: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    logoutUser(state) {
      state.currentUser = {};
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setChecklist(state, checklist) {
      state.checklist = checklist;
    },
    setViagens(state, viagem) {
      state.viagens = viagem;
    },
    setEmails(state, email) {
      state.emails = email;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      let response = await api().get("usuarios");
      let users = response.data;
      commit(
        "setUsers",
        users.map((user) => user.user)
      );
    },
    async login({ commit }, loginInfo) {
      try {
        let response = await api().post("login", loginInfo);
        let user = response.data;
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(user.token));
        commit("setCurrentUser", user);
        return user;
      } catch {
        return { error: "Usuário ou senha inválidos!" };
      }
    },
    logout({ commit }) {
      localStorage.removeItem("currentUser");
      commit("logoutUser");
    },
    async loadChecklist({ commit }) {
      let response = await api().get("checklist");
      let checklist = response.data;
      commit("setChecklist", checklist);
      return checklist;
    },
    async loadViagens({ commit }) {
      let response = await api().get("viagem-vazio");
      let viagens = response.data;
      commit("setViagens", viagens);
      return viagens;
    },
    async loadEmails({ commit }) {
      let response = await api().get("email-filial");
      let emails = response.data;
      commit("setEmails", emails);
      return emails;
    },
  },
});
