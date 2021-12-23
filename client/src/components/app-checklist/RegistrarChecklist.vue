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
          Registro de Checklist
        </h3>
      </v-col>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-select
            @change="changeType"
            v-model="dados.tipo"
            outlined
            :rules="rules.tipo"
            :items="items.tipo"
            label="* Tipo de Veículo"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="dados.placa"
            :rules="rules.placa"
            label="* Placa do Cavalo"
            outlined
            required
            v-mask="'XXX-#X##'"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2" v-show="showPlate">
          <v-text-field
            v-model="dados.placaCarreta1"
            label="* Placa da Carreta"
            outlined
            v-mask="'XXX-#X##'"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2" v-show="showPlate2">
          <v-text-field
            v-model="dados.placaCarreta2"
            label="* Placa da Carreta 2"
            outlined
            v-mask="'XXX-#X##'"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="dados.numeroRastreador"
            label="Número do Rastreador"
            outlined
            :rules="rules.numeroRastreador"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="dados.tecnologia"
            outlined
            :rules="rules.tecnologia"
            :items="items.tecnologia"
            label="* Tecnologia"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="dados.vinculo"
            outlined
            :rules="rules.vinculo"
            :items="items.vinculo"
            label="* Vínculo do motorista"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="dados.nome"
            label="* Solicitado por:"
            outlined
            :rules="rules.nome"
            required
            hint="Nome e sobrenome"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="dados.filial"
            outlined
            :rules="rules.filial"
            :items="items.filiais"
            label="* Filial"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="dados.status"
            outlined
            :rules="rules.status"
            :items="['Aprovado', 'Cancelado', 'Reprovado', 'Válido']"
            label="* Status"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="dados.base"
            outlined
            :rules="rules.base"
            :items="['Apisul', 'CCOM']"
            label="* Base"
          ></v-select>
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
        <v-col cols="12" md="8" class="mx-auto">
          <v-textarea
            label="Registro"
            v-model="dados.motivo"
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

export default {
  name: "RegistrarChecklist",
  data: () => ({
    valid: true,
    showPlate: false,
    showPlate2: false,
    dados: {
      placa: "",
      placaCarreta1: "",
      placaCarreta2: "",
      numeroRastreador: "",
      tipo: "",
      tecnologia: "",
      vinculo: "",
      nome: "",
      filial: "",
      status: "",
      canal: "",
      base: "",
      motivo: "",
      usuario: "",
    },
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
      canais: getItems().canais,
      tipo: [
        "Bitrem / Rodotrem Aberto",
        "Bitrem / Rodotrem Baú",
        "Truck Aberto",
        "Truck Baú",
        "Carreta Aberta",
        "Carreta Baú",
        "Carreta Container / Isotanque",
        "Carreta Prancha",
        "Sider",
      ],
      tecnologia: ["Autotrac", "Omnilink", "Onixsat", "Sascar", "Sighra"],
      vinculo: ["Autônomo", "Agregado", "Frota"],
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
    changeType(value) {
      if (
        value === "Bitrem / Rodotrem Aberto" ||
        value === "Bitrem / Rodotrem Baú"
      ) {
        this.showPlate = true;
        this.showPlate2 = true;
      } else if (value === "Truck Aberto" || value === "Truck Baú") {
        this.showPlate = false;
        this.showPlate2 = false;
      } else {
        this.showPlate = true;
        this.showPlate2 = false;
      }
    },
    async save() {
      try {
        const registros = {
          nome: this.dados.nome
            ? `${capitalize(this.dados.nome.trim())}`
            : this.dados.nome,
          placa: this.dados.placa
            ? this.dados.placa.toUpperCase()
            : this.dados.placa,
          placaCarreta1: this.dados.placaCarreta1
            ? this.dados.placaCarreta1.toUpperCase()
            : this.dados.placaCarreta1,
          placaCarreta2: this.dados.placaCarreta2
            ? this.dados.placaCarreta2.toUpperCase()
            : this.dados.placaCarreta2,
          tipo: this.dados.tipo,
          numeroRastreador: this.dados.numeroRastreador,
          tecnologia: this.dados.tecnologia,
          vinculo: this.dados.vinculo,
          filial: this.dados.filial,
          status: this.dados.status,
          base: this.dados.base,
          motivo: this.dados.motivo
            ? capitalizeOne(this.dados.motivo.trim())
            : this.dados.motivo,
          usuario: this.currentUser.user.nome,
          plataforma: "E-mail",
        };
        const dadosAtendimento = {
          nome: this.dados.nome,
          placa: this.dados.placa,
          filial: this.dados.filial,
          motivo: "Solicitar Checklist (Modular)",
          registro: `Carreta(s): ${
            this.dados.placaCarreta1 ? this.dados.placaCarreta1 : ""
          }, ${this.dados.placaCarreta2 ? this.dados.placaCarreta2 : ""}`,
          usuario: this.currentUser.user.nome,
        };
        console.log(registros);
        await api().post("registrar-checklist", registros);
        await api().post("atendimento", dadosAtendimento);
        this.$swal({
          icon: "success",
          text: "Checklist registrado com sucesso!",
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
