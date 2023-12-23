<template>
  <div>
    <BaseCustomizeFields @fieldsChange="onFieldsChange">
      <template
        v-slot:default="{
          fields,
          totalFields,
          loadingFields,
          cancelProcess,
          prevProcess,
          chooseFieldType,
          chooseTypes,
          searchFilterTypes,
          processField,
          processTitle,
          fieldTypes,
          fieldTypesSelected,
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
        }"
      >
        <v-card flat :loading="loadingFields">
          <v-card-text class="px-0">
            <slot name="title">
              <p class="subtitle-2">Fields</p>
            </slot>
            <template v-if="totalFields">
              <div class="mt-4"></div>
              <div>
                <template v-for="field in fields">
                  <CustomizeFieldItem :attribute="field" />
                </template>
              </div>
            </template>
            <div class="mt-4"></div>
            <div>
              <v-btn
                small
                depressed
                input-value="true"
                active-class="primary--text"
                class="text-capitalize caption"
                @click="addNewField"
              >
                Custom fields
              </v-btn>
            </div>
            <div class="mt-4"></div>
            <CustomizeFieldCreateDialog
              @cancel="cancelProcess"
              @prev="prevProcess"
              @chooseFieldType="chooseFieldType"
              @processField="processField"
              @chooseTypes="chooseTypes"
              @searchFilterTypes="searchFilterTypes"
              :process-title="processTitle"
              :field-selected="fieldSelected"
              :field-type-selected="fieldTypeSelected"
              :is-processing="isProcessing"
              :is-editing="isEditing"
              :is-adding="isAdding"
              :is-prev-process="isPrevProcess"
              :field-types="fieldTypes"
              :field-types-selected="fieldTypesSelected"
              :values-of-field-types="valuesOfFieldTypes"
              :form-actions-process="formActionsProcess"
              :optional-layout-name="optionalLayoutName"
              :source-data-predefined="sourceDataPredefined"
              :type-optional-config="typeOptionalConfig"
              :categories-field-type="categoriesFieldType"
              :query-filter-of-types="queryFilterOfTypes"
            />
          </v-card-text>
        </v-card>
      </template>
    </BaseCustomizeFields>
  </div>
</template>

<script>
import { BaseCustomizeFields } from '~/sat-vue-toolkit/components/slick-grid/components/customizeFields/BaseCustomizeFields'
import CustomizeFieldItem from '~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldItem'
import CustomizeFieldCreateDialog from '~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldCreateDialog'

export default {
  name: 'FieldsOfSubGeneric',
  components: {
    CustomizeFieldCreateDialog,
    CustomizeFieldItem,
    BaseCustomizeFields,
  },
  methods: {
    onFieldsChange(data) {
      this.$emit('onFieldsChange', data)
    },
  },
}
</script>

<style scoped></style>
