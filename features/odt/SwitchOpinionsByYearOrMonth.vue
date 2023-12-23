<template>
  <v-app-bar flat height="38px">
    <slot name="left"></slot>
    <slot>
      <v-toolbar-items>
        <v-btn
          v-bind="linkOption || {}"
          :input-value="!showByMonth"
          @click="change('y')"
        >
          <v-icon left small>mdi-calendar</v-icon>
          Year
        </v-btn>
        <div class="mx-1"></div>
        <v-btn
          v-bind="linkOption || {}"
          :input-value="showByMonth"
          @click="change('m')"
        >
          <v-icon left small>mdi-calendar</v-icon>
          Month
        </v-btn>
      </v-toolbar-items>
    </slot>
    <slot name="right"></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: 'SwitchOpinionsByYearOrMonth',
  props: {
    value: {
      type: String,
      default: () => 'y',
    },
  },
  computed: {
    linkOption() {
      return {
        small: true,
        depressed: true,
        rounded: true,
        class: 'caption text-capitalize',
        activeClass: 'primary--text',
      }
    },
    showByMonth() {
      let { value } = this
      return value === 'm'
    },
  },
  methods: {
    change(moment) {
      this.$emit('change', moment)
    },
  },
}
</script>

<style scoped></style>
