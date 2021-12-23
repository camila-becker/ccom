<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="" md="12" lg="12">
        <h3 class="text-center blue-grey--text">Painel de Viagem Vazio</h3>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            <v-col cols="12" sm="12" md="2" lg="2">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details=""
              ></v-text-field>
            </v-col>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="viagens"
            :search="search"
            :footer-props="{ itemsPerPageText: 'Linhas por página' }"
            noDataText="Nenhuma viagem encontrada!"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="save(item)" medium class="mr-2">
                check
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-btn @click="reload" color="#2c3e50" class="white--text"
          >Recarregar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "../../../services/api";
export default {
  name: "PainelViagem",
  data: () => ({
    valid: true,
    done: false,
    search: "",
    headers: [
      { align: "center", text: "Data/Hora", value: "data", sortable: false },
      { align: "center", text: "Placa", value: "placa", sortable: false },
      {
        align: "center",
        text: "Motorista",
        value: "motorista",
        sortable: false,
      },
      {
        align: "center",
        text: "Estado de Origem",
        value: "estadoOrigem",
        sortable: false,
      },
      {
        align: "center",
        text: "Cidade de Origem",
        value: "cidadeOrigem",
        sortable: false,
      },
      {
        align: "center",
        text: "Estado de Destino",
        value: "estadoDestino",
        sortable: false,
      },
      {
        align: "center",
        text: "Cidade de Destino",
        value: "cidadeDestino",
        sortable: false,
      },
      {
        align: "center",
        text: "Distância",
        value: "distancia",
        sortable: false,
      },
      {
        align: "center",
        text: "Autorizado por",
        value: "nome",
        sortable: false,
      },
      {
        align: "center",
        text: "Controle de Jornada",
        value: "jornada",
        sortable: false,
      },
      {
        align: "center",
        text: "Observação",
        value: "observacao",
        sortable: false,
      },
      { align: "center", text: "Ação", value: "actions", sortable: false },
    ],
    currentUser: "",
  }),
  computed: {
    ...mapState(["viagens"]),
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.loadViagens();
  },
  methods: {
    ...mapActions(["loadViagens", "saveChecklist"]),
    validate() {
      this.$refs.form.validate();
    },
    getObs(item) {
      return `Origem: ${item.cidadeOrigem} / ${item.estadoOrigem}, 
              Destino: ${item.cidadeDestino} / ${item.estadoDestino},
              Motorista: ${item.motorista},
              Jornada: ${item.jornada}
      `;
    },
    async save(item) {
      try {
        const dados = {
          nome: item.nome,
          placa: item.placa,
          vinculo: "Frota",
          filial: "01 - CAN",
          canal: "E-mail",
          motivo: "Viagem Vazio (Modular)",
          registro: this.getObs(item),
          usuario: this.currentUser.user.nome,
        };
        await api().post("atendimento", dados);
        this.$swal({
          icon: "success",
          text: "Atendimento registrado com sucesso!",
          showConfirmButton: false,
          timer: 1800,
        });
        this.changeStatus(item.id);
        setInterval(() => {
          document.location.reload();
        }, 1800);
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
    async changeStatus(id) {
      try {
        const dados = {
          status: "Fechado",
        };
        await api().put(`viagem-vazio/${id}`, dados);
      } catch (error) {
        console.log(error);
      }
    },
    reload() {
      document.location.reload();
    },
  },
};
</script>

<style>
.table-header {
  background-color: #60a3bc !important;
  color: #fff !important;
}
.table-font {
  font-size: 0.8rem !important;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 70vh;
  border-radius: 10px;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #fff;
  justify-content: space-between;
  background-color: #2c3e50;
  text-transform: uppercase;
  padding: 15px;
  display: flex;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.is-closed {
  display: none;
}

@media (min-width: 700px) {
  .modal {
    width: 30vw;
    height: 70vh;
  }
}
</style>
