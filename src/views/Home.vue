<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card elevation="6" class="home-container">
          <v-card-title>ЗАТТ</v-card-title>
          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <router-link :to="{ name: 'FormationCargoUnit' }">Формування вантажної одиниці.</router-link>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-card elevation="6" class="home-container">
          <v-card-title>ЗАТТ</v-card-title>
          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <router-link :to="{ name: 'AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle' }">
              Аналіз техніко-експлуатаційних характеристик АТЗ
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.home-container {
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>

<script>
export default {
  name: "Home",
};
</script>
