<template>
  <v-snackbar
    multi-line
    color="transparent"
    bottom
    left
    v-model="snackbar"
    :vertical="vertical"
    style=""
    class="pa-0 ma-0 snack_curd"
  >
    <v-alert
      :dismissible="true"
      class="mb-0"
      v-model="snackbar"
      :color="type"
      border="left"
      elevation="2"
      colored-border
      :icon="iconAlert"
    >
      <div style="max-width: 280px; width: 100%" v-html="text"></div>
    </v-alert>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertCURD',
  data: () => ({
    snackbar: false,

    text: 'Lorem ipsum dolor sit amet',
    vertical: true,
    alert: true,
    timeout: 10 * 1000,

    type: 'success', // success, warning, info, error
    icon: 'mdi-check-circle' //<!--mdi-check-circle mdi-information mdi-exclamation mdi-alert-->
  }),
  mounted() {
    let _self = this
    this.$eventHub.$on('alert-curd', ({ text, type }) => {
      this.snackbar = true
      this.text = text
      this.type = type
    })
  },
  computed: {
    iconAlert() {
      if (this.type === 'error') return 'mdi-alert'
      return 'mdi-check-circle'
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped>
.snack_curd /deep/ .v-snack__content {
  padding: 0 !important;
  background: unset !important;
  margin-bottom: 0px !important;
  width: 100% !important;
  max-width: unset !important;
  min-width: unset !important;
  /*background: red !important;*/
}
</style>
