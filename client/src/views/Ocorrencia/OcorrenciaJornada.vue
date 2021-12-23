<template>
  <div>
    <app-nav />
    <v-container>
      <OcorrenciaJornada />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import OcorrenciaJornada from "../../components/app-ocorrencia/OcorrenciaJornada";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    OcorrenciaJornada,
  },
};
</script>
