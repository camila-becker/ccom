<template>
  <v-row>
    <v-col cols="12">
      <v-col cols="12" sm="12" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Registro de Ocorrência Controle de Jornada
        </h3>
      </v-col>
      <v-form
        @submit.prevent="save"
        v-model="valid"
        ref="form"
        lazy-validation
        class="ml-5 mr-5"
      >
        <v-row>
          <v-col cols="12" md="6" lg="3">
            <v-text-field
              label="* Nome"
              hint="Nome do motorista"
              v-model="dados.nome"
              :rules="rules.nome"
              required
              outlined
              placeholder="Informe o nome"
            />
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-text-field
              label="* Sobrenome"
              hint="Sobrenome do motorista"
              v-model="dados.sobrenome"
              :rules="rules.sobrenome"
              required
              outlined
              placeholder="Informe o sobrenome"
            />
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-text-field
              label="* Placa"
              v-model="dados.placa"
              v-mask="'XXX-#X##'"
              :rules="rules.placa"
              required
              outlined
              placeholder="Informe a placa"
            />
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-select
              label="* Filial"
              v-model="dados.filial"
              :rules="rules.filial"
              :items="items.filiais"
              required
              outlined
              placeholder="Informe a filial"
            />
          </v-col>
          <v-col>
            <v-radio-group
              :mandatory="rules.mandatory"
              :error="rules.error"
              :success="rules.success"
              :rules="rules.motivo"
              v-model="dados.motivo"
              row
            >
              <v-col
                cols="12"
                md="6"
                lg="3"
                v-for="motivo in motivos"
                :key="motivo.indice"
              >
                <v-radio :value="motivo.valor" class="radio-border">
                  <template v-slot:label>
                    {{ motivo.titulo }}
                  </template>
                </v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <small class="red--text ">* Campo obrigatório</small>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-textarea
              label="Registro"
              v-model="dados.registro"
              value=""
              outlined
            />
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
    </v-col>
  </v-row>
</template>

<script>
import api from "../../services/api";

import {
  capitalize,
  capitalizeOne,
  getItems,
  getRules,
} from "../../helpers/index";

import { motivos } from "../../helpers/Ocorrencia/MotivosJornada";

export default {
  name: "OcorrenciaJornada",
  data: () => ({
    valid: true,
    motivos,
    dados: {
      nome: "",
      sobrenome: "",
      placa: "",
      filial: "",
      motivo: null,
      registro: "",
      tipo: "Ocorrência Controle de Jornada",
      usuario: "",
    },
    currentUser: "",
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
    },
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
        const ocorrencias = {
          nome: this.dados.nome
            ? `${capitalize(this.dados.nome.trim())} ${capitalize(
                this.dados.sobrenome.trim()
              )}`
            : this.dados.nome,
          placa: this.dados.placa
            ? this.dados.placa.toUpperCase()
            : this.dados.placa,
          filial: this.dados.filial,
          motivo: this.dados.motivo,
          registro: this.dados.registro
            ? capitalizeOne(this.dados.registro.trim())
            : this.dados.registro,
          tipo: this.dados.tipo,
          usuario: this.currentUser.user.nome,
        };
        await api().post("/ocorrencia", ocorrencias);
        this.$swal({
          icon: "success",
          text: "Ocorrência registrada com sucesso!",
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
