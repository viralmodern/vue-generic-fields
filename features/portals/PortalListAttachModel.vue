<template>
  <portal to="PortalListAttachModel">
    <v-autocomplete
      v-model="selected"
      outlined
      hide-details
      :items="findChoicesAttributeToModel"
      item-text="label"
      item-value="value"
      dense
      @change="handleInput"
      label="Select Model"
    ></v-autocomplete>
  </portal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PortalListAttachModel',
  props: ['value'],
  data() {
    return {
      selected: this.value
    }
  },
  computed: {
    ...mapGetters({
      findChoicesAttributeToModel: 'appConfigs/findChoicesAttributeToModel'
    })
  },
  methods: {
    handleInput(item) {
      this.$emit('input', item)
    }
  }
}
</script>

<style scoped></style>
