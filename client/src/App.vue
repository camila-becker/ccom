<template>
  <v-app>
    <v-row>
      <v-main class="main">
        <router-view class="padding-router"></router-view>
      </v-main>
    </v-row>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.main {
  padding-bottom: 0 !important;
}

.padding-router{
  padding-bottom: 60px;
}
</style>
