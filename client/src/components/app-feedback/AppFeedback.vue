<template>
  <v-row justify="center" class="ml-1 mr-1">
    <v-form
      @submit.prevent="save"
      v-model="valid"
      ref="form"
      lazy-validation
      class="ml-5 mr-5"
    >
      <v-col cols="12" sm="6" md="12">
        <h3 class="text-center blue-grey--text mb-4">
          Registro de Feedback
        </h3>
      </v-col>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            label="* Nome"
            hint="Nome do contato"
            v-model="dados.colaborador"
            :rules="rules.colaborador"
            :items="colaboradores"
            required
            outlined
            placeholder="Informe o colaborador"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-select
            label="* Motivo"
            v-model="dados.motivo"
            :rules="rules.motivoFeedback"
            :items="items.motivos"
            required
            outlined
            placeholder="Informe o motivo"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-textarea
            label="Observações"
            v-model="dados.observacao"
            value=""
            outlined
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-textarea
            label="Expectativas do Gestor"
            v-model="dados.expectativas"
            value=""
            outlined
          />
        </v-col>
        <v-col cols="12">
          <small class="red--text ">* Campo obrigatório</small>
        </v-col>
        <v-col cols="12" class="mx-auto">
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
import {
  getItems,
  getRules,
} from "../../helpers/index";

export default {
  name: "AppFeedback",
  data: () => ({
    valid: true,
    dados: {
      colaborador: "",
      motivo: "",
      observacao: "",
      expectativas: "",
      usuario: "",
    },
    rules: getRules(),
    items: {
      motivos: getItems().motivos,
    },
    colaboradores: [],
    currentUser: "",
  }),

  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.initialize();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async initialize() {
      const response = await api().get("usuarios");
      const data = response.data;
      const colaborador = data.map(c => c.nome).sort();
      this.colaboradores = colaborador;
    },
    async save() {
      try {
        const registros = {
          colaborador: this.dados.colaborador,
          motivo: this.dados.motivo,
          observacao: this.dados.observacao,
          expectativas: this.dados.expectativas,
          usuario: this.currentUser.user.nome,
        };
        await api().post("feedbacks", registros);
        this.$swal({
          icon: "success",
          text: "Feedback registrado com sucesso!",
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
