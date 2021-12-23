<template>
  <v-row justify="center" class="ml-1 mr-1">
    <v-form
      @submit.prevent="save"
      v-model="valid"
      ref="form"
      lazy-validation
      class="ml-5 mr-5"
    >
      <v-col cols="12" sm="12" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Cadastrar Email Filial (Ocorrências)
        </h3>
      </v-col>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-select
            label="* Filial"
            v-model="dados.filial"
            :rules="rules.filial"
            :items="items.filiais"
            required
            outlined
            placeholder="Filial"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            label="* Nome"
            hint="Nome do contato"
            v-model="dados.nome"
            :rules="rules.nome"
            required
            outlined
            placeholder="Nome"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            type="email"
            label="* E-mail"
            hint="fulano@modular.com.br"
            v-model="dados.email"
            :rules="rules.email"
            required
            outlined
            placeholder="E-mail"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4"></v-col>
        <v-col cols="12" lg="12">
          <small class="red--text ">* Campo obrigatório</small>
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <v-btn
            @click="validate"
            :disabled="!valid"
            type="submit"
            color="#2c3e50"
            class="white--text mr-4"
          >
            Registrar
          </v-btn>
          <v-btn @click="reset" color="#2c3e50" class="white--text mr-4">
            Limpar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script>
import api from "../../services/api";

import { capitalize, getItems } from "../../helpers/index";

export default {
  name: "AppParametros",
  data: () => ({
    valid: true,
    show: false,
    dados: {
      filial: "",
      nome: "",
      email: "",
    },
    items: {
      filiais: getItems().filiais,
    },
    rules: {
      nome: [(nome) => !!nome || "Informe o nome!"],
      filial: [(filial) => !!filial || "Informe a filial!"],
      email: [(email) => !!email || "Informe o e-mail!"],
    },
    currentUser: "",
  }),
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async save() {
      try {
        const emails = {
          filial: this.dados.filial,
          nome: this.dados.nome
            ? `${capitalize(this.dados.nome.trim())}`
            : this.dados.nome,
          email: this.dados.email,
          usuario: this.currentUser.user.nome,
        };
        await api().post("parametros", emails);
        this.$swal({
          icon: "success",
          text: "E-mail cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1800,
        });
        this.reset();
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Ocorreu um erro, atualize seu navegador!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  },
};
</script>

<style>
.radio-border {
  border: 1px solid #b4b2b2;
  border-radius: 5px;
  padding: 5px;
}
</style>
