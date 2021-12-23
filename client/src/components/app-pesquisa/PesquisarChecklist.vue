<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3 class="text-center blue-grey--text">Pesquisar Checklist</h3>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-text-field
              label="Digite a placa do cavalo"
              v-model="pesquisa"
              append-icon="search"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-text-field
              label="Digite a placa da carreta"
              v-model="pesquisaCarreta1"
              append-icon="search"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="3">
            <v-text-field
              label="Digite a placa da carreta 2"
              v-model="pesquisaCarreta2"
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
                        Cavalo
                      </th>
                      <th class="text-center table-header">
                        Carreta 1
                      </th>
                      <th class="text-center table-header">
                        Carreta 2
                      </th>
                      <th class="text-center table-header">
                        Tipo
                      </th>
                      <th class="text-center table-header">
                        Tecnologia
                      </th>
                      <th class="text-center table-header">
                        Vínculo
                      </th>
                      <th class="text-center table-header">
                        Contato
                      </th>
                      <th class="text-center table-header">
                        Filial
                      </th>
                      <th class="text-center table-header">
                        Status
                      </th>
                      <th class="text-center table-header">
                        Base
                      </th>
                      <th class="text-center table-header">
                        Data
                      </th>
                      <th class="text-center table-header">
                        Validade
                      </th>
                      <th class="text-center table-header">
                        Observação
                      </th>
                      <th class="text-center table-header">
                        Usuário
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="checklist in search" :key="checklist.id">
                      <td class="table-font text-center">
                        {{ checklist.placa }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta1 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta2 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tipo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tecnologia }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.vinculo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.nome }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.filial }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.status }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.base }}
                      </td>
                      <td class="table-font text-center">
                        {{ formatDate(checklist.data) }}
                      </td>
                      <td
                        class="table-font text-center"
                        v-if="
                          checklist.vinculo === 'Autônomo' ||
                            checklist.status === 'Válido' ||
                            checklist.status === 'Reprovado' ||
                            checklist.status === 'Cancelado'
                        "
                      >
                        <span class="notValid">Não possui validade!</span>
                      </td>
                      <td class="table-font text-center" v-else>
                        {{ checklist.validade }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.motivo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.usuario }}
                      </td>
                    </tr>

                    <tr v-for="checklist in searchCarreta1" :key="checklist.id">
                      <td class="table-font text-center">
                        {{ checklist.placa }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta1 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta2 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tipo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tecnologia }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.vinculo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.nome }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.filial }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.status }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.base }}
                      </td>
                      <td class="table-font text-center">
                        {{ formatDate(checklist.data) }}
                      </td>
                      <td
                        class="table-font text-center"
                        v-if="
                          checklist.vinculo === 'Autônomo' ||
                            checklist.status === 'Válido' ||
                            checklist.status === 'Reprovado' ||
                            checklist.status === 'Cancelado'
                        "
                      >
                        <span class="notValid">Não possui validade!</span>
                      </td>
                      <td class="table-font text-center" v-else>
                        {{ checklist.validade }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.motivo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.usuario }}
                      </td>
                    </tr>

                    <tr v-for="checklist in searchCarreta2" :key="checklist.id">
                      <td class="table-font text-center">
                        {{ checklist.placa }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta1 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.placaCarreta2 }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tipo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.tecnologia }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.vinculo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.nome }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.filial }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.status }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.base }}
                      </td>
                      <td class="table-font text-center">
                        {{ formatDate(checklist.data) }}
                      </td>
                      <td
                        class="table-font text-center"
                        v-if="
                          checklist.vinculo === 'Autônomo' ||
                            checklist.status === 'Válido' ||
                            checklist.status === 'Reprovado' ||
                            checklist.status === 'Cancelado'
                        "
                      >
                        <span class="notValid">Não possui validade!</span>
                      </td>
                      <td class="table-font text-center" v-else>
                        {{ checklist.validade }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.motivo }}
                      </td>
                      <td class="table-font text-center">
                        {{ checklist.usuario }}
                      </td>
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
import { mapState } from "vuex";
export default {
  name: "PesquisarChecklist",
  data: () => ({
    checklists: [],
    pesquisa: "",
    pesquisaCarreta1: "",
    pesquisaCarreta2: "",
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
    ...mapState(["currentUser", "checklist"]),
    search() {
      try {
        if (this.pesquisa == "" || this.pesquisa == " ") {
          return null;
        } else {
          let exp = new RegExp(this.pesquisa.trim(), "i");
          return this.checklists.filter((checklist) =>
            exp.test(checklist.placa)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhum checklist encontrado!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
    searchCarreta1() {
      try {
        if (this.pesquisaCarreta1 == "" || this.pesquisaCarreta1 == " ") {
          return null;
        } else {
          let expCarreta1 = new RegExp(this.pesquisaCarreta1.trim(), "i");
          return this.checklists.filter((checklist) =>
            expCarreta1.test(checklist.placaCarreta1)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhum checklist encontrado!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
    searchCarreta2() {
      try {
        if (this.pesquisaCarreta2 == "" || this.pesquisaCarreta2 == " ") {
          return null;
        } else {
          let expCarreta2 = new RegExp(this.pesquisaCarreta2.trim(), "i");
          return this.checklists.filter((checklist) =>
            expCarreta2.test(checklist.placaCarreta2)
          );
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          icon: "error",
          text: "Nenhum checklist encontrado!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  },
  async created() {
    this.$store.dispatch("loadCurrentUser");
    try {
      await api()
        .get("pesquisar-checklist")
        .then((res) => {
          this.checklists = res.data;
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
.notValid {
  color: #c53030 !important;
}
</style>
