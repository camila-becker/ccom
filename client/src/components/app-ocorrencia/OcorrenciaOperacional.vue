<template>
  <v-row>
    <v-col cols="12">
      <v-col cols="12" sm="12" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Registro de Ocorrência Operacional
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
          <v-col cols="12" md="4" lg="3">
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
          <v-col cols="12" md="4" lg="3">
            <v-select
              label="* Origem"
              v-model="dados.origem"
              :rules="rules.origem"
              :items="items.filiais"
              required
              outlined
              placeholder="Origem"
            />
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-select
              label="* Destino"
              v-model="dados.destino"
              :rules="rules.destino"
              :items="items.filiais"
              required
              outlined
              placeholder="Destino"
            />
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-text-field
              label="* Valor"
              v-model.lazy="dados.valor"
              v-money="dados.valor !== null ? money : null"
              :rules="rules.valor"
              required
              outlined
              placeholder="Informe o valor"
            />
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-select
              label="* Vínculo"
              v-model="dados.vinculo"
              :rules="rules.vinculo"
              :items="['Agregado / Terceiro', 'Frota']"
              required
              outlined
              placeholder="Vínculo"
            />
          </v-col>
          <v-col cols="12">
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
                lg="6"
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
          <v-col cols="12" lg="12">
            <small class="red--text ">* Campo obrigatório</small>
          </v-col>
          <v-col cols="12" lg="6">
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
import { VMoney } from "v-money";

import { capitalizeOne, getItems, getRules } from "../../helpers/index";

import { motivos } from "../../helpers/Ocorrencia/MotivosOperacionais";

export default {
  name: "OcorrenciaOperacional",
  data: () => ({
    valid: true,
    motivos,
    dados: {
      placa: "",
      origem: "",
      destino: "",
      vinculo: "",
      valor: null,
      motivo: null,
      registro: "",
      tipo: "Ocorrência Operacional",
      usuario: "",
    },
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2,
      masked: false,
    },
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
    },
    currentUser: "",
  }),
  directives: { money: VMoney },
  async created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.dados.valor = null;
    },
    async save() {
      try {
        const ocorrencias = {
          placa: this.dados.placa
            ? this.dados.placa.toUpperCase()
            : this.dados.placa,
          origem: this.dados.origem,
          destino: this.dados.destino,
          valor: this.dados.valor,
          vinculo: this.dados.vinculo,
          motivo: this.dados.motivo,
          registro: this.dados.registro
            ? capitalizeOne(this.dados.registro.trim())
            : this.dados.registro,
          tipo: this.dados.tipo,
          usuario: this.currentUser.user.nome,
        };
        await api().post("/ocorrencia-operacional", ocorrencias);
        console.log(this.emails);
        this.$swal({
          icon: "success",
          text: "Ocorrencia registrada com sucesso!",
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
