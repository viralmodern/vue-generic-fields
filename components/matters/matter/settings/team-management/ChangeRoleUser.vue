<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="390">
      <v-card :loading="loading">
        <v-card-title class="text-h5">
          Set role members
        </v-card-title>
        <v-card-text>
          <slot>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            :disabled="loading"
            text
            @click="$emit('disagree')"
            >Disagree</v-btn
          >
          <v-btn color="warning" :disabled="loading" text @click="agree"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ChangeRoleUser',
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

<style scoped></style>
