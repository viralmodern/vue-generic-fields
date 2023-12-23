<template>
  <div style="width: 150px;">
    <v-col cols="12" sm="4" md="8" class="hidden-sm-only"></v-col>
    <v-text-field
      v-model.lazy="price"
      flat
      v-money="money"
      hide-details
      class="ma-0 pa-0 text-caption"
    />
  </div>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  name: 'AttributesCurrencyCell',
  directives: { money: VMoney },
  data() {
    return {
      price: 123.45,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    }
  },
  props: {
    value: {},
  },
  watch: {
    text: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true,
    },
  },
}
</script>

<style scoped></style>
