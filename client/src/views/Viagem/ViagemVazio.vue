<template>
  <div>
    <v-container class="viagem-container" fluid>
      <AppViagem />
    </v-container>
    <app-footer class="footer" />
  </div>
</template>

<script>
import AppFooter from "../../components/app-footer/AppFooter";
import AppViagem from "../../components/app-viagem/AppViagem";
export default {
  components: {
    "app-footer": AppFooter,
    AppViagem,
  },
};
</script>

<style scoped>
.viagem-container {
  background: #2c3e50;
}

.footer {
  position: absolute;
}
</style>
