<template>
  <div>
    <app-nav />
    <v-container>
      <OcorrenciaModular />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import OcorrenciaModular from "../../components/app-ocorrencia/OcorrenciaModular";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    OcorrenciaModular,
  },
};
</script>
