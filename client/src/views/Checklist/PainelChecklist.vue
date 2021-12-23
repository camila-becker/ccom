<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PainelChecklist class="mx-5"/>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PainelChecklist from "../../components/app-checklist/painel-checklist/PainelChecklist";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PainelChecklist,
  },
};
</script>
