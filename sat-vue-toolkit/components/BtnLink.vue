<template>
  <v-btn :input-value="inputValue"
         v-bind="vBin" @click="$emit('click', $event)">
    <slot :icon="icon" :label="label">
      <v-icon small left v-if="icon">
        {{icon}}
      </v-icon>
      <span v-if="label" v-html="label"></span>
    </slot>
  </v-btn>
</template>

<script>
  let ops = {
    rounded: true,
    depressed: true,
    small: true,
    text: true,
    activeClass: "primary--text",
    class: "caption text-capitalize"
  }
  export default {
    name: "BtnLink",
    props: {
      icon: {
        type: String,
        default: () => ''
      },
      label: {
        type: String,
        default: () => 'link item'
      },
      inputValue: {
        type: [Boolean, String, Number],
        default: () => false
      },
      btnOptions: {
        type: Object,
        default: () => ({
        })
      }
    },
    computed: {
      vBin() {
        return {
          ...this.btnOptions,
          ...ops
        }
      }
    }
  }
</script>

<style scoped>

</style>
