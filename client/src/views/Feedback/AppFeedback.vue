<template>
  <div>
    <app-nav />
    <v-container>
      <AppFeedback />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppNavegacao from "../../components/app-navegacao/AppNavegacao";
import AppFooter from "../../components/app-footer/AppFooter";
import AppFeedback from "../../components/app-feedback/AppFeedback";
export default {
  components: {
    "app-nav": AppNavegacao,
    "app-footer": AppFooter,
    AppFeedback,
  },
};
</script>
