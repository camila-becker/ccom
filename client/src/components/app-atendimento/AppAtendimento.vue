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
          Registro de Atendimento
        </h3>
      </v-col>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            label="* Nome"
            hint="Nome do contato"
            v-model="dados.nome"
            :rules="rules.nome"
            required
            outlined
            placeholder="Informe o contato"
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            label="* Sobrenome"
            hint="Sobrenome do contato"
            v-model="dados.sobrenome"
            :rules="rules.sobrenome"
            required
            outlined
            placeholder="Informe o sobrenome"
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            label="Placa"
            v-model="dados.placa"
            v-mask="'XXX-#X##'"
            outlined
            placeholder="Informe a placa"
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            label="* Vínculo"
            @change="changeReason"
            v-model="dados.vinculo"
            :rules="rules.vinculo"
            :items="items.vinculos"
            required
            outlined
            placeholder="Informe o vínculo"
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            label="* Canal"
            v-model="dados.canal"
            :items="items.canais"
            :rules="rules.canal"
            required
            outlined
            placeholder="Informe o canal"
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            label="* Filial"
            v-model="dados.filial"
            :items="items.filiais"
            :disabled="!showFilial"
            outlined
            placeholder="Informe a filial"
          />
        </v-col>

        <v-container v-show="visivelGeral">
          <v-radio-group
            :mandatory="rules.mandatory"
            :error="rules.error"
            :success="rules.success"
            :rules="rules.motivo"
            v-model="dados.motivo"
            row
          >
            <v-row justify="center">
              <v-col
                cols="12"
                md="4"
                v-for="motivo in MotivosGerais"
                :key="motivo.indice"
              >
                <v-radio :value="motivo.valor" class="radio-border">
                  <template v-slot:label>
                    {{ motivo.titulo }}
                  </template>
                </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-container>

        <v-container v-show="visivelMotoristas">
          <v-radio-group
            :mandatory="rules.mandatory"
            :multiple="rules.multiple"
            :error="rules.error"
            :success="rules.success"
            :rules="rules.motivo"
            v-model="dados.motivo"
            row
          >
            <v-row justify="center">
              <v-col
                cols="10"
                md="3"
                v-for="motivo in MotivosMotoristas"
                :key="motivo.indice"
              >
                <v-radio :value="motivo.valor" class="radio-border">
                  <template v-slot:label>{{ motivo.titulo }}</template>
                </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-container>

        <v-container v-show="visivelGerenciadora">
          <v-radio-group
            :mandatory="rules.mandatory"
            :multiple="rules.multiple"
            :error="rules.error"
            :success="rules.success"
            :rules="rules.motivo"
            v-model="dados.motivo"
            row
          >
            <v-row justify="center">
              <v-col
                cols="12"
                md="4"
                v-for="motivo in MotivosGerenciadora"
                :key="motivo.indice"
              >
                <v-radio class="radio-border" :value="motivo.valor">
                  <template v-slot:label>{{ motivo.titulo }}</template>
                </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-container>

        <v-container v-show="visivelDedicados">
          <v-radio-group
            :mandatory="rules.mandatory"
            :multiple="rules.multiple"
            :error="rules.error"
            :success="rules.success"
            :rules="rules.motivo"
            v-model="dados.motivo"
            row
          >
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-radio
                  class="radio-border"
                  value="Acompanhamento de Dedicados (Modular)"
                >
                  <template v-slot:label>Acompanhamento de Dedicados</template>
                </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-container>

        <v-col cols="12" md="8" class="mx-auto">
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
          <small class="red--text ">* Campo obrigatório</small>
        </v-col>
      </v-row>
    </v-form>
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

import { MotivosMotoristas } from "../../helpers/Atendimento/MotivosMotoristas";
import { MotivosGerenciadora } from "../../helpers/Atendimento/MotivosGerenciadora";
import { MotivosGerais } from "../../helpers/Atendimento/MotivosGerais";

export default {
  name: "AppAtendimento",
  data: () => ({
    valid: true,
    showFilial: true,
    MotivosMotoristas,
    MotivosGerenciadora,
    MotivosGerais,
    dados: {
      nome: "",
      sobrenome: "",
      placa: "",
      vinculo: "",
      filial: "",
      canal: "",
      motivo: null,
      registro: "",
      usuario: "",
    },
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
      vinculos: getItems().vinculos,
      canais: getItems().canais,
    },
    visivelMotoristas: false,
    visivelGerenciadora: false,
    visivelDedicados: false,
    visivelGeral: true,
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
    changeReason(value) {
      if (
        value === "Motorista Agregado" ||
        value === "Motorista Frota" ||
        value === "Motorista Terceiro"
      ) {
        this.visivelMotoristas = true;
        this.visivelGerenciadora = false;
        this.visivelGeral = false;
        this.showFilial = false;
      } else if (
        value === "GR Apisul" ||
        value === "GR BrasilRisk" ||
        value === "GR Buonny" ||
        value === "GR Krona" ||
        value === "GR Sensitech"
      ) {
        this.visivelGerenciadora = true;
        this.visivelMotoristas = false;
        this.visivelGeral = false;
        this.showFilial = false;
      } else if (value === "Dedicados") {
        this.visivelGeral = false;
        this.visivelMotoristas = false;
        this.visivelGerenciadora = false;
        this.visivelDedicados = true;
        this.showFilial = true;
      } else {
        this.visivelMotoristas = false;
        this.visivelGerenciadora = false;
        this.visivelDedicados = false;
        this.visivelGeral = true;
        this.showFilial = true;
      }
    },
    async save() {
      try {
        const registros = {
          nome: this.dados.nome
            ? `${capitalize(this.dados.nome.trim())} ${capitalize(
                this.dados.sobrenome.trim()
              )}`
            : '',
          placa: this.dados.placa
            ? this.dados.placa.toUpperCase()
            : '',
          vinculo: this.dados.vinculo,
          filial: this.dados.filial,
          canal: this.dados.canal,
          motivo: this.dados.motivo,
          registro: this.dados.registro
            ? capitalizeOne(this.dados.registro.trim())
            : this.dados.registro,
          usuario: this.currentUser.user.nome,
        };
        await api().post("atendimento", registros);
        this.$swal({
          icon: "success",
          text: "Atendimento registrado com sucesso!",
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
