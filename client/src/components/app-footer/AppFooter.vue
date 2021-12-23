<template>
  <v-footer class="font-weight-medium" color="#2c3e50" app>
    <v-col class="text-center white--text" cols="12">
      <strong> &copy; CCOM - Camila Becker</strong> /
      {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
