<template>
  <div>
    <template v-if="timeInclude">
      <input class="search_box_filter w-100" type="datetime-local" @input="change"/>
    </template>
    <template v-else>
      <input class="search_box_filter w-100" type="date" @input="change"/>
    </template>
  </div>
</template>

<script>
  import { ATTRIBUTE_FIELDS } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "FilterRuleValueDateTime",
    props: {
      value: {},
      operator: {
        type: Object,
        default: () => ({})
      },
      attribute: {
        type: Object,
        default: () => ({})
      },
    },
    computed: {
      optionsField() {
        let {label, list, type, name, itemText, itemValue} = this.attribute
        return {
          label, list, type, name, itemText, itemValue
        }
      },
      timeInclude() {
        let {type} = this.attribute
        return type === ATTRIBUTE_FIELDS.DATE_TIME.TYPE
      }
    },
    methods: {
      change(evt) {
        console.error('ARGUMENTS', evt)
        let value = evt.target.value
        this.$emit("input", {k: '', data: {value}})
      }
    }
  }
</script>

<style scoped>

</style>
