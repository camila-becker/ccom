<template>
  <div>
    <app-nav />
    <v-container>
      <OcorrenciaGeral />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import OcorrenciaGeral from "../../components/app-ocorrencia/OcorrenciaGeral";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    OcorrenciaGeral,
  },
};
</script>
