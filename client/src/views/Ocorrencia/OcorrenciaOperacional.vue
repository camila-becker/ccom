<template>
  <div>
    <app-nav />
    <v-container>
      <OcorrenciaOperacional />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import OcorrenciaOperacional from "../../components/app-ocorrencia/OcorrenciaOperacional";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    OcorrenciaOperacional,
  },
};
</script>
