<template>
  <div>
    <app-nav />
    <v-container>
      <AppCadastro />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppCadastro from "../../components/app-cadastro/AppCadastro";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppCadastro,
  },
};
</script>
