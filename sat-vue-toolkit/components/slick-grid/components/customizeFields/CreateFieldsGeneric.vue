<template>
  <div>
    <BaseCustomizeFields is-mode-drop-down
                         @fieldsChange="onFieldsChange">
      <template
        v-slot:default="{
          fields,
          totalFields,
          loadingFields,
          cancelProcess,
          prevProcess,
          searchFilterTypes,
          chooseFieldType,
          processField,
          processTitle,
          fieldTypes,
          fieldTypeSelected,
          valuesOfFieldTypes,
          addNewField,
          editCurrentField,
          isEditing,
          isAdding,
          isProcessing,
          isPrevProcess,
          fieldSelected,
          formActionsProcess,
          fieldTemp,
          optionalLayoutName,
          sourceDataPredefined,
          typeOptionalConfig,
          queryFilterOfTypes,
          categoriesFieldType,
        }">
        <div>
          <div>
            <CustomizeFieldCreateDialog
              @cancel="cancelProcess"
              @prev="prevProcess"
              @chooseFieldType="chooseFieldType"
              @processField="processField"
              :process-title="processTitle"
              :field-selected="fieldSelected"
              :field-type-selected="fieldTypeSelected"
              :is-processing="isEditing"
              :is-editing="isEditing"
              :is-adding="isAdding"
              :is-prev-process="isPrevProcess"
              :field-types="fieldTypes"
              :values-of-field-types="valuesOfFieldTypes"
              :form-actions-process="formActionsProcess"
              :optional-layout-name="optionalLayoutName"
              :source-data-predefined="sourceDataPredefined"
              :type-optional-config="typeOptionalConfig"
              :categories-field-type="categoriesFieldType"
              :query-filter-of-types="queryFilterOfTypes"
            />
          </div>
          <div>
            <CustomizeFieldCreateDropDown
              :fields="fields"
              @addNewField="addNewField"
              @cancel="cancelProcess"
              @prev="prevProcess"
              @searchFilterTypes="searchFilterTypes"
              @chooseFieldType="chooseFieldType"
              @processField="processField"
              :process-title="processTitle"
              :field-selected="fieldSelected"
              :field-type-selected="fieldTypeSelected"
              :is-processing="isAdding"
              :is-editing="isEditing"
              :is-adding="isAdding"
              :is-prev-process="isPrevProcess"
              :field-types="fieldTypes"
              :values-of-field-types="valuesOfFieldTypes"
              :form-actions-process="formActionsProcess"
              :optional-layout-name="optionalLayoutName"
              :source-data-predefined="sourceDataPredefined"
              :type-optional-config="typeOptionalConfig"
              :categories-field-type="categoriesFieldType"
              :query-filter-of-types="queryFilterOfTypes"
            />
          </div>
        </div>
      </template>
    </BaseCustomizeFields>
  </div>
</template>

<script>
  import { BaseCustomizeFields } from "./BaseCustomizeFields"
  import CustomizeFieldItem from "./CustomizeFieldItem"
  import CustomizeFieldCreateDropDown from "./CustomizeFieldCreateDropDown"
  import CustomizeFieldCreateDialog
    from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldCreateDialog"

  export default {
    name: "CreateFieldsGeneric",
    components: {
      CustomizeFieldCreateDialog,
      CustomizeFieldCreateDropDown,
      CustomizeFieldItem,
      BaseCustomizeFields
    },
    methods: {
      onFieldsChange (data) {
        this.$emit("onFieldsChange", data)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
