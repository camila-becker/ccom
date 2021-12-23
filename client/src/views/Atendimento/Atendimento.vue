<template>
  <div>
    <app-nav />
    <v-container>
      <AppAtendimento />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppAtendimento from "../../components/app-atendimento/AppAtendimento";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppAtendimento,
  },
};
</script>
