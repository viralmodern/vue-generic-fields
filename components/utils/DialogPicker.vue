<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="maxWidth"
    content-class="dialog_md"
    style="height: 100%;"
  >
    <v-card :loading="loading" class="d-flex flex-column fill-height">
      <v-card-title class="text-h5">
        {{ title }}
        <v-spacer />
        <v-btn icon @click="$emit('disagree')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <slot>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </slot>
      </v-card-text>
      <v-card-actions v-if="!hideFooter">
        <v-spacer></v-spacer>
        <v-btn
          color="default"
          :disabled="loading"
          text
          @click="$emit('disagree')"
          >{{ textDisagree }}</v-btn
        >
        <v-btn color="warning" :disabled="loading" text @click="agree">{{
          textAgree
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogPicker',
  data() {
    return {
      loading: false,
    }
  },
  props: {
    dialog: {
      type: Boolean,
    },
    title: {
      type: String,
      default: "Use Google's location service?",
    },
    textDisagree: {
      type: String,
      default: 'Disagree',
    },
    textAgree: {
      type: String,
      default: 'Agree',
    },
    maxWidth: {
      type: Number,
      default: 390,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  methods: {
    async agree() {
      this.$emit('agree')
      this.loading = true
      this.loading = false
    },
  },
  watch: {
    dialog() {
      this.loading = false
    },
  },
}
</script>

<style>
.dialog_md {
  height: 100%;
}
</style>
