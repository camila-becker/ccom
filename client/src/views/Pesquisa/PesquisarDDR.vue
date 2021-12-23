<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarDDR class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarDDR from "../../components/app-pesquisa/PesquisarDDR";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarDDR,
  },
};
</script>
