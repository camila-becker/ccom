<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="12" lg="12">
        <h3 class="text-center blue-grey--text mb-4">
          Usuários
        </h3>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :footer-props="{
            itemsPerPageText: 'Linhas por página',
            'items-per-page-options': [5, 10, 25, 50, 100],
          }"
          :items-per-page="5"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="text-button text-center">Editar Usuário</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Nome"
                          hint="Nome completo"
                          v-model="info.nome"
                          outlined
                          placeholder="Informe o nome completo"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Usuário"
                          hint="nome.sobrenome"
                          v-model="info.usuario"
                          outlined
                          placeholder="Informe o usuário"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Senha"
                          v-model="info.senha"
                          type="password"
                          outlined
                          placeholder="Informe a senha"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          label="Permissão"
                          v-model="info.permissao"
                          :items="['Administrador', 'Usuário']"
                          outlined
                          placeholder="Informe a permissão"
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
                    Cadastro excluido com sucesso!
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
export default {
  name: "PesquisarCadastro",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nome",
        align: "center",
        sortable: false,
        value: "nome",
      },
      {
        text: "Usuário",
        align: "center",
        sortable: false,
        value: "usuario",
      },
      {
        text: "Permissão",
        align: "center",
        sortable: false,
        value: "permissao",
      },
      { text: "Editar", value: "editar", sortable: false },
      { text: "Excluir", value: "excluir", sortable: false },
    ],
    usuarios: [],
    editedIndex: -1,
    info: {
      nome: "",
      usuario: "",
      senha: "",
      permissao: "",
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
      const response = await api().get("usuarios");
      this.usuarios = response.data;
    },
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.info = {
        nome: item.nome,
        usuario: item.usuario,
        senha: item.senha,
        permissao: item.permissao,
      };
      this.dialog = true;
    },
    async deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.dialogDelete = true;
      await api().delete(`usuarios/${this.usuarios[this.editedIndex].id}`);
      this.info = Object.assign({}, item);
    },
    deleteItemConfirm() {
      this.usuarios.splice(this.editedIndex, 1);
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
        nome: this.info.nome,
        usuario: this.info.usuario,
        senha: this.info.senha,
        permissao: this.info.permissao,
      };
      if (this.editedIndex > -1) {
        await api().put(
          `usuarios/${this.usuarios[this.editedIndex].id}`,
          dados
        );
        Object.assign(this.usuarios[this.editedIndex], this.info);
      }
      this.close();
    },
  },
};
</script>
