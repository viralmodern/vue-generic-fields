<template>
  <div class="pre-defined-field">
    <v-card flat>
      <v-switch :label="`(Optional) ${label}`"
                :ripple="false"
                hide-details
                dense
                :input-value="optionalField[types.isCustomChoices]"
                :value="optionalField[types.isCustomChoices]"
                @change="data => setValueOptional({[types.isCustomChoices]: Boolean(data)})">
        <template v-slot:label>
          <span class="caption">
            {{`(Optional) ${label}`}}
          </span>
        </template>
      </v-switch>
      <!-- <p>
         {{optionsConfig}}
       </p>-->
      <!--<p>
        {{fieldSelected}}
      </p>-->
      <v-slide-y-transition hide-on-leave>
        <template v-if="optionalField[types.isCustomChoices]">
          <keep-alive>
            <template v-if="optionsConfig.treeFormat">
              <FormFieldTreeChoices :label="label"
                                    multiple class="mt-4"
                                    :items="calcItems"
                                    :value="optionalField[types.customChoices]"
                                    @input="data => setValueOptional({[types.customChoices]: data})"
                                    :type-optional-config="optionsConfig"/>
            </template>
            <template v-else>
              <FormFieldChoices :label="label"
                                multiple
                                :items="calcItems"
                                :value="optionalField[types.customChoices]"
                                @input="data => setValueOptional({[types.customChoices]: data})"
                                :type-optional-config="optionsConfig"/>
            </template>
          </keep-alive>
        </template>
      </v-slide-y-transition>
      <v-switch label="Multiple selection"
                :ripple="false"
                hide-details
                dense
                :input-value="optionalField[types.multiple]"
                :value="optionalField[types.multiple]"
                @change="data => setValueOptional({[types.multiple]: Boolean(data)})">
        <template v-slot:label>
          <span class="caption">
            Multiple selection
          </span>
        </template>
      </v-switch>
      <v-switch label="Display of selections to chips"
                :ripple="false"
                hide-details
                dense
                :input-value="optionalField[types.chips]"
                :value="optionalField[types.chips]"
                @change="data => setValueOptional({[types.chips]: Boolean(data)})">
        <template v-slot:label>
          <span class="caption">
            Display of selections to chips
          </span>
        </template>
      </v-switch>

      <!--            <AutocompleteLhc/>-->
    </v-card>
  </div>
</template>

<script>
  import { optionalFieldOptionsMixin } from "./optionalFormatMixin"
  import FormFieldChoices from "~/sat-vue-toolkit/components/FormFieldsControls/FormFieldChoices"
  // import AutocompleteLhc from "~/sat-vue-toolkit/components/AutocompleteLhc"
  import Worker from "~/sat-vue-toolkit/workers/choices.worker"
  import FormFieldTreeChoices from "~/sat-vue-toolkit/components/FormFieldsControls/FormFieldTreeChoices"

  // const worker = new Worker()
  export default {
    name: "PreDefinedFormatOptional",
    components: { FormFieldTreeChoices, FormFieldChoices },
    // components: { AutocompleteLhc },
    props: {
      sourceDataPredefined: {},
      typeOptionalConfig: {
        default: () => ({
          itemText: "label",
          itemValue: "value"
        })
      },
      label: {
        default: () => "Choose Items"
      },
      fieldType: {},
      fieldSelected: {}
    },
    data () {
      return {
        asyncItems: [],
        types: {
          multiple: "multiple",
          chips: "chips",
          isCustomChoices: "isCustomChoices",
          choices: "choices",
          customChoices: "customChoices"
        }
      }
    },
    mixins: [optionalFieldOptionsMixin],
    computed: {
      optionsConfig () {
        let { typeOptionalConfig } = this
        return typeOptionalConfig
      },
      calcItems () {
        let { typeOptionalConfig: { asyncData, urlJson }, sourceDataPredefined } = this
        if (asyncData && urlJson) {
          return this.asyncItems
        }
        return sourceDataPredefined
      }
    },
    mounted () {
      // worker.onmessage = this.onReceived
    },
    watch: {
      /*fieldType: {
        immediate: true,
        handler: "fetchList"
      }*/
    },
    methods: {
      fetchList () {
        // asyncData
        let { typeOptionalConfig: { asyncData, urlJson, headerJson = {} } } = this
        if (asyncData && urlJson) {
          // worker.postMessage({ url: urlJson, headerJson, type: urlJson })
        }
      },
      onReceived ({ data }) {
        // console.error("SUCCESS", data)
        // let { stringData } = data
        this.asyncItems = JSON.parse(data["stringData"])
        // asyncItems
      }
    }

  }
</script>

<style scoped>

</style>

