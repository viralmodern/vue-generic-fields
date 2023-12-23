<template>
  <v-overlay :value="overlay" z-index="999">
    <v-card light max-width="400">
      <v-card-title class="text-h5">
        Are you sure you want to delete?
      </v-card-title>
      <v-card-text>
        <div class="mb-2">
          This action can lead to data loss. To prevent accidental actions we
          ask you to confirm your intention.
          <br /><br />
          Please type <code>{{ code }}</code> to proceed or close this modal to
          cancel.
        </div>
        <v-text-field
          :error="error"
          v-model="name"
          label="Matter name"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" small text @click="overlay = false"
          >Cancel</v-btn
        >
        <v-btn color="error" depressed small @click="confirmDel">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'TheModalRemoveMatter',
  data() {
    return {
      overlay: false,
      clickConfirm: () => {},
      code: 'Matter name',
      name: '',
      error: false,
    }
  },
  mounted() {
    let _self = this
    this.$eventHub.$on('confirm-matter-remove', (fun, name) => {
      _self.clickConfirm = fun
      _self.overlay = true
      _self.code = name
      this.error = false
    })
  },
  methods: {
    confirmDel() {
      let isValid = this.code.localeCompare(this.name) === 0
      this.error = !isValid
      if (!isValid) return
      this.clickConfirm()
      this.overlay = false
    },
  },
}
</script>

<style scoped></style>
