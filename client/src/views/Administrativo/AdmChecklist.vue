<template>
  <div>
    <app-nav />
    <v-container>
      <AdmChecklist />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AdmChecklist from "../../components/app-adm/AdmChecklist";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AdmChecklist,
  },
};
</script>
