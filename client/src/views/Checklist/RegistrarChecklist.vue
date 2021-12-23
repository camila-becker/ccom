<template>
  <div>
    <app-nav />
    <v-container fluid>
      <RegistrarChecklist class="mx-5"/>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import RegistrarChecklist from "../../components/app-checklist/RegistrarChecklist";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    RegistrarChecklist,
  },
};
</script>
