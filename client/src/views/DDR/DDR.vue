<template>
  <div>
    <app-nav />
    <v-container>
      <AppDDR />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppDDR from "../../components/app-ddr/AppDDR";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppDDR,
  },
};
</script>
