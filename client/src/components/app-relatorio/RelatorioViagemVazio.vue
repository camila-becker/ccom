<template>
  <v-row justify="center">
    <v-container>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header
              color="#2c3e50"
              class="white--text text-button"
            >
              Viagem Vazio
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-4">
              <v-row justify="center">
                <v-form
                  @submit.prevent="download"
                  v-model="valid"
                  ref="form"
                  lazy-validation
                >
                  <v-col cols="12">
                    <div class="date-container">
                      <label for="initialDate">Data inicial:</label>
                      <input
                        class="date"
                        type="date"
                        id="initialDate"
                        v-model="dataInicio"
                        :rules="rules.relatorio"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="date-container">
                      <label for="finalDate">Data final:</label>
                      <input
                        class="date"
                        type="date"
                        id="finalDate"
                        v-model="dataFim"
                        :rules="rules.relatorio"
                      />
                    </div>
                  </v-col>
                  <v-col>
                    <v-row justify="center">
                      <v-btn
                        type="submit"
                        @click="validate"
                        color="#2c3e50"
                        class="white--text"
                      >
                        Download
                        <v-icon right dark>mdi-download</v-icon>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-form>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
import api from "../../services/api";

import { downloadReports, getRules } from "../../helpers";

export default {
  name: "RelatorioViagemVazio",
  data: () => ({
    valid: true,
    viagens: [],
    dataInicio: "",
    dataFim: "",
    rules: getRules(),
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async download() {
      try {
        await api()
          .get(
            `/relatorio-viagem/?dataInicio=${this.dataInicio}&&dataFim=${this.dataFim}`
          )
          .then((res) => {
            const info = res.data;
            this.viagens = info;
          });
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Ocorreu um erro, atualize seu navegador!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
      if (this.valid) {
        downloadReports("viagens", this.viagens);
        this.reset();
      }
    },
  },
};
</script>

<style scoped>
.date-container {
  display: flex;
  flex-direction: column;
}

.date-container label {
  color: #5f5e5e;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.date {
  border-bottom: 1px solid #5f5e5e;
  padding: 5px;
  cursor: pointer;
  color: #5f5e5e;
}

.date::placeholder {
  color: #ccc;
}
</style>
