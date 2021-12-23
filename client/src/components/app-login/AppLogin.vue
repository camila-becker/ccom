<template>
  <v-container fill-height fluid class="app-container">
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card class="app-card">
          <h3 class="mb-8 app-title text-center">
            Centro de Controle Operacional Modular
          </h3>
          <v-form @submit.prevent="login">
            <v-text-field
              placeholder="Usuário"
              outlined
              label="* Usuario"
              v-model="loginInfo.usuario"
            ></v-text-field>
            <v-text-field
              placeholder="Senha"
              :type="show ? 'text' : 'password'"
              outlined
              label="* Senha"
              v-model="loginInfo.senha"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <v-row justify="center">
              <v-btn
                type="submit"
                color="#2c3e50"
                class="white--text app-button"
              >
                Entrar
              </v-btn>
            </v-row>
            <v-row justify="center" class="mt-5">
              <v-img src="../../assets/logo.png"></v-img>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AppLogin",
  data: () => ({
    loginInfo: {
      usuario: "",
      senha: "",
    },
    show: false,
  }),
  methods: {
    async login() {
      let user = await this.$store.dispatch("login", this.loginInfo);
      if (user.error) {
        this.$swal({
          icon: "error",
          text: user.error,
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  background-color: #2c3e50;
}
.app-card {
  padding: 40px;
  margin: 10px;
}

.app-title {
  color: #2c3e50;
  font-size: 1.1rem;
}

.app-button {
  margin-bottom: 10px;
  width: 200px;
  font-size: 1.1rem;
}
</style>
