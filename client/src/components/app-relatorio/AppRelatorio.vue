<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="8">
        <RelatorioAtendimento />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="8">
        <RelatorioOcorrencia />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="8">
        <RelatorioChecklist />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="8">
        <RelatorioViagemVazio />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="8">
        <RelatorioDDR />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RelatorioAtendimento from "./RelatorioAtendimento.vue";
import RelatorioOcorrencia from "./RelatorioOcorrencia.vue";
import RelatorioChecklist from "./RelatorioChecklist.vue";
import RelatorioViagemVazio from "./RelatorioViagemVazio.vue";
import RelatorioDDR from "./RelatorioDDR.vue";

export default {
  name: "AppRelatorio",
  components: {
    RelatorioAtendimento,
    RelatorioOcorrencia,
    RelatorioChecklist,
    RelatorioViagemVazio,
    RelatorioDDR,
  },
};
</script>
