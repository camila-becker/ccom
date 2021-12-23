<template>
  <div>
    <v-container class="checklist-container" fluid>
      <AppChecklist />
    </v-container>
    <app-footer class="footer" />
  </div>
</template>

<script>
import AppFooter from "../../components/app-footer/AppFooter";
import AppChecklist from "../../components/app-checklist/AppChecklist";
export default {
  components: {
    "app-footer": AppFooter,
    AppChecklist,
  },
};
</script>

<style scoped>
.checklist-container {
  background: #2c3e50;
}
.footer {
  position: absolute;
}
</style>
