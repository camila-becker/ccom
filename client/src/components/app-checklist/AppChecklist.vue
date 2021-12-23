<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center text-h6 mx-3" cols="12" sm="12" md="12">
        <h3 class="white--text">Solicitação de Checklist</h3>
        <p class="description px-3">
          Favor preencher o formulário abaixo com os dados do veículo.
        </p>
        <p class="description">Dúvidas contate o CCOM:</p>
        <p class="description -item">51 3462-3500</p>
        <p class="description -item">51 9 9186-3152</p>
        <p class="description -item">ccom.controle@modular.com.br</p>
      </v-col>
    </v-row>
    <v-row justify="center" class="checklist-card">
      <v-card class="mx-3" width="900">
        <v-row justify="center">
          <v-form
            @submit.prevent="save"
            ref="form"
            v-model="valid"
            lazy-validation
            class="ml-5 mr-5 mt-3"
          >
            <v-row justify="center" class="mx-auto">
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.email"
                  :rules="rules.email"
                  label="* E-mail"
                  filled
                  required
                  type="email"
                  placeholder="E-mail do solicitante"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                v-if="
                  this.dados.email === 'expedicaorio@modular.com.br' ||
                    this.dados.email === 'monitoramentorio@modular.com.br' ||
                    this.dados.email === 'operacionalrio@modular.com.br'
                "
              >
                <v-text-field
                  v-model="dados.email2"
                  :rules="rules.email"
                  label="* E-mail"
                  filled
                  required
                  type="email"
                  placeholder="E-mail do solicitante"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  v-model="dados.tipo"
                  filled
                  :rules="rules.tipo"
                  :items="items.tipo"
                  label="* Tipo de Veículo"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.placa"
                  :rules="rules.placa"
                  label="* Placa do Cavalo"
                  filled
                  required
                  v-mask="'XXX-#X##'"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                v-if="
                  this.dados.tipo === 'Carreta Aberta' ||
                    this.dados.tipo === 'Carreta Baú' ||
                    this.dados.tipo === 'Carreta Container / Isotanque' ||
                    this.dados.tipo === 'Carreta Prancha' ||
                    this.dados.tipo === 'Sider' ||
                    this.dados.tipo === 'Bitrem / Rodotrem Aberto' ||
                    this.dados.tipo === 'Bitrem / Rodotrem Baú'
                "
              >
                <v-text-field
                  v-model="dados.placaCarreta1"
                  label="* Placa da Carreta"
                  :rules="rules.placa"
                  filled
                  v-mask="'XXX-#X##'"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                v-if="
                  this.dados.tipo === 'Bitrem / Rodotrem Aberto' ||
                    this.dados.tipo === 'Bitrem / Rodotrem Baú'
                "
              >
                <v-text-field
                  v-model="dados.placaCarreta2"
                  label="* Placa da Carreta 2"
                  :rules="rules.placa"
                  filled
                  v-mask="'XXX-#X##'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.numeroRastreador"
                  label="Número do Rastreador"
                  filled
                  :rules="rules.numeroRastreador"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  v-model="dados.tecnologia"
                  filled
                  :rules="rules.tecnologia"
                  :items="items.tecnologia"
                  label="* Tecnologia"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  v-model="dados.vinculo"
                  filled
                  :rules="rules.vinculo"
                  :items="items.vinculo"
                  label="* Vínculo do motorista"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  v-model="dados.operacao"
                  filled
                  :rules="rules.operacao"
                  :items="items.operacao"
                  label="* Operação"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.nome"
                  label="* Solicitado por:"
                  filled
                  :rules="rules.nome"
                  required
                  hint="Nome e sobrenome"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.motorista"
                  label="* Nome de quem vai auxiliar no teste:"
                  filled
                  :rules="rules.motorista"
                  required
                  hint="Nome e sobrenome"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                  v-model="dados.telefone"
                  label="* Telefone"
                  filled
                  :rules="rules.telefone"
                  required
                  hint="(XX) XXXXX-XXXX"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  v-model="dados.filial"
                  filled
                  :rules="rules.filial"
                  :items="items.filiais"
                  label="* Filial"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  filled
                  v-model="dados.observacao"
                  label="Observação"
                  value=""
                ></v-textarea>
              </v-col>
              <v-col>
                <v-btn
                  type="submit"
                  color="#2c3e50"
                  class="white--text mr-4"
                  @click="validate"
                >
                  Enviar
                </v-btn>
                <v-btn color="#2c3e50" class="white--text mr-4" @click="reset">
                  Limpar
                </v-btn>
              </v-col>
              <v-col cols="12">
                <small class="red--text">* Campo obrigatório</small>
              </v-col>
            </v-row>
          </v-form>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import api from "../../services/api";

import { capitalize, capitalizeOne, getItems, getRules } from "../../helpers";

export default {
  name: "AppChecklist",
  data: () => ({
    valid: true,
    dados: {
      email: "",
      email2: "",
      placa: "",
      placaCarreta1: "",
      placaCarreta2: "",
      tipo: "",
      numeroRastreador: "",
      tecnologia: "",
      vinculo: "",
      nome: "",
      motorista: "",
      telefone: "",
      filial: "",
      observacao: "",
    },
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
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
      operacao: [
        "Alpargatas",
        "Bayer",
        "Braskem",
        "Fitesa",
        "Monsanto",
        "Outros",
      ],
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    reload() {
      document.location.reload();
    },
    generateProtocol() {
      let data = new Date();
      return (
        ("0" + data.getDate()).substr(-2) +
        ("0" + (data.getMonth() + 1)).substr(-2) +
        data.getFullYear() +
        Math.floor(1000 + Math.random() * 9000)
      );
    },
    async save() {
      try {
        const checklist = {
          protocolo: this.generateProtocol(),
          email: this.dados.email,
          email2: this.dados.email2,
          placa: this.dados.placa.toUpperCase(),
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
          nome: this.dados.nome
            ? capitalize(this.dados.nome.trim())
            : this.dados.nome,
          motorista: this.dados.motorista
            ? capitalize(this.dados.motorista.trim())
            : this.dados.motorista,
          telefone: this.dados.telefone,
          filial: this.dados.filial,
          observacao: this.dados.observacao
            ? capitalizeOne(this.dados.observacao.trim())
            : this.dados.observacao,
        };
        console.log(checklist);
        if (
          this.dados.email === "" ||
          this.dados.filial === "" ||
          this.dados.motorista === "" ||
          this.dados.nome === "" ||
          this.dados.numeroRastreador === "" ||
          this.dados.placa === "" ||
          this.dados.tecnologia === "" ||
          this.dados.telefone === "" ||
          this.dados.tipo === "" ||
          this.dados.vinculo === ""
        ) {
          this.$swal({
            icon: "error",
            text: "Preencha todos os campos!",
            showConfirmButton: false,
            timer: 1800,
          });
        } else {
          await api().post("checklist", checklist);
          this.$swal({
            icon: "success",
            text: `Solicitado com sucesso! Protocolo: ${checklist.protocolo}`,
            showConfirmButton: true,
          });
          this.reset();
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Ocorreu um erro, atualize a página!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  },
};
</script>

<style scoped>
.checklist-card {
  padding: 15px;
}

.description {
  color: #fff;
  font-size: 1rem;
  margin-top: 10px;
  margin-bottom: 0;
}

.-item {
  margin: 0;
}
</style>
