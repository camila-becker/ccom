<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarCadastro class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarCadastro from "../../components/app-pesquisa/PesquisarCadastro";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarCadastro,
  },
};
</script>
