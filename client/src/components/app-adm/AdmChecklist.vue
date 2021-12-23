<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="12" lg="12">
      <v-data-table
        :headers="headers"
        :items="checklists"
        :footer-props="{
          itemsPerPageText: 'Linhas por página',
          'items-per-page-options': [5, 10, 25, 50, 100],
        }"
        :items-per-page="5"
        sort-by="data"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <h3 class="text-button">Checklist CCOM</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-button">
                  Checklist excluido com sucesso!
                </v-card-title>
                <v-card-actions>
                  <v-btn color="#60a3bc" text @click="deleteItemConfirm">
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium @click="deleteItem(item, item.id)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../services/api";
export default {
  name: "AdmChecklist",
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        text: "Filial",
        align: "start",
        sortable: false,
        value: "filial",
      },
      { text: "Cavalo", value: "placa" },
      { text: "Carreta 1", value: "placaCarreta1" },
      { text: "Carreta 2", value: "placaCarreta2" },
      { text: "Tipo", value: "tipo" },
      { text: "Tecnologia", value: "tecnologia" },
      { text: "Vínculo", value: "vinculo" },
      { text: "Quem solicitou", value: "nome" },
      { text: "Status", value: "status" },
      { text: "Data", value: "data" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    checklists: [],
    editedIndex: -1,
  }),
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const response = await api().get("checklist");
      this.checklists = response.data;
    },
    async deleteItem(item, id) {
      await api().delete(`checklist/${id}`);
      this.editedIndex = this.checklists.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.checklists.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
  },
};
</script>
