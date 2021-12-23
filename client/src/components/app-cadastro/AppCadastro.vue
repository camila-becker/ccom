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
          Cadastrar Usuário
        </h3>
      </v-col>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            label="* Nome"
            hint="Nome"
            v-model="dados.nome"
            :rules="rules.nome"
            required
            outlined
            placeholder="Nome"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            label="* Sobrenome"
            hint="Sobrenome"
            v-model="dados.sobrenome"
            :rules="rules.sobrenome"
            required
            outlined
            placeholder="Sobrenome"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            label="* Usuário"
            hint="nome.sobrenome"
            v-model="dados.usuario"
            :rules="rules.usuario"
            required
            outlined
            placeholder="Usuário"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-text-field
            label="* Senha"
            v-model="dados.senha"
            :rules="rules.senha"
            required
            outlined
            placeholder="Senha"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-select
            label="* Permissão"
            v-model="dados.permissao"
            :rules="rules.permissao"
            :items="['Administrador', 'Usuário']"
            required
            outlined
            placeholder="Permissão"
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

import { capitalize } from "../../helpers/index";

export default {
  name: "AppCadastro",
  data: () => ({
    valid: true,
    show: false,
    dados: {
      nome: "",
      sobrenome: "",
      usuario: "",
      senha: "",
      permissao: "",
    },
    rules: {
      nome: [(nome) => !!nome || "Informe o nome!"],
      sobrenome: [(sobrenome) => !!sobrenome || "Informe o sobrenome!"],
      permissao: [(permissao) => !!permissao || "Informe a permissão!"],
      usuario: [(usuario) => !!usuario || "Informe o usuário!"],
      senha: [(senha) => !!senha || "Informe a senha!"],
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
        const usuarios = {
          nome: this.dados.nome
            ? `${capitalize(this.dados.nome.trim())} ${capitalize(
                this.dados.sobrenome.trim()
              )}`
            : this.dados.nome,
          usuario: this.dados.usuario
            ? this.dados.usuario.toLowerCase()
            : this.dados.usuario,
          senha: this.dados.senha,
          permissao: this.dados.permissao,
        };
        await api().post("usuarios", usuarios);
        this.$swal({
          icon: "success",
          text: "Usuário cadastrado com sucesso!",
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
