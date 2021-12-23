<template>
  <v-list dense nav>
    <v-list-item
      v-if="currentUser.user.permissao === 'Administrador'"
      link
      class="mb-5"
    >
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">admin_panel_settings</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              ADM
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/adm-atendimento" class="link white--text">
              <v-list-item-title class="text-button">
                Atendimento
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/adm-ocorrencia" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Ocorrência
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/adm-checklist" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Checklist
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item link class="mb-5">
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">phone</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Atendimento
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/atendimento" class="link white--text">
              <v-list-item-title class="text-button">
                Novo
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/pesquisar-atendimento" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Pesquisar
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item link class="mb-5">
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">report</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Ocorrência
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/ocorrencia-modular" class="link white--text">
              <v-list-item-title class="text-button">
                Modular
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/ocorrencia-jornada" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Controle de Jornada
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/ocorrencia-gerenciadora" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Gerenciamento de Risco
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/ocorrencia-geral" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Geral
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/ocorrencia-operacional" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Operacional
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/pesquisar-ocorrencia" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Pesquisar
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item link class="mb-5">
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">check</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Checklist
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/registrar-checklist" class="link white--text">
              <v-list-item-title class="text-button">
                Novo
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/checklist" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Painel
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/pesquisar-checklist" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Pesquisar
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item link class="mb-5">
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">directions_bus</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Viagens
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/viagem" class="link white--text">
              <v-list-item-title class="text-button">
                Painel
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item
      v-if="currentUser.user.permissao === 'Administrador'"
      link
      class="mb-5"
    >
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">insert_drive_file</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              DDR
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/ddr" class="link white--text">
              <v-list-item-title class="text-button">
                Novo
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/pesquisar-ddr" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Pesquisar
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item
      v-if="currentUser.user.permissao === 'Administrador'"
      link
      class="mb-5"
    >
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">people</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Cadastro
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/novo-cadastro" class="link white--text">
              <v-list-item-title class="text-button">
                Novo
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/cadastros" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Cadastros
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item
      v-if="currentUser.user.nome === 'Giulian Souza' || currentUser.user.nome === 'Carine Miller' || currentUser.user.nome === 'Camila Becker'"
      link
      class="mb-5"
    >
      <v-list-group class="nav-size">
        <template v-slot:activator>
          <v-icon class="white--text mr-5">checklist_rtl</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text text-button">
              Feedback
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <router-link to="/novo-feedback" class="link white--text">
              <v-list-item-title class="text-button">
                Novo
              </v-list-item-title>
            </router-link>
            <v-divider class="mt-2"></v-divider>
            <router-link to="/feedback" class="link white--text">
              <v-list-item-title class="text-button mt-4">
                Pesquisar
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item>
    <v-list-item
      v-if="currentUser.user.permissao === 'Administrador'"
      link
      class="mb-5"
    >
      <router-link to="/relatorio" class="link d-flex align-center size pl-2">
        <v-icon class="white--text mr-5">bar_chart</v-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text text-button">
            Relatórios
          </v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "AppMenu",
  data: () => ({
    currentUser: "",
  }),
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
};
</script>

<style>
.nav-size {
  width: 100% !important;
}

.mdi-chevron-down::before {
  color: #fff;
  margin: 0 !important;
}

.link {
  text-decoration: none;
}

.size {
  width: 100%;
}
</style>
