<template>
  <v-btn icon small
         @click.stop="doDelete"
         :disabled="submitting$"
         :loading="submitting$">
    <v-icon small>
      mdi-delete
    </v-icon>
  </v-btn>
</template>

<script>

  export default {
    name: "DeleteField",
    props: {
      deleted$: {
        type: [Boolean, String, Number],
        default: () => false
      },
      endPoint: {
        type: String,
        required: true
      },
      options: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        submitting$: false
      }
    },
    methods: {
      async doDelete() {
        try {
          this.submitting$ = true
          this.$emit("submitting")
          await this.$api.delete(this.endPoint, this.options)
          this.$emit("submitted")
        } catch (e) {
          this.$emit("errored")
          console.error(e.toString())
        } finally {
          this.submitting$ = false
        }
      }
    }
  }
</script>

