<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="" md="12" lg="12">
        <h3 class="text-center blue-grey--text">Painel de Checklist</h3>
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
            :items="checklist"
            :search="search"
            :footer-props="{ itemsPerPageText: 'Linhas por página' }"
            noDataText="Nenhum checklist em aberto!"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="doingChecklist(item)" medium class="mr-2">
                play_arrow
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
    <v-row justify="center" v-show="visibleModal">
      <transition name="modal-fade">
        <div class="modal-backdrop">
          <div
            class="modal"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
          >
            <header class="modal-header" id="modalTitle">
              <slot name="header"> Checklist filial: {{ info.filial }} </slot>
            </header>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
              class="modal-body"
              id="modalDescription"
              @submit.prevent="save"
            >
              <v-col cols="12">
                <v-text-field
                  v-model="info.email"
                  readonly
                  filled
                  label="E-mail"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.email2"
                  readonly
                  filled
                  label="E-mail"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.placa"
                  filled
                  label="Placa do Cavalo"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.placaCarreta1"
                  filled
                  label="Placa da Carreta"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.placaCarreta2"
                  filled
                  label="Placa da Carreta 2"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.tipo"
                  filled
                  label="Tipo de Veículo"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.numeroRastreador"
                  filled
                  label="Número do Rastreador"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="info.vinculo"
                  filled
                  :items="['Agregado', 'Autônomo', 'Frota']"
                  :rules="rules.vinculo"
                  required
                  label="Vínculo"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.nome"
                  readonly
                  filled
                  label="Quem solicitou o teste"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="info.filial"
                  readonly
                  filled
                  label="Filial"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="info.statusChecklist"
                  filled
                  :items="['Aprovado', 'Cancelado', 'Reprovado', 'Válido']"
                  :rules="rules.status"
                  required
                  label="Status"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="info.base"
                  filled
                  :items="['Apisul', 'CCOM']"
                  :rules="rules.base"
                  required
                  label="Base"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-if="
                    this.info.statusChecklist === 'Reprovado' ||
                      this.info.statusChecklist === 'Cancelado' ||
                      this.info.statusChecklist === 'Válido'
                  "
                  filled
                  v-model="dados.motivo"
                  :rules="rules.observacao"
                  required
                  label="* Motivo"
                  value=""
                ></v-textarea>
              </v-col>
              <v-row justify="center">
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  type="submit"
                  class="white--text mr-4"
                  color="#2c3e50"
                >
                  Registrar
                </v-btn>
                <v-btn @click="closeModal" class="white--text" color="#c53030">
                  Fechar
                </v-btn>
              </v-row>
            </v-form>
          </div>
        </div>
      </transition>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "../../../services/api";
export default {
  name: "PainelChecklist",
  data: () => ({
    valid: true,
    visibleModal: false,
    search: "",
    headers: [
      { align: "center", text: "Data/Hora", value: "data", sortable: false },
      { align: "center", text: "Filial", value: "filial", sortable: false },
      {
        align: "center",
        text: "Protocolo",
        value: "protocolo",
        sortable: false,
      },
      { align: "center", text: "Cavalo", value: "placa", sortable: false },
      {
        align: "center",
        text: "Carreta",
        value: "placaCarreta1",
        sortable: false,
      },
      {
        align: "center",
        text: "Carreta 2",
        value: "placaCarreta2",
        sortable: false,
      },
      { align: "center", text: "Tipo", value: "tipo", sortable: false },
      {
        align: "center",
        text: "Rastreador",
        value: "numeroRastreador",
        sortable: false,
      },
      {
        align: "center",
        text: "Tecnologia",
        value: "tecnologia",
        sortable: false,
      },
      { align: "center", text: "Vínculo", value: "vinculo", sortable: false },
      {
        align: "center",
        text: "Motorista",
        value: "motorista",
        sortable: false,
      },
      { align: "center", text: "Telefone", value: "telefone", sortable: false },
      {
        align: "center",
        text: "Observação",
        value: "observacao",
        sortable: false,
      },
      { align: "center", text: "Contato", value: "nome", sortable: false },
      { align: "center", text: "Status", value: "status", sortable: false },
      { align: "center", text: "Ação", value: "actions", sortable: false },
    ],
    info: {
      email: "",
      email2: "",
      placa: "",
      placaCarreta1: "",
      placaCarreta2: "",
      tipo: "",
      numeroRastreador: "",
      vinculo: "",
      nome: "",
      filial: "",
      statusChecklist: "",
      base: "",
      observacao: "",
      status: "",
    },
    dados: {
      motivo: "",
    },
    rules: {
      status: [(status) => !!status || "Informe o status!"],
      base: [(base) => !!base || "Informe a base!"],
      vinculo: [(vinculo) => !!vinculo || "Informe o vínculo!"],
      observacao: [(observacao) => !!observacao || "Informe o motivo!"],
    },
    currentUser: "",
  }),
  computed: {
    ...mapState(["checklist"]),
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.loadChecklist();
  },
  methods: {
    ...mapActions(["loadChecklist", "saveChecklist"]),
    validate() {
      this.$refs.form.validate();
    },
    async doingChecklist(item) {
      this.info = {
        id: item.id,
        email: item.email,
        email2: item.email2,
        placa: item.placa,
        placaCarreta1: item.placaCarreta1,
        placaCarreta2: item.placaCarreta2,
        tipo: item.tipo,
        numeroRastreador: item.numeroRastreador,
        tecnologia: item.tecnologia,
        vinculo: item.vinculo,
        nome: item.nome,
        filial: item.filial,
      };
      this.visibleModal = true;
    },
    async save() {
      try {
        const dados = {
          email: this.info.email,
          email2: this.info.email2,
          placa: this.info.placa,
          placaCarreta1: this.info.placaCarreta1,
          placaCarreta2: this.info.placaCarreta2,
          tipo: this.info.tipo,
          numeroRastreador: this.info.numeroRastreador,
          tecnologia: this.info.tecnologia,
          vinculo: this.info.vinculo,
          nome: this.info.nome,
          filial: this.info.filial,
          motivo: this.dados.motivo
            ? this.dados.motivo.trim()
            : this.dados.motivo,
          status: this.info.statusChecklist,
          base: this.info.base,
          validade: this.info.validade,
          usuario: this.currentUser.user.nome,
          plataforma: "App Checklist",
        };
        const dadosAtendimento = {
          nome: this.info.nome,
          placa: this.info.placa,
          filial: this.info.filial,
          motivo: "Solicitar Checklist (Modular)",
          registro: `Carreta(s): ${
            this.info.placaCarreta1 ? this.info.placaCarreta1 : ""
          }, ${this.info.placaCarreta2 ? this.info.placaCarreta2 : ""}`,
          usuario: this.currentUser.user.nome,
        };
        await api().post("registrar-checklist", dados);
        await api().post("atendimento", dadosAtendimento);
        this.doneChecklist(this.info.id);
        this.$swal({
          icon: "success",
          text: "Checklist registrado com sucesso!",
          showConfirmButton: false,
          timer: 1800,
        });
        this.closeModal();
        setInterval(() => {
          document.location.reload();
        }, 1800);
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Ocorreu um erro, atualize seu navegador!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
    closeModal() {
      this.visibleModal = false;
    },
    async doneChecklist(id) {
      try {
        const dados = {
          status: "Fechado",
        };
        await api().put(`checklist/${id}`, dados);
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
