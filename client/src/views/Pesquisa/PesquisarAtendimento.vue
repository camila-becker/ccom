<template>
  <div>
    <app-nav />
    <v-container fluid>
      <PesquisarAtendimento class="mx-5"/>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import PesquisarAtendimento from "../../components/app-pesquisa/PesquisarAtendimento";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    PesquisarAtendimento,
  },
};
</script>
