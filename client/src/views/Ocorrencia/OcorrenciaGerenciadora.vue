<template>
  <div>
    <app-nav />
    <v-container>
      <OcorrenciaGerenciadora />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import OcorrenciaGerenciadora from "../../components/app-ocorrencia/OcorrenciaGerenciadora";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    OcorrenciaGerenciadora,
  },
};
</script>
