<template>
  <FormModel @submitted="onSubmitted"
             @submitting="onSubmitting"
             @errored="onError"
             :type="type"
             :is-show-notify-success="false"
             :is-offline="isOffline"
             :endpoint="endPoint">
    <template #default="{ submit: create, submitting, rules, error }">
      <v-card :loading="submitting" flat>
        <div class="fill-height d-flex flex-column overflow-hidden">
          <template v-if="!disabledHeader">
            <v-card-title class="w-100">
              <span class="title font-weight-light">New {{countLabelSingular}}</span>
              <div class="flex-grow-1"></div>
              <v-btn icon small @click="closeFormCreate">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </template>
          <template v-if="labelHeader">
            <v-card-title>
              <span class="headline">{{labelHeader}}</span>
            </v-card-title>
          </template>
          <template v-if="attachHeader">
            <div v-html="attachHeader" v-on="{closeFormCreate}"></div>
          </template>
          <v-card-text>
            <v-form v-model="valid"
                    @submit.prevent="create(post)"
                    ref="formNewRow">
              <div class="valpha-init overflow-hidden"
                   style="position: fixed; left: 0; top: 0; height: 0 !important; width: 0 !important;">
                <v-text-field dense solo hide-details height="20px"/>
                <v-autocomplete dense solo hide-details height="20px"/>
                <v-select dense solo hide-details height="20px"/>
                <v-checkbox dense solo hide-details height="20px"/>
                <v-radio dense solo hide-details height="20px"/>
                <v-combobox dense solo hide-details height="20px"/>
                <v-textarea dense solo hide-details height="20px"/>
                <v-file-input dense solo hide-details height="20px"/>
                <v-range-slider dense solo hide-details height="20px"/>
                <v-progress-linear dense solo hide-details height="20px"/>
                <p class="text-decoration-overline text-decoration-underline text-decoration-line-through text-start text-center text-sm-right text-sm-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias amet at autem corporis debitis distinctio eius error eum explicabo, iusto laborum laudantium molestiae nesciunt non optio sed sit tempore.
                </p>
                <v-rating/>
              </div>
              <v-slide-y-transition group>
                <template v-for="(attribute, index) in attributes">
                  <div :key="`${attribute.uuidField}-new-form-item`">
                    <template v-if="attribute.readOnly"></template>
                    <template v-else-if="attribute.disableCreate"></template>
                    <template v-else>
                      <template v-if="attribute.type === $$ATTRIBUTE_FIELDS.LOCATION.TYPE">
                        <div class="mt-4"></div>
                          <Location :value="locationRaw"
                                    :placeholder="attribute.label"
                                    @placechanged="(val) => getAddressData(val, attribute['name'])"
                                    :extra="{required: attribute.required,
                                       errorMessage: error[attribute.name]}"
                                    @input="locationChange"/>
                      </template>
                      <template v-else-if="attribute.type === $$ATTRIBUTE_FIELDS.PROGRESS.TYPE">
                        <label>{{attribute.label}}</label>
                        <v-slider dense
                                  v-bind="attribute.vBind || {}"
                                  v-model="formModel[attribute.name]">
                          <template v-slot:append>
                            <div class="d-flex" style="width: 60px;">
                              {{`${formModel[attribute.name]} %`}}
                            </div>
                          </template>
                        </v-slider>
                      </template>
                      <template v-else>
                          <div>
                            <keep-alive>
                              <component v-model="formModel[attribute.name]"
                                         :autofocus="index === 0"
                                         :is="attribute.type | getModelLayout"
                                         v-bind="attribute.vBind || {}"
                                         v-on="attribute.vOn || {}"
                                         :error-messages="error[attribute.name]"
                                         :item-text="attribute['itemText'] || 'label'"
                                         :item-value="attribute['itemValue'] || 'value'"
                                         :multiple="attribute.multiple"
                                         :chips="attribute.chips"
                                         :items="attribute.list"
                                         :colHeaders="attribute.colHeaders"
                                         :tableFormat="attribute.tableFormat"
                                         :treeFormat="attribute.treeFormat"
                                         :asyncData="attribute.asyncData"
                                         :urlJson="attribute.urlJson"
                                         :dotPropText="attribute.dotPropText"
                                         :itemKeyCate="attribute.itemKeyCate"
                                         :itemFavicon="attribute.itemFavicon"
                                         :itemAvatar="attribute.itemAvatar"
                                         :readonly="attribute.hiddenFormData"
                                         :label="attribute.label"
                                         :required="attribute.required">
                              <template v-slot:label>
                                <template v-if="attribute.required">
                                  {{attribute.label}} <strong class="error--text">*</strong>
                                </template>
                                <template v-else>
                                  {{attribute.label}}
                                </template>
                              </template>
                            </component>
                            </keep-alive>
                          </div>
                      </template>
                    </template>
                  </div>
                </template>
              </v-slide-y-transition>
              <div class="d-flex">
                <div class="flex-grow-1"></div>
                <v-btn type="submit" depressed
                       class="caption font-weight-bold"
                       color="primary"
                       :loading="submitting"
                       :disabled="submitting">
                  {{titleButtonSubmit}}
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </div>
      </v-card>
    </template>
  </FormModel>
