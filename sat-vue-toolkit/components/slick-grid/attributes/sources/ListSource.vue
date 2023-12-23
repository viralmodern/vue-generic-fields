<template>
  <div>
    <keep-alive>
      <template v-if="typeOptionalConfig.treeFormat">
        <FormFieldTreeChoices :multiple="attribute.multiple"
                              @blur="change"
                              @input="inputList"
                              :items="attribute.list"
                              :value="val"
                              :label="attribute.label"
                              :v-bind="vBind"
                              :type-optional-config="typeOptionalConfig"/>
      </template>
      <template v-else>
        <FormFieldChoices :multiple="attribute.multiple"
                          @blur="change"
                          @input="inputList"
                          :items="attribute.list"
                          :value="val"
                          :label="attribute.label"
                          :v-bind="vBind"
                          :type-optional-config="typeOptionalConfig"/>
      </template>
    </keep-alive>
  </div>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"
  import FormFieldChoices from "~/sat-vue-toolkit/components/FormFieldsControls/FormFieldChoices"
  import FormFieldTreeChoices from "~/sat-vue-toolkit/components/FormFieldsControls/FormFieldTreeChoices"

  export default {
    name: "ListSource",
    components: { FormFieldTreeChoices, FormFieldChoices },
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: "",
      }
    },
    mounted () {

    },
    computed: {
      vBind () {
        return {
          "single-line": true,
          solo: true,
          "hide-details": true
        }
      },
      typeOptionalConfig () {
        let {
          attribute: { colHeaders, tableFormat, treeFormat, itemText, itemValue,
            asyncData, urlJson, dotPropText, itemKeyCate, itemFavicon, itemAvatar
        } } = this
        return {
          itemText, itemValue, itemKeyCate, colHeaders,
          tableFormat, treeFormat, asyncData,
          urlJson, dotPropText, itemFavicon, itemAvatar
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      },
    },
    methods: {
      change (v) {
        console.error("VVV_1", arguments)
        let { val, value } = this
        let {itemValue} = this.attribute
        if (!val || (Array.isArray(val) && !val.length)) {
          return
        }
        let _value = value || {}
        let v1 = val[itemValue] || ""
        let v2 = _value[itemValue] || ""
        v1 = v1.toString()
        v2 = v2.toString()
        let isExist = v1.localeCompare(v2) === 0
        // console.error('change', { isExist, v1, v2, val, _value })
        if (isExist) {
          return
        }
        // this.$$execute({ val: this.val })
        this.$$execute({ val: v1 })
      },
      inputList (v) {
        console.error("VVV_2", arguments)
        this.val = v
      },

    }

  }
</script>
<style scoped></style>


