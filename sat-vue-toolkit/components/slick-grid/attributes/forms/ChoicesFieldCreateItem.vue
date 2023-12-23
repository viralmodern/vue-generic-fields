<template>
  <div>
    <keep-alive>
      <template v-if="treeFormat">
        <FormFieldTreeChoices :label="label"
                              :items="items"
                              :value="value"
                              :multiple="multiple"
                              :v-bind="vBind" class="mb-4"
                              :type-optional-config="typeOptionalConfig"
                              @input="data => $emit('input', data)"/>

      </template>
      <template v-else>
        <FormFieldChoices :label="label"
                          :items="items"
                          :value="value"
                          :multiple="multiple"
                          :v-bind="vBind"
                          :type-optional-config="typeOptionalConfig"
                          @input="data => $emit('input', data)">
        </FormFieldChoices>
      </template>
    </keep-alive>
  </div>
</template>
<script>
  import FormFieldChoices from "../../../FormFieldsControls/FormFieldChoices"
  import FormFieldTreeChoices from "../../../FormFieldsControls/FormFieldTreeChoices"

  export default {
    name: "ChoicesFieldCreateItem",
    props: {
      label: {},
      items: {
        type: Array,
        default: () => [],
        validator: (value) => {
          return Array.isArray(value)
        }
      },
      value: {},
      multiple: {},
      itemText: {},
      itemValue: {},
      colHeaders: {},
      tableFormat: {},
      treeFormat: {},
      asyncData: {},
      urlJson: {},
      dotPropText: {},
      itemKeyCate: {},
      itemFavicon: {},
      itemAvatar: {},

    },
    components: { FormFieldTreeChoices, FormFieldChoices },
    computed: {
      vBind() {
        return {
          'single-line': false,
          solo: false,
          'hide-details': false,
        }
      },
      typeOptionalConfig () {
        let { itemText, itemValue, colHeaders,
          tableFormat, treeFormat, asyncData,
          itemAvatar,
          urlJson, dotPropText, itemKeyCate, itemFavicon } = this
        return {
          itemText, itemValue, colHeaders,
          tableFormat, treeFormat, asyncData,
          urlJson, dotPropText, itemKeyCate,
          itemFavicon, itemAvatar
        }
      },
    },

  }
</script>

<style scoped>

</style>
