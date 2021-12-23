<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarOcorrencia class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarOcorrencia from "../../components/app-pesquisa/PesquisarOcorrencia";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarOcorrencia,
  },
};
</script>
