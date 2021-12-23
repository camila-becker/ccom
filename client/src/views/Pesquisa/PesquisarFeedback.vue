<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarFeedback class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarFeedback from "../../components/app-pesquisa/PesquisarFeedback";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarFeedback,
  },
};
</script>
