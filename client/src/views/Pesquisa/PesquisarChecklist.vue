<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarChecklist class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarChecklist from "../../components/app-pesquisa/PesquisarChecklist";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarChecklist,
  },
};
</script>
