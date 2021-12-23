<template>
  <div>
    <app-nav />
    <v-container>
      <AdmOcorrencia />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AdmOcorrencia from "../../components/app-adm/AdmOcorrencia";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AdmOcorrencia,
  },
};
</script>
