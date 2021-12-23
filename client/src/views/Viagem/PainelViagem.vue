<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PainelViagem class="mx-5" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PainelViagem from "../../components/app-viagem/painel-viagem/PainelViagem";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PainelViagem,
  },
};
</script>
