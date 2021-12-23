<template>
  <div>
    <app-nav />
    <v-container fill-height fluid>
      <v-row justify="center"> </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
  },
  data: () => ({}),
};
</script>
