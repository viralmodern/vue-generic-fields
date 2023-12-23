<template>
  <div>
    <v-row class="my-0">
      <template v-if="isAdding">
        <v-col cols="6"
               class="py-0">
          <CustomizeFieldChooseType :value="fieldTypeSelected"
                                    :items="valuesOfFieldTypes"
                                    @change="data => $emit('processField', data)"/>
        </v-col>
      </template>
      <v-col cols="6"
             class="py-0">
        <div>
          <CustomizeFieldName :value="fieldSelected.label"
                              @input="data => $emit('processField', data)"/>
        </div>
      </v-col>
      <v-col cols="3"
             class="py-0">
        <CustomizeFieldHighlightColor :value="fieldSelected.colorField"
                                      @input="data => $emit('processField', data)"/>
      </v-col>
      <template>
        <v-col cols="12"
               class="py-0">
          <!--<p>
            {{fieldSelected.typeOptionalConfig}}
          </p>
          <p>
            {{typeOptionalConfig}}
          </p>-->
          <keep-alive>
            <template v-if="optionalLayoutName">
              <component class="mb-4"
                         :is="optionalLayoutName"
                         :value="fieldSelected.optionalField"
                         :sourceDataPredefined="sourceDataPredefined"
                         :fieldSelected="fieldSelected"
                         :typeOptionalConfig="fieldSelected.typeOptionalConfig"
                         :fieldType="fieldSelected.type"
                         @input="data => $emit('processField', data)"></component>
            </template>
          </keep-alive>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import CustomizeFieldName from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldName"
import CustomizeFieldChooseType
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldChooseType"
import CustomizeFieldHighlightColor
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CustomizeFieldHighlightColor"

export default {
  name: "FormCreateCustomizeField",
  components: {CustomizeFieldHighlightColor, CustomizeFieldChooseType, CustomizeFieldName},
  props: {
    fieldTypes: {
      type: [Array, Object],
      default: () => []
    },
    valuesOfFieldTypes: {
      type: Array,
      default: () => []
    },
    isEditing: {
      type: Boolean,
      default: () => false
    },
    isAdding: {
      type: Boolean,
      default: () => false
    },
    fieldSelected: {
      type: Object,
      default: () => ({})
    },
    fieldTypeSelected: {
      type: [Object, Number, String],
      default: () => ({})
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
    }

  }

}
</script>

<style scoped>

</style>
