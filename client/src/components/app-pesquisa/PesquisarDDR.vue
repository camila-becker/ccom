<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="12">
        <h3 class="text-center blue-grey--text mb-4">
          DDR
        </h3>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <v-col cols="4">
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
            :search="search"
            :items="ddr"
            :footer-props="{
              itemsPerPageText: 'Linhas por página',
              'items-per-page-options': [5, 10, 25, 50, 100],
            }"
            :items-per-page="5"
            sort-by="calories"
            class="elevation-1"
            noDataText="Nenhuma DDR encontrada!"
          >
            <template v-slot:[`item.vencimento`]="{ item }">
              <v-chip :color="getColor(item.vencimento)" dark>
                {{ item.vencimento }}
              </v-chip>
            </template>
            <template v-slot:top>
              <v-dialog v-model="dialog" max-width="1000px">
                <v-card>
                  <v-card-title>
                    <span class="text-button">Editar DDR</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Cliente"
                            hint="Razão social do cliente"
                            v-model="info.cliente"
                            outlined
                            placeholder="Informe o cliente"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Responsável Conta"
                            hint="Responsável pela conta"
                            v-model="info.responsavel"
                            outlined
                            placeholder="Informe o responsável"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="CNPJ"
                            v-model="info.cnpj"
                            v-mask="'##.###.###/####-##'"
                            outlined
                            placeholder="Informe o CNPJ"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            label="Seguradora"
                            v-model="info.seguradora"
                            :items="items.seguradoras"
                            outlined
                            placeholder="Informe a seguradora"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            label="Status"
                            v-model="info.status"
                            :items="['Em análise', 'Liberado']"
                            outlined
                            placeholder="Informe o status"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            label="Assinaturas"
                            v-model="info.assinaturas"
                            :items="['Sim', 'Não']"
                            outlined
                            placeholder="Possui assinatura?"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Intranet"
                            v-model="info.intranet"
                            v-mask="'##/##/####'"
                            outlined
                            placeholder="Colocado na intranet em:"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Apisul"
                            v-model="info.apisul"
                            v-mask="'##/##/####'"
                            outlined
                            placeholder="Enviado para Apisul em:"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Clicktrans"
                            v-model="info.clicktrans"
                            v-mask="'##/##/####'"
                            outlined
                            placeholder="Colocado no clicktrans em:"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Recebimento"
                            v-model="info.recebimento"
                            v-mask="'##/##/####'"
                            outlined
                            placeholder="Recebido em:"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label="Vencimento"
                            v-model="info.vencimento"
                            v-mask="'##/##/####'"
                            outlined
                            placeholder="Vence em:"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-textarea
                            label="Observação"
                            v-model="info.observacao"
                            value=""
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-row justify="center">
                    <v-card-actions>
                      <v-btn color="#2c3e50" class="white--text" @click="save">
                        Salvar
                      </v-btn>
                      <v-btn color="#c53030" class="white--text" @click="close">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-row justify="center">
                    <v-card-title class="text-button text-center">
                      DDR excluida com sucesso!
                    </v-card-title>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#2c3e50"
                      class="white--text"
                      @click="deleteItemConfirm"
                    >
                      OK
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:[`item.editar`]="{ item }">
              <v-icon medium @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:[`item.excluir`]="{ item }">
              <v-icon medium @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="#2c3e50" class="white--text" @click="initialize">
                Recarregar
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "../../services/api";
import { getItems, date, getDifference } from "../../helpers";
export default {
  name: "PesquisarDDR",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "Cliente",
        align: "center",
        sortable: false,
        value: "cliente",
      },
      {
        text: "Responsável",
        align: "center",
        sortable: false,
        value: "responsavel",
      },
      {
        text: "CNPJ",
        align: "center",
        sortable: false,
        value: "cnpj",
      },
      {
        text: "Seguradora",
        align: "center",
        sortable: false,
        value: "seguradora",
      },
      {
        text: "Status",
        align: "center",
        sortable: false,
        value: "status",
      },
      {
        text: "Assinaturas",
        align: "center",
        sortable: false,
        value: "assinaturas",
      },
      {
        text: "Intranet",
        align: "center",
        sortable: false,
        value: "intranet",
      },
      {
        text: "Apisul",
        align: "center",
        sortable: false,
        value: "apisul",
      },
      {
        text: "Clicktrans",
        align: "center",
        sortable: false,
        value: "clicktrans",
      },
      {
        text: "Recebimento",
        align: "center",
        sortable: false,
        value: "recebimento",
      },
      {
        text: "Vencimento",
        align: "center",
        sortable: false,
        value: "vencimento",
      },
      {
        text: "Observação",
        align: "center",
        sortable: false,
        value: "observacao",
      },
      {
        text: "Usuário",
        align: "center",
        sortable: false,
        value: "usuario",
      },
      { text: "Editar", value: "editar", sortable: false },
      { text: "Excluir", value: "excluir", sortable: false },
    ],
    ddr: [],
    editedIndex: -1,
    info: {
      contato: "",
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
    },
    items: {
      seguradoras: getItems().seguradoras,
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const response = await api().get("ddr");
      this.ddr = response.data;
    },
    getColor(vencimento) {
      if (getDifference(vencimento) < 0 || date() === vencimento) return "red";
      else if (getDifference(vencimento) <= 30) return "orange";
      else return "green";
    },
    editItem(item) {
      this.editedIndex = this.ddr.indexOf(item);
      this.info = {
        cliente: item.cliente,
        responsavel: item.responsavel,
        cnpj: item.cnpj,
        seguradora: item.seguradora,
        status: item.status,
        assinaturas: item.assinaturas,
        intranet: item.intranet,
        apisul: item.apisul,
        clicktrans: item.clicktrans,
        recebimento: item.recebimento,
        vencimento: item.vencimento,
        observacao: item.observacao,
      };
      this.dialog = true;
    },
    async deleteItem(item) {
      this.editedIndex = this.ddr.indexOf(item);
      await api().delete(`ddr/${this.ddr[this.editedIndex].id}`);
      this.info = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.ddr.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      const dados = {
        cliente: this.info.cliente,
        responsavel: this.info.responsavel,
        cnpj: this.info.cnpj,
        seguradora: this.info.seguradora,
        status: this.info.status,
        assinaturas: this.info.assinaturas,
        intranet: this.info.intranet,
        apisul: this.info.apisul,
        clicktrans: this.info.clicktrans,
        recebimento: this.info.recebimento,
        vencimento: this.info.vencimento,
        observacao: this.info.observacao,
      };
      if (this.editedIndex > -1) {
        await api().put(`ddr/${this.ddr[this.editedIndex].id}`, dados);
        Object.assign(this.ddr[this.editedIndex], this.info);
      }
      this.close();
    },
  },
};
</script>
