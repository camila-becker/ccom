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
          Cadastrar DDR
        </h3>
      </v-col>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="* Cliente"
            hint="Razão social do cliente"
            v-model="dados.cliente"
            :rules="rules.cliente"
            required
            outlined
            placeholder="Informe o cliente"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="* Responsável Conta"
            hint="Responsável pela conta"
            v-model="dados.responsavel"
            :rules="rules.responsavel"
            required
            outlined
            placeholder="Informe o responsável"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="* CNPJ"
            v-model="dados.cnpj"
            v-mask="'##.###.###/####-##'"
            outlined
            placeholder="Informe o CNPJ"
            :rules="rules.cnpj"
            required
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            label="* Seguradora"
            v-model="dados.seguradora"
            :rules="rules.seguradora"
            :items="items.seguradoras"
            required
            outlined
            placeholder="Informe a seguradora"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            label="* Status"
            v-model="dados.status"
            :rules="rules.status"
            :items="['Em análise', 'Liberado']"
            required
            outlined
            placeholder="Informe o status"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            label="* Assinaturas"
            v-model="dados.assinaturas"
            :items="['Sim', 'Não']"
            :rules="rules.assinaturas"
            required
            outlined
            placeholder="Possui assinatura?"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Intranet"
            v-model="dados.intranet"
            v-mask="'##/##/####'"
            outlined
            placeholder="Colocado na intranet em:"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Apisul"
            v-model="dados.apisul"
            v-mask="'##/##/####'"
            outlined
            placeholder="Enviado para Apisul em:"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Clicktrans"
            v-model="dados.clicktrans"
            v-mask="'##/##/####'"
            outlined
            placeholder="Colocado no clicktrans em:"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="* Recebimento"
            v-model="dados.recebimento"
            v-mask="'##/##/####'"
            :rules="rules.recebimento"
            required
            outlined
            placeholder="Recebido em:"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="* Vencimento"
            v-model="dados.vencimento"
            v-mask="'##/##/####'"
            :rules="rules.vencimento"
            required
            outlined
            placeholder="Vence em:"
          />
        </v-col>
        <v-col cols="12" md="8" class="mx-auto">
          <v-textarea
            label="Observação"
            v-model="dados.observacao"
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
            Cadastrar
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
  name: "AppDDR",
  data: () => ({
    valid: true,
    dados: {
      cliente: "",
      responsavel: "",
      cnpj: "",
      seguradora: "",
      status: "",
      assinaturas: "",
      intranet: "",
      apisul: "",
      clicktrans: "",
      recebimento: "",
      vencimento: "",
      observacao: "",
      usuario: "",
    },
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
      vinculos: getItems().vinculos,
      canais: getItems().canais,
      seguradoras: getItems().seguradoras,
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
        const registros = {
          cliente: this.dados.cliente
            ? capitalize(this.dados.cliente.trim())
            : this.dados.cliente,
          responsavel: this.dados.responsavel
            ? capitalize(this.dados.responsavel.trim())
            : this.dados.responsavel,
          cnpj: this.dados.cnpj,
          seguradora: this.dados.seguradora,
          status: this.dados.status,
          assinaturas: this.dados.assinaturas,
          intranet: this.dados.intranet,
          apisul: this.dados.apisul,
          clicktrans: this.dados.clicktrans,
          recebimento: this.dados.recebimento,
          vencimento: this.dados.vencimento,
          observacao: this.dados.observacao
            ? capitalizeOne(this.dados.observacao.trim())
            : this.dados.observacao,
          usuario: this.currentUser.user.nome,
        };
        await api().post("ddr", registros);
        console.log(registros.vencimento)
        this.$swal({
          icon: "success",
          text: "DDR cadastrada com sucesso!",
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
