<template>
  <div>
    <app-nav />
    <v-container>
      <AppRelatorio />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppRelatorio from "../../components/app-relatorio/AppRelatorio";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppRelatorio,
  },
};
</script>
