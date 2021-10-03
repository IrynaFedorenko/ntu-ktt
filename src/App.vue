<template>
  <v-app class="app-container">
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<style lang="scss">
body > div.app-container {
  p {
    margin: 0;
    padding: 0;
  }
}
</style>

<script>
import TheHeader from "components/layout/TheHeader";
import TheFooter from "components/layout/TheFooter";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
