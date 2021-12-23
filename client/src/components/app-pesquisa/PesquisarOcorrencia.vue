<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3 class="text-center blue-grey--text">Pesquisar Ocorrência</h3>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-text-field
              label="Digite a placa do veículo"
              v-model="pesquisa"
              append-icon="search"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card>
              <v-simple-table fixed-header height="500px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center table-header">
                        Tipo
                      </th>
                      <th class="text-center table-header">
                        Contato
                      </th>
                      <th class="text-center table-header">
                        Placa
                      </th>
                      <th class="text-center table-header">
                        Viagem Expressa
                      </th>
                      <th class="text-center table-header">
                        Origem
                      </th>
                      <th class="text-center table-header">
                        Destino
                      </th>
                      <th class="text-center table-header">
                        SMP
                      </th>
                      <th class="text-center table-header">
                        Valor
                      </th>
                      <th class="text-center table-header">
                        Motivo
                      </th>
                      <th class="text-center table-header">
                        Registro
                      </th>
                      <th class="text-center table-header">
                        Data
                      </th>
                      <th class="text-center table-header">
                        Usuário
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ocorrencia in search" :key="ocorrencia.id">
                      <td class="table-font">{{ ocorrencia.tipo }}</td>
                      <td class="table-font">{{ ocorrencia.nome }}</td>
                      <td class="table-font">{{ ocorrencia.placa }}</td>
                      <td class="table-font">{{ ocorrencia.expresso }}</td>
                      <td class="table-font">{{ ocorrencia.origem }}</td>
                      <td class="table-font">{{ ocorrencia.destino }}</td>
                      <td class="table-font">{{ ocorrencia.smp }}</td>
                      <td class="table-font">{{ ocorrencia.valor }}</td>
                      <td class="table-font">{{ ocorrencia.motivo }}</td>
                      <td class="table-font">{{ ocorrencia.registro }}</td>
                      <td class="table-font">
                        {{ formatDate(ocorrencia.data) }}
                      </td>
                      <td class="table-font">{{ ocorrencia.usuario }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from "../../services/api";

export default {
  name: "PesquisarOcorrencia",
  data: () => ({
    ocorrencias: [],
    pesquisa: "",
  }),
  methods: {
    formatDate(date) {
      let splitDate = date.split(" ");
      let onlyDate = splitDate[0]
        .split("-")
        .reverse()
        .join("/");
      let onlyHour = splitDate[1];
      return `${onlyDate} - ${onlyHour}`;
    },
  },
  computed: {
    search() {
      try {
        if (this.pesquisa == "" || this.pesquisa == " ") {
          return null;
        } else {
          let exp = new RegExp(this.pesquisa.trim(), "i");
          return this.ocorrencias.filter((ocorrencia) =>
            exp.test(ocorrencia.placa)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhuma ocorrência encontrada!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  },
  async created() {
    try {
      await api()
        .get("ocorrencia")
        .then((res) => {
          this.ocorrencias = res.data;
        });
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
};
</script>

<style scoped>
.table-header {
  background-color: #60a3bc !important;
  color: #fff !important;
}
.table-font {
  font-size: 0.8rem !important;
  text-align: center;
}
</style>
