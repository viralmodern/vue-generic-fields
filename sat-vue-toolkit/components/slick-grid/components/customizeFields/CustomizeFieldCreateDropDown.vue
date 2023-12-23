<template>
  <div>
    <v-menu :value="isProcessing"
            offset-y
            :max-width="450"
            :min-width="450"
            transition="slide-y-transition"
            :close-on-content-click="false">
      <template v-slot:activator="{on}">
        <v-btn small
               v-on="on"
               title="Add New Column"
               icon
               depressed
               active-class="primary--text"
               class="text-capitalize caption"
               @click="$emit('addNewField')">
          <v-icon color="primary">
            mdi-plus-circle
          </v-icon>
        </v-btn>
      </template>
      <v-card flat
              class="overflow-hidden">
        <v-card-text>
          <v-row>
            <v-col v-if="!isPrevProcess"
                   cols="5"
                   style="border-right: solid 1px rgba(0,0,0,0.05)">
              <v-sheet min-height="45vh">
                <div class="box-dropdown-item fill-height d-flex flex-column">
                  <v-subheader class="px-0">Fields</v-subheader>
                  <div class="fill-height overflow-hidden overflow-y-auto">
                    <v-card flat
                            height="45vh">
                      <template v-for="field in fields">
                        <CustomizeFieldItem disabled-actions
                                            :attribute="field"/>
                      </template>
                    </v-card>
                  </div>
                </div>
              </v-sheet>
            </v-col>
            <v-col :cols="isPrevProcess ? 12 : 7">
              <v-sheet min-height="45vh">
                <div class="box-dropdown-item fill-height d-flex flex-column">
                  <v-subheader class="px-0">{{ processTitle }}</v-subheader>
                  <template v-if="!isPrevProcess && isAdding">
                    <TheSearchInput :value="queryFilterOfTypes.search"
                                    @input="data => $emit('searchFilterTypes', {data, k: 'search'})"/>
                  </template>
                  <div class="fill-height overflow-hidden overflow-y-auto">
                    <v-slide-y-transition hide-on-leave>
                      <template v-if="!isPrevProcess && isAdding">
                        <!--Todo: STEP 1: select types-->
                        <FormTypesCustomizeField is-mode-drop-down
                                                 :value="fieldTypeSelected"
                                                 :field-types="filterFieldTypesByQuery"
                                                 @chooseFieldType="(data) => $emit('chooseFieldType', data)"
                                                 @processField="(data) => $emit('processField', data)"
                        />
                      </template>
                      <template v-else>
                        <div>
                          <!--Todo: STEP 2: input configs field-->
                          <FormCreateCustomizeField :categoriesFieldType="categoriesFieldType"
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
                  </div>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import FormTypesCustomizeField
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormTypesCustomizeField"
import FormCreateCustomizeField
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormCreateCustomizeField"
import FormCustomizeFieldActions
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/FormCustomizeFieldActions"
import CustomizeFieldItem from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldItem"
import TheSearchInput from "~/sat-vue-toolkit/components/Common/TheSearchInput"

export default {
  name: "CustomizeFieldCreateDropDown",
  props: {
    processTitle: {
      type: String,
      default: () => ""
    },
    fieldTypes: {
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
      default: () => '',
    },
    typeOptionalConfig: {
      type: [String, Array, Object],
      default: () => '',
    },
    queryFilterOfTypes: {
      type: [String, Array, Object],
      default: () => ({}),
    },
    categoriesFieldType: {
      type: [String, Array, Object],
      default: () => ({}),
    },
    fields: {},
    loadingFields: {}
  },
  components: {
    TheSearchInput,
    CustomizeFieldItem,
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

      return arr.filter(ar => {
        let lb = ar.LABEL || ''
        lb = lb.toLowerCase()
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
