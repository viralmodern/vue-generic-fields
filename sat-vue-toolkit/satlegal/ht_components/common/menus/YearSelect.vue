<template>
  <v-select
    menu-props="auto"
    :items="itemsComputed"
    :style="`width: ${width}`"
    :class="`custom ma-0 pa-0 ${borderUnset ? 'borderUnset' : ''}`"
    :hide-details="hideDetails"
    :value="value"
    :placeholder="placeholder"
    @change="$emit('update', $event)"
  ></v-select>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    borderUnset: Boolean,
    hideDetails: Boolean,
    isShowDelete: Boolean,
    placeholder: String,
    max: [Number, String],
    min: [Number, String],
    width: [Number, String]
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    let year = 1920;
    [...new Array(200)].forEach(() => this.items.push(year++));
  },
  computed: {
    itemsComputed() {
      let listYear = [...this.items];
      if (this.max) {
        listYear = listYear.filter(year =>year <= this.max);
      }
      if (this.min) {
        listYear = listYear.filter(year =>year >= this.min);
      }
      return listYear;
    }
  }
};
</script>

<style scoped>
.custom /deep/ .v-select__selections {
  font-size: 13px;
}
.borderUnset /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom /deep/ .v-input__append-inner {
  display: none;
}
</style>