</template>

<script>
  import { ATTRIBUTE_FIELDS, COUNT_LABEL_DATA } from "../configs/attribute"
  import keyBy from "lodash/keyBy"
  import mxValidate from "@/sat-vue-toolkit/mixins/mxValidate"
  import Location from "@/sat-vue-toolkit/components/Location/Location.vue"
  import FormModel from "@/sat-vue-toolkit/components/FormModel"
  import DateTimeFormItem from "./forms/DateTimeFormItem.vue"
  import DateItem from "./forms/DateItem.vue"
  import ColorsItem from "./forms/ColorsItem.vue"
  import PictureItem from "./forms/PictureItem.vue"
  import ParseLinksItem from "./forms/ParseLinksItem.vue"
  import ChoicesFieldCreateItem from "./forms/ChoicesFieldCreateItem.vue"
  import mxCoreSlickGrid from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxCoreSlickGrid"
  export default {
    name: "AttributeCreateNew",
    props: {
      $$ATTRIBUTE_FIELDS: {
        default: () => ATTRIBUTE_FIELDS
      },
      attributes: {
        type: [Object, Array, String],
        default: () => []
      },
      endPoint: {
        type: String,
        default: () => ""
      },
      busEventName: {
        type: String,
        default: () => ""
      },
      group: {
        // type: [String, Number, Boolean, undefined, null],
        default: () => "ungroup"
      },
      groupType: {
        // type: [String, Number, Boolean, undefined, null],
        default: () => ""
      },
      mainCellId: {
        // type: [String, Number, Boolean, undefined, null],
        default: () => ""
      },
      titleCreate: {
        type: String,
        default: () => "Unnamed"
      },
      titleButtonSubmit: {
        type: String,
        default: () => "Create"
      },
      disableAddNewToMany: {
        type: Boolean,
        default: () => false
      },
      countLabelSingular: {
        type: [String, Number],
        default: () => COUNT_LABEL_DATA.countLabelSingular
      },
      value: {},
      disabledHeader: {
        type: Boolean,
        default: () => false
      },
      labelHeader: {
        type: [String, Number],
        default: () => ""
      },
      attachHeader: {
        type: [String, Number],
        default: () => ""
      },

      type: {
        type: String,
        default: () => "post"
      },
      excludeParams: {
        type: Array,
        default: () => []
      },
      includeParams: {
        type: Object,
        default: () => {
          return {}
        }
      },
      disabledNotify: {
        type: Boolean,
        default: () => false
      },
      isOffline: {
        type: Boolean,
        default: () => false
      },

    },
    components: {
      FormModel,
      Location,
      // VJsf,
      DateTimeFormItem,
      DateItem,
      ColorsItem,
      PictureItem,
      ParseLinksItem,
      ChoicesFieldCreateItem,
    },
    mixins: [mxValidate, mxCoreSlickGrid],
    data () {
      return {
        locationRaw: null,
        address: "",
        valid: null,
        formModel: {},
        closeForm: false,
        rowAdded: null,
      }
    },
    mounted () {
    },
    computed: {
      attributesByName () {
        try {
          let attributes = this.attributes.filter(attribute => !attribute.readOnly)
          return keyBy(attributes, "name")
        } catch (e) {
          return {}
        }
      },
      hasAttachmentFileUpload () {
        try {
          return this.attributes.filter(attribute => attribute.isFileAttachment).length > 0
        } catch (e) {
          return false
        }
      },
      initConfirmedFields () {
        try {
          let attributes = this.attributes.filter(attribute => attribute.confirmed)
          let formModel = { ...this.formModel }
          for (let i = 0; i < attributes.length; i++) {
            let attributeName = attributes[i]["name"]
            let attributeConfirmedName = attributes[i]["confirmedField"]
            if (formModel.hasOwnProperty(attributeConfirmedName)) {
              // confirmedField
              formModel[attributeName] = formModel[attributeConfirmedName]
            }
          }
          return formModel
        } catch (err) {
          console.log(err.message)
          return this.formModel
        }
      },
      post () {
        let form = { ...this.initConfirmedFields }
        let includeParams = { ...this.includeParams }
        let excludeParams = this.excludeParams

        let formData = new FormData()
        let jsonData = {}
        let condition = [null, undefined, "", " "]
        let attributeTypesAttachment = [ATTRIBUTE_FIELDS.PICTURE.TYPE, ATTRIBUTE_FIELDS.ATTACHMENT.TYPE]

        for (let attributeName in form) {
          let values = form[attributeName]
          let noValue = condition.includes(values)
          let attribute = this.attributesByName[attributeName]
          let attributeType = attribute.type
          let attributeWithFileAttachment = attributeTypesAttachment.includes(attributeType) || attribute.isFileAttachment
          if (attributeWithFileAttachment) {
            // todo check type file upload
            if (Array.isArray(values)) {
              // todo multiple files
              for (let i = 0; i < values.length; i++) {
                if (!noValue) {
                  formData.append([attributeName], values[i])
                  jsonData[attributeName] = values[i]
                }
              }
            } else {
              // todo single files
              let isFileType = typeof values === "object"
              if (!noValue && isFileType) {
                formData.append([attributeName], values)
                jsonData[attributeName] = values
              }
            }
          } else if (typeof values !== "object") {
            if (!noValue) {
              formData.append([attributeName], values)
              jsonData[attributeName] = values
            }
          } else {
            if (!noValue) {
              if (Array.isArray(values) && values.length > 0) {
                formData.append([attributeName], JSON.stringify(values))
                jsonData[attributeName] = values
              } else if (typeof values === "object" && Object.keys(values).length > 0) {
                formData.append([attributeName], JSON.stringify(values))
                jsonData[attributeName] = values
              }
            }
          }
        }
        // todo include params
        if (Object.keys(includeParams).length > 0) {
          for (let paramName in includeParams) {
            let includeValue = includeParams[paramName]
            formData.append([paramName], includeValue)
            jsonData[paramName] = includeValue
          }
        }
        // todo exclude params
        if(Array.isArray(excludeParams) && excludeParams.length > 0) {
          for (let i = 0; i < excludeParams.length; i++) {
            let param = excludeParams[i]
            formData.delete(param)
            delete jsonData[param]
          }
        }
        if (this.hasAttachmentFileUpload) {
          return formData
        }
        return jsonData
      }
    },
    watch: {
      group: {
        deep: true,
        immediate: true,
        handler (v) {
          this.initValueFormItem()
        }
      },
      value: {
        immediate: true,
        handler(v) {
          this.initValueFormItem()
        }
      }
    },
    methods: {
      initValueFormItem () {
        let form = { ...this.formModel },
          group = this.group,
          groupType = this.groupType,
          excludeTypesAttribute = [ATTRIBUTE_FIELDS.PICTURE.TYPE, ATTRIBUTE_FIELDS.ATTACHMENT.TYPE]

        let attributesByName = { ...this.attributesByName }
        for (let name in attributesByName) {
          let attributeType = attributesByName[name]["type"]
          let attributeValue = attributesByName[name]["value"]
          let attributeList = attributesByName[name]["list"]
          let attributeItemValue = attributesByName[name]["itemValue"] || "value"
          // if(!excludeTypesAttribute.includes(attributeType)) {
          if (attributeValue) {
            form[name] = attributeValue
          } else if (group !== "ungroup" && name === groupType) {
            // todo init group value
            let firstItemOfList = attributeList[0]
            if (typeof firstItemOfList[attributeItemValue] === "number") {
              group = parseInt(group)
            }
            form[name] = group
          }
          // }

        }
        this.formModel = { ...form }
      },

      getAddressData (location, attributeName) {
        this.address = location
        this.formModel = Object.assign({}, this.formModel, { [attributeName]: location })
      },
      locationChange (event) {
        console.log("locationChange", event)
        try {
          this.address = {
            raw: event
            // raw: event.target.value.trim()
          }

        } catch (e) {

        }
      },

      onError (data) {
        this.$emit("errored", data)
      },
      onSubmitting (data) {
        this.$emit("submitting", data)
      },
      onSubmitted (row) {
        let mthGet = this.type.toLowerCase() === "get"
        if (!mthGet && !this.disabledNotify) {
          this.$eventHub.$emit("alert-curd", { type: "success", text: `${this.countLabelSingular} has been created` })
        }
        if (this.busEventName) {
          console.log('CREATED')
          // this.$eventHub.$emit(this.busEventName, { row, group: this.group })
          // this.$trigger(this.busEventName, { row, group: this.group })
        }
        if(mthGet) {
          // todo GET Request
        }else {
          // todo PUT, PATCH Request
          this.formReset()
          this.initValueFormItem()
        }

        if (this.disableAddNewToMany) {
          this.$emit("input", false)
        }
        this.$emit("submitted", { row, group: this.group })

      },
      formReset () {
        this.formModel = {}
        this.address = ""
      },
      closeFormCreate () {
        this.formReset()
        this.$emit("input", false)
      }

    },

    destroyed () {
    }
  }
</script>

<style scoped lang="scss">

</style>
