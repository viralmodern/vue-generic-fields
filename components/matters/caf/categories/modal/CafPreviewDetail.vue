<template>
  <v-card flat color="transparent" :loading="dialog">
    <v-card-title style="position: sticky; top: 0px; background: #ffffff;">
      {{ title }}
      <v-spacer />
      <v-btn
        :disabled="dialog"
        :color="item.activate ? 'warning' : 'primary'"
        @click="useFeature"
        class="text-capitalize"
      >
        {{ item.activate ? 'Remove this Caf' : 'Use this Caf' }}
        <v-icon right>mdi-arrow-right</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text v-html="description"> </v-card-text>
    <v-card-text>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
    </v-card-text>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-title class="text-subtitle-1">
          Please stand by
        </v-card-title>
        <v-card-text>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'CafPreviewDetail',
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    description: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  methods: {
    async useFeature() {
      this.dialog = true
      try {
        let isRemove = this.item.activate
        this.$emit('changeUse', this.item, isRemove)
        // removeCaf
        this.dialog = false
      } catch (e) {
        console.log(e.message)
        this.dialog = false
      }
    },
  },
}
</script>

<style scoped></style>
