<template>
  <v-container class="nav-container">
    <v-navigation-drawer
      color="#60a3bc"
      v-model="drawer"
      app
      clipped
      width="280"
    >
      <app-menu :routes="router" class="mt-6"></app-menu>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="#2c3e50" class="white--text">
      <v-app-bar-nav-icon
        class="white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link to="/home" class="link white--text">
        <v-toolbar-title class="text-h4">CCOM</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <span>Olá, {{ currentUser.user.nome }}</span>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn @click="logout" small outlined dark class="mx-2">
        Sair
      </v-btn>
      <img src="../../assets/logo-modular.png" />
    </v-app-bar>
  </v-container>
</template>

<script>
import router from "../../router";
import AppMenu from "../app-menu/AppMenu.vue";
export default {
  name: "AppNavegacao",
  components: {
    "app-menu": AppMenu,
  },
  data: () => ({
    drawer: true,
    router,
    currentUser: "",
  }),
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.nav-container {
  padding: 0 !important;
}
</style>
