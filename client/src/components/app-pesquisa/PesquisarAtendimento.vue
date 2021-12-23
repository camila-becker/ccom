<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3 class="text-center blue-grey--text">Pesquisar Atendimento</h3>
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
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-text-field
              label="Digite o motivo do atendimento"
              v-model="pesquisaMotivo"
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
                        Contato
                      </th>
                      <th class="text-center table-header">
                        Placa
                      </th>
                      <th class="text-center table-header">
                        Filial
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
                    <tr v-for="atendimento in search" :key="atendimento.id">
                      <td class="table-font">{{ atendimento.nome }}</td>
                      <td class="table-font">{{ atendimento.placa }}</td>
                      <td class="table-font">{{ atendimento.filial }}</td>
                      <td class="table-font">{{ atendimento.motivo }}</td>
                      <td class="table-font">{{ atendimento.registro }}</td>
                      <td class="table-font">
                        {{ formatDate(atendimento.data) }}
                      </td>
                      <td class="table-font">{{ atendimento.usuario }}</td>
                    </tr>

                    <tr
                      v-for="atendimento in searchMotivo"
                      :key="atendimento.id"
                    >
                      <td class="table-font">{{ atendimento.nome }}</td>
                      <td class="table-font">{{ atendimento.placa }}</td>
                      <td class="table-font">{{ atendimento.filial }}</td>
                      <td class="table-font">{{ atendimento.motivo }}</td>
                      <td class="table-font">{{ atendimento.registro }}</td>
                      <td class="table-font">
                        {{ formatDate(atendimento.data) }}
                      </td>
                      <td class="table-font">{{ atendimento.usuario }}</td>
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
  name: "PesquisarAtendimento",
  data: () => ({
    atendimentos: [],
    pesquisa: "",
    pesquisaMotivo: "",
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
          return this.atendimentos.filter((atendimento) =>
            exp.test(atendimento.placa)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhum atendimento encontrado!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
    searchMotivo() {
      try {
        if (this.pesquisaMotivo == "" || this.pesquisaMotivo == " ") {
          return null;
        } else {
          let exp = new RegExp(this.pesquisaMotivo.trim(), "i");
          return this.atendimentos.filter((atendimento) =>
            exp.test(atendimento.motivo)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhum atendimento encontrado!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  },
  async created() {
    try {
      await api()
        .get("atendimento")
        .then((res) => {
          this.atendimentos = res.data;
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
