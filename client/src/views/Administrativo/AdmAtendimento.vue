<template>
  <div>
    <app-nav />
    <v-container>
      <AdmAtendimento />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AdmAtendimento from "../../components/app-adm/AdmAtendimento";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AdmAtendimento,
  },
};
</script>
