<template>
  <div>
    <app-nav />
    <v-container>
      <AppParametros />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppParametros from "../../components/app-parametros/AppParametros";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppParametros,
  },
};
</script>
