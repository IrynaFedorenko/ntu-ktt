<template>
  <footer>
    <v-divider class="mx-4"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="footer-content">
            <span>&copy; 2021. Федоренко Ірина Олександрівна</span>
            <a href="tg://resolve?domain=iryna_fedorenko_ntu" target="_blanc">
              <svg width="31" height="25" viewBox="0 0 31 25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30.4119 2.27592L25.8851 23.4909C25.5435 24.9882 24.6529 25.3608 23.3873 24.6554L16.49 19.6046L13.1619 22.7855C12.7935 23.1515 12.4855 23.4576 11.7757 23.4576L12.2712 16.4769L25.0547 4.99767C25.6105 4.50522 24.9342 4.23238 24.1909 4.72483L8.3873 14.6136L1.58373 12.4974C0.103817 12.0383 0.0770314 11.0268 1.89176 10.3214L28.5034 0.133132C29.7355 -0.326037 30.8136 0.405972 30.4119 2.27592Z"
                />
              </svg>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
footer {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 48px;

  hr.v-divider {
    margin: 0 !important;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;

    svg {
      width: 18px;
      fill: rgba(0, 0, 0, 0.6);
      margin-top: -1px;
    }
  }
}
</style>
