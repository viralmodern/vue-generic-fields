<template>
  <div>
    <v-dialog
      content-class="lt-dialog-content"
      no-click-animation
      transition="slide-y-transition"
      persistent
      scrollable
      :value="isProcessing"
      :width="isPrevProcess ? `65vw` : `65vw`"
    >
      <v-btn absolute
             top
             right
             icon
             dark
             @click="$emit('cancel')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card max-height="85vh">
        <v-card-title>
          <v-btn
            v-show="isPrevProcess"
            text
            @click="$emit('prev')"
            class="text-capitalize caption"
            :input-value="true"
            rounded
            active-class="primary--text"
          >
            <v-icon left
                    small> mdi-chevron-double-left
            </v-icon>
            Field types
          </v-btn>
          <v-spacer/>
          <span class="font-weight-light">
            {{ processTitle }}
          </span>
          <v-spacer/>
          <!--          <v-btn text depressed disabled/>-->
          <div v-if="!isPrevProcess && isAdding">
            <TheSearchInput :value="queryFilterOfTypes.search"
                            @input="data => $emit('searchFilterTypes', {data, k: 'search'})"/>
          </div>
        </v-card-title>
        <v-card-text>
          <!--          {{queryFilterOfTypes}}-->
          <v-slide-y-transition hide-on-leave>
            <template v-if="!isPrevProcess && isAdding">
              <!--Todo: STEP 1: select types-->
              <div class="d-flex overflow-hidden">
                <div>
                  <div>
                    <CustomizeFieldTypesOfCategories @input="data => $emit('searchFilterTypes', {data, k: 'cate'})"
                                                     :items="categoriesFieldType"/>
                    <!--<CustomizeFieldTypesOfCategories @input="data => $emit('chooseTypes', data)"
                                                     :items="categoriesFieldType"/>
                    -->
                  </div>
                </div>
                <div class="flex-grow-1 pl-4">
                  <div>
                    <FormTypesCustomizeField :queryFilterOfTypes="queryFilterOfTypes"
                                             :value="fieldTypeSelected"
                                             :field-types="filterFieldTypesByQuery"
                                             :field-types-selected="fieldTypesSelected"
                                             @chooseFieldType="(data) => $emit('chooseFieldType', data)"
                                             @processField="(data) => $emit('processField', data)"/>
                    <!--<FormTypesCustomizeField :queryFilterOfTypes="queryFilterOfTypes"
                                             :value="fieldTypeSelected"
                                             :field-types="fieldTypesSelected"
                                             :field-types-selected="fieldTypesSelected"
                                             @chooseFieldType="(data) => $emit('chooseFieldType', data)"
                                             @processField="(data) => $emit('processField', data)"/>-->

                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div>
                <!--Todo: STEP 2: input configs field-->
                <FormCreateCustomizeField
                  :field-selected="fieldSelected"
                  @processField="(data) => $emit('processField', data)"
                  :field-type-selected="fieldTypeSelected"
                  :field-types="fieldTypes"
                  :values-of-field-types="valuesOfFieldTypes"
                  :is-editing="isEditing"
                  :is-adding="isAdding"
                  :optional-layout-name="optionalLayoutName"
                  :source-data-predefined="sourceDataPredefined"
                  :type-optional-config="typeOptionalConfig"
                />
                <FormCustomizeFieldActions :actions="formActionsProcess"/>
              </div>
            </template>
          </v-slide-y-transition>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormTypesCustomizeField
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormTypesCustomizeField"
import FormCreateCustomizeField
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormCreateCustomizeField"
import FormCustomizeFieldActions
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormCustomizeFieldActions"
import CustomizeFieldTypesOfCategories
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldTypesOfCategories"
import TheSearchInput from "~/sat-vue-toolkit/components/Common/TheSearchInput"

export default {
  name: "CustomizeFieldCreateDialog",
  props: {
    processTitle: {
      type: String,
      default: () => ""
    },
    fieldTypes: {
      type: [Array, Object],
      default: () => []
    },
    fieldTypesSelected: {
      type: [Array, Object],
      default: () => []
    },

    valuesOfFieldTypes: {
      type: Array,
      default: () => []
    },
    fieldSelected: {
      type: [Object, String, Number],
      default: () => ({})
    },
    fieldTypeSelected: {
      type: [Object, String, Number],
      default: () => ({})
    },
    isEditing: {
      type: Boolean,
      default: () => false
    },
    isAdding: {
      type: Boolean,
      default: () => false
    },

    isProcessing: {
      type: Boolean,
      default: () => false
    },
    isPrevProcess: {
      type: Boolean,
      default: () => false
    },
    formActionsProcess: {
      type: [Array, Object],
      default: () => []
    },
    optionalLayoutName: {
      type: String,
      default: () => ""
    },
    sourceDataPredefined: {
      type: [String, Array, Object],
      default: () => ""
    },
    typeOptionalConfig: {
      type: [String, Array, Object],
      default: () => ""
    },
    queryFilterOfTypes: {
      type: [String, Array, Object],
      default: () => ({})
    },
    categoriesFieldType: {
      type: [String, Array, Object],
      default: () => ({})
    }

  },
  components: {
    TheSearchInput,
    CustomizeFieldTypesOfCategories,
    FormCustomizeFieldActions,
    FormCreateCustomizeField,
    FormTypesCustomizeField
  },
  computed: {
    filterFieldTypesByQuery() {
      let {queryFilterOfTypes = {}, fieldTypes} = this
      let arr = Object.values(fieldTypes)
      let querySearch = queryFilterOfTypes['search'] || ''
      querySearch = querySearch.toLowerCase()
      let queryCate = queryFilterOfTypes['cate'] || []
      let queryCateString = queryCate.map(qr => qr.type || "")
      let hasCateQuery = queryCateString && queryCateString.length
      // console.error('ALL_TYPES', arr)
      return arr.filter(ar => {
        let lb = ar.LABEL || ''
        // CATEGORY_TYPE
        let cateType = ar.CATEGORY_TYPE || ''
        lb = lb.toLowerCase()
        if (hasCateQuery) {
          // console.error('CASE1')
          return queryCateString.includes(cateType) && lb.includes(querySearch)
        }
        // console.error('CASE2')
        return lb.includes(querySearch)
      })
    }
  }
}
</script>

<style lang="scss">
.lt-dialog-content {
  align-self: flex-start;
}
</style>
