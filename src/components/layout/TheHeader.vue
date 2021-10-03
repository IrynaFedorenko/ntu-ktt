<template>
  <header>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="header-content">
            <router-link :to="{ name: 'Home' }">НТУ</router-link>
            <span :key="this.$route.name">{{ description() }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-4"></v-divider>
  </header>
</template>

<style scoped lang="scss">
header {
  margin-bottom: 48px;

  hr.v-divider {
    margin: 0 !important;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
      font-size: 24px;
    }

    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>

<script>
export default {
  name: "Header",
  methods: {
    description() {
      switch (this.$route.name) {
        case "FormationCargoUnit":
          return "Кафедра траснпортних технологій | Формування вантажної одиниці";
      }
    },
  },
};
</script>
