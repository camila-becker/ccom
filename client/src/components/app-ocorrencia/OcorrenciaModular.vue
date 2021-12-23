<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-col cols="12" sm="12" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Registro de Ocorrência Modular
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
          <v-col cols="12" md="6" lg="4">
            <v-autocomplete
              label="* Responsável"
              v-model="dados.nome"
              :loading="isLoading"
              :items="info"
              :search-input.sync="search"
              :rules="rules.nome"
              cache-items
              hint="Nome do contato"
              hide-no-data
              required
              outlined
              placeholder="Informe o contato"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              label="* Canal"
              v-model="dados.canal"
              :rules="rules.canal"
              :items="items.canais"
              required
              outlined
              placeholder="Canal de atendimento"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
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
          <v-col cols="12" md="6" lg="4">
            <v-select
              label="* Expresso"
              v-model="dados.expresso"
              :rules="rules.expresso"
              :items="['Sim', 'Não']"
              required
              outlined
              placeholder="Viagem expressa?"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              label="* Origem"
              v-model="dados.origem"
              :rules="rules.origem"
              :items="items.filiais"
              required
              outlined
              placeholder="Filial de origem"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              label="* Destino"
              v-model="dados.destino"
              :rules="rules.destino"
              :items="items.filiais"
              required
              outlined
              placeholder="Filial de destino"
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
                lg="6"
                v-for="motivo in motivos"
                :key="motivo.indice"
              >
                <v-radio :value="motivo.valor" class="radio-border">
                  <template v-slot:label>
                    {{ motivo.valor }}
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
import { capitalizeOne, getItems, getRules } from "../../helpers/index";
import { motivos } from "../../helpers/Ocorrencia/MotivosModular";

export default {
  name: "OcorrenciaModular",
  data: () => ({
    valid: true,
    isLoading: false,
    motivos,
    info: [],
    search: null,
    dados: {
      nome: null,
      canal: "",
      placa: "",
      expresso: "",
      origem: "",
      destino: "",
      motivo: null,
      registro: "",
      tipo: "Ocorrência Modular",
      usuario: "",
    },
    gerentes: getItems().gerentes,
    rules: getRules(),
    items: {
      filiais: getItems().filiais,
      canais: getItems().canais,
    },
    currentUser: "",
  }),
  watch: {
    search(val) {
      val && val !== this.dados.nome && this.querySelections(val);
    },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  methods: {
    querySelections(v) {
      this.isLoading = true;
      setTimeout(() => {
        this.info = this.gerentes.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.isLoading = false;
      }, 500);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async save() {
      try {
        const ocorrencias = {
          nome: this.dados.nome,
          canal: this.dados.canal,
          placa: this.dados.placa
            ? this.dados.placa.toUpperCase()
            : this.dados.placa,
          expresso: this.dados.expresso,
          origem: this.dados.origem,
          destino: this.dados.destino,
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
