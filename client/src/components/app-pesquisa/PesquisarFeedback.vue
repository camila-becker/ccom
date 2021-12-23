<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Feedback Colaboradores CCOM
        </h3>
      </v-col>
      <v-col cols="12">
        <v-btn color="#2c3e50" class="white--text" @click="download">
          Download
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="feedbacks"
          :footer-props="{
            itemsPerPageText: 'Linhas por página',
            'items-per-page-options': [5, 10, 25, 50, 100],
          }"
          :items-per-page="5"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="900px">
              <v-card>
                <v-card-title>
                  <span class="text-button text-center">Editar Feedback</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Colaborador"
                          v-model="info.colaborador"
                          outlined
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Motivo"
                          v-model="info.motivo"
                          outlined
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Observações"
                          v-model="info.observacao"
                          outlined
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Expectativas"
                          v-model="info.expectativas"
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
                    Feedback excluido com sucesso!
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "../../services/api";
import { downloadReports } from "../../helpers";
export default {
  name: "PesquisarFeedback",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Colaborador",
        align: "center",
        sortable: false,
        value: "colaborador",
      },
      {
        text: "Motivo",
        align: "center",
        sortable: false,
        value: "motivo",
      },
      {
        text: "Observação",
        align: "center",
        sortable: false,
        value: "observacao",
      },
      {
        text: "Expectativas",
        align: "center",
        sortable: false,
        value: "expectativas",
      },
      {
        text: "Data",
        align: "center",
        sortable: false,
        value: "data",
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
    feedbacks: [],
    editedIndex: -1,
    info: {
      colaborador: "",
      motivo: "",
      observacao: "",
      expectativas: "",
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
      const response = await api().get("feedbacks");
      this.feedbacks = response.data;
    },
    editItem(item) {
      this.editedIndex = this.feedbacks.indexOf(item);
      this.info = {
        colaborador: item.colaborador,
        motivo: item.motivo,
        observacao: item.observacao,
        expectativas: item.expectativas,
      };
      this.dialog = true;
    },
    async deleteItem(item) {
      this.editedIndex = this.feedbacks.indexOf(item);
      this.dialogDelete = true;
      await api().delete(`feedbacks/${this.feedbacks[this.editedIndex].id}`);
      this.info = Object.assign({}, item);
    },
    deleteItemConfirm() {
      this.feedbacks.splice(this.editedIndex, 1);
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
        this.editedIndex = -1;
      });
    },
    async save() {
      const dados = {
        colaborador: this.info.colaborador,
        motivo: this.info.motivo,
        observacao: this.info.observacao,
        expectativas: this.info.expectativas,
      };
      if (this.editedIndex > -1) {
        await api().put(
          `feedbacks/${this.feedbacks[this.editedIndex].id}`,
          dados
        );
        Object.assign(this.feedbacks[this.editedIndex], this.info);
      }
      this.close();
    },
    download() {
      try {
        downloadReports("feedbacks", this.feedbacks);
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
