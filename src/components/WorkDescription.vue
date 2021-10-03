<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="6" class="work-description-container">
        <v-card-title>{{ description.title }}</v-card-title>
        <v-card-text>{{ description.description }}</v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Мета</v-card-title>
        <v-card-text>{{ description.purpose }}</v-card-text>

        <v-card-title>Задачі</v-card-title>
        <v-card-text>
          <ol>
            <li v-for="item in description.tasks" :key="item.name">
              {{ item }}
            </li>
          </ol>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.work-description-container {
  & > div:not(:last-child) {
    padding-bottom: 6px;
  }

  hr {
    margin-top: 12px;
  }
}
</style>

<script>
export default {
  name: "WorkDescription",
  props: {
    description: Object,
  },
};
</script>
