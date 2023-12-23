import {
  ACTIONS_FIELD,
  ATTRIBUTE_FIELDS, CATEGORIES_TYPE, getAttributeOptionalConfig,
  getOptionalLayout,
  getSourceDataPredefined
} from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
import {createInitiatedAttribute} from "~/sat-vue-toolkit/components/slick-grid/helpers/attributes"
import {v4 as uuid} from "uuid"
import {$$lightOrDark} from "~/sat-vue-toolkit/functions"
import {TYPE_OPTIONAL_CONFIG_DEFAULT} from "~/sat-vue-toolkit/components/slick-grid/configs/attributeTypes"

let {
  TEXT,
  DATE,
  DATE_TIME,
  DROPDOWN,
  LIST,
  LONG_TEXT,
  ASSIGN_MEMBER,
  WEBSITE,
  RATING,
  PROGRESS,
  PHONE_NUMBER,
  MONEY,
  LOCATION,
  ATTACHMENT,
  NUMBER,
  EMAIL,
  PICTURE,
  COMMENTS,
  CHECKBOX,
  LABELS,
  SPARK_LINE,
  HEATMAP,
  CONCORDANCE_PLOT,
  COLOR,
  NOTE,
  DOCUMENTS, PERCENTAGE,
  // todo: Pre defined types
  JURISDICTION, COUNTRY,
  ABALitigationCode,
  USState,
  USCounty,
  ABAExpenseCode,
  Cryptocurrency,
  NatureOfSuit,
  ABAActivitiesCode,
  ECFCivilEvent,
  ECFCriminalEvent,
  PartyRoleType,
  StateRegulations,
  FederalRules,
  USConstitutions,
  USAgencies,
  USPresidentsAndVicePresidents,
  CurrentLegislators,
  CongressCommittee,
  PublicTradeCompanies,
  OccupationalList,
  UniversityAndCollegeInUS,
  NAICSCode,
  CIK,
} = ATTRIBUTE_FIELDS

let TYPES = {
  TEXT, DATE, DATE_TIME, DROPDOWN, LIST, LONG_TEXT,
  ASSIGN_MEMBER, WEBSITE, RATING, PROGRESS, PHONE_NUMBER, MONEY,
  LOCATION, ATTACHMENT, NUMBER, EMAIL, PICTURE, COMMENTS,
  CHECKBOX, LABELS, SPARK_LINE, HEATMAP, CONCORDANCE_PLOT,
  COLOR, NOTE, DOCUMENTS, PERCENTAGE,
  // todo: Include Pre defined types
  JURISDICTION, COUNTRY, ABALitigationCode,
  USState,
  USCounty,
  ABAExpenseCode,
  Cryptocurrency,
  NatureOfSuit,
  ABAActivitiesCode,
  ECFCivilEvent,
  ECFCriminalEvent,
  PartyRoleType,
  USConstitutions,
  USAgencies,
  StateRegulations,
  FederalRules,
  USPresidentsAndVicePresidents,
  CurrentLegislators,
  CongressCommittee,
  PublicTradeCompanies,
  OccupationalList,
  UniversityAndCollegeInUS,
  NAICSCode,
  // CIK,
}
const FLAG_FIELD_CUSTOMIZE = {
  ADD: 1,
  EDIT: 2,
  DEFAULT: 0,
}
const BTN_ACTIVE_FORM = {
  depressed: true,
  class: "ml-2",
  inputValue: true,
  activeClass: "primary--text",
}
const BTN_DEFAULT_FORM = {
  depressed: true,
  class: "ml-2",
}

const ACTIONS_PROCESS_FIELD_CUSTOMIZE = {
  CREATE: {
    type: 'CREATE',
    label: 'Create',
    attrs: {
      ...BTN_ACTIVE_FORM
    }
  },
  UPDATE: {
    type: 'UPDATE',
    label: 'Update',
    attrs: {
      ...BTN_ACTIVE_FORM
    }
  },
  EDIT: {
    type: 'EDIT',
    label: 'Edit',
    icon: 'mdi-pencil',
    attrs: {
      ...BTN_ACTIVE_FORM
    }
  },
  CANCEL: {
    type: 'CANCEL',
    label: 'Cancel',
    attrs: {
      ...BTN_DEFAULT_FORM
    }
  },
  DELETE: {
    type: 'DELETE',
    label: 'Delete',
    icon: 'mdi-delete',
    attrs: {
      ...BTN_DEFAULT_FORM
    }
  },
  PIN: {
    type: 'PIN',
    label: 'Pin',
    icon: 'mdi-pin',
    attrs: {
      ...BTN_DEFAULT_FORM
    }
  },


}
import dotProp from "dot-prop"

const OFFLINE_MODE = true
// Update the state with the processed HTML content
// let a = CATEGORIES_TYPE
// CATEGORIES_TYPE

export const BaseCustomizeFields = {
  props: {
    endPoint: {
      type: String,
      default: () => ``
    },
    offlineMode: {
      type: Boolean,
      default: () => OFFLINE_MODE
    },
    isModeDropDown: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      fields: {},
      fieldTypes: {
        ...TYPES
      },
      categoriesFieldType: [
        CATEGORIES_TYPE.Generic,
        CATEGORIES_TYPE.Standard
      ],
      fieldTypesSelected: [],
      loading: false,
      flag: FLAG_FIELD_CUSTOMIZE.DEFAULT,
      fieldIdSelected: null,
      fieldTypeIdSelected: null,
      fieldTemp: {},
      queryFilterOfTypes: {
        search: ""
      }
    }
  },
  mounted() {
    this.$watch('fields', (fields) => {
      this.$emit('fieldsChange', {fields})
    })
  },
  computed: {
    processTitle() {
      let {isAdding} = this
      let titleProcess = isAdding ? `Create field` : `Edit field`
      return titleProcess
    },
    valuesOfFieldTypes() {
      let {fieldTypes} = this
      if (!fieldTypes) {
        return []
      }
      if (Array.isArray(fieldTypes)) {
        return fieldTypes
      }
      return Object.values(fieldTypes)
    },
    fieldSelected() {
      let {fields, fieldIdSelected, fieldTemp, isAdding, isEditing} = this
      if (isEditing) {
        return fieldTemp
        // return fields[fieldIdSelected]
      } else if (isAdding) {
        return fieldTemp
      }
      return {}
    },

    totalFields() {
      let {fields} = this
      return Object.values(fields).length
    },
    isEditing() {
      let {flag} = this
      return flag === FLAG_FIELD_CUSTOMIZE.EDIT
    },
    isAdding() {
      let {flag} = this
      return flag === FLAG_FIELD_CUSTOMIZE.ADD
    },
    isProcessing() {
      let {isEditing, isAdding} = this
      return isEditing || isAdding
    },
    disabledProcessAddingWithDropDownMode() {
      // todo: when adding with mode dropdown will disabled
      let {isAdding, isModeDropDown} = this
      return isAdding && isModeDropDown
    },


    isPrevProcess() {
      let {isAdding, fieldTypeIdSelected} = this
      return Boolean(isAdding) && Boolean(fieldTypeIdSelected)
    },
    isValidFieldAdding() {
      let {fieldTemp} = this
      return Boolean(fieldTemp['label']) && Boolean(fieldTemp['type'])
    },
    fieldActionsProcess() {
      return {}
    },
    optionalLayoutName() {
      let {fieldTypeIdSelected} = this
      if (Boolean(fieldTypeIdSelected)) {
        return getOptionalLayout(fieldTypeIdSelected)
      }
      return ''
    },
    sourceDataPredefined() {
      let {fieldTypeIdSelected} = this
      if (Boolean(fieldTypeIdSelected)) {
        let sources = getSourceDataPredefined(fieldTypeIdSelected)
        if (!Boolean(sources)) return []
        if (Array.isArray(sources)) {
          return sources
        } else {
          return Object.values(sources)
        }
      }
      return []
    },
    typeOptionalConfig() {
      let {fieldTypeIdSelected} = this
      if (Boolean(fieldTypeIdSelected)) {
        let configs = getAttributeOptionalConfig(fieldTypeIdSelected)
        if (!Boolean(configs)) return {
          // ...NatureOfSuit.TYPE_OPTIONAL_CONFIG
          ...TYPE_OPTIONAL_CONFIG_DEFAULT
        }
        return configs
      }
    },
    formActionsProcess() {
      let {isAdding, isValidFieldAdding} = this
      let {CREATE, CANCEL, UPDATE} = ACTIONS_PROCESS_FIELD_CUSTOMIZE
      if (isAdding) {
        return {
          [CANCEL.type]: {
            ...CANCEL,
            on: {
              click: this.cancelProcess
            }
          },
          [CREATE.type]: {
            ...CREATE,
            attrs: {
              ...CREATE.attrs,
              disabled: !isValidFieldAdding,
            },
            on: {
              click: this.createField
            }
          },
        }
      }
      return {
        [CANCEL.type]: {
          ...CANCEL,
          on: {
            click: this.cancelProcess
          }
        },
        [UPDATE.type]: {
          ...UPDATE,
          attrs: {
            ...UPDATE.attrs,
            disabled: !isValidFieldAdding,
          },
          on: {
            click: this.updateField
          }
        },
      }
    }
  },
  methods: {
    async loadFields() {
      // todo call api load all fields
    },
    prevProcess() {
      console.log('Prev Process')
      this.fieldTypeIdSelected = null
    },
    cancelProcess() {
      let {isModeDropDown} = this
      this.fieldTypeIdSelected = null
      this.fieldTemp = {}
      this.fieldIdSelected = null
      if (isModeDropDown) {
        this.flag = FLAG_FIELD_CUSTOMIZE.DEFAULT
      } else {
        this.flag = FLAG_FIELD_CUSTOMIZE.DEFAULT
      }
    },
    addNewField() {
      this.flag = FLAG_FIELD_CUSTOMIZE.ADD
      this.initializeFieldTemp()
    },
    initializeFieldTemp() {
      let {fieldTypeIdSelected, fieldTemp} = this
      if (Boolean(fieldTypeIdSelected)) {
        // if(!Boolean(fieldTemp['label'])) {
        let label = ATTRIBUTE_FIELDS[fieldTypeIdSelected]['LABEL']
        console.log(label)
        let field = {label}
        this.setFieldTempValue(field)
        // }
      }
    },
    editCurrentField() {
      this.flag = FLAG_FIELD_CUSTOMIZE.EDIT
    },
    async createField() {
      // todo call api create field
      let {fieldTemp, offlineMode} = this
      let {EDIT, DELETE, PIN} = ACTIONS_PROCESS_FIELD_CUSTOMIZE
      if (offlineMode) {
        // demo
        let fieldName = `f_${uuid()}`
        let fieldLabel = `${fieldTemp['label']}`
        let attribute = {
          ...fieldTemp,
          name: fieldName,

          actionsFieldSetting: {
            [PIN.type]: {
              ...PIN,
              on: {
                click: (e) => {
                  this.pinField(fieldName)
                  e.stopPropagation()
                }
              }
            },
            [ACTIONS_FIELD.GROUP_BY_FIELD.TYPE]: {
              ...ACTIONS_FIELD.GROUP_BY_FIELD,
              label: `${ACTIONS_FIELD.GROUP_BY_FIELD.label} ${fieldLabel}`,
              attrs: {},
              on: {
                click: (e) => {
                  e.stopPropagation()
                }
              }
            },
            [ACTIONS_FIELD.HIGHLIGHT.TYPE]: {
              ...ACTIONS_FIELD.HIGHLIGHT,
              attrs: {},
              on: {
                click: (e) => {
                  e.stopPropagation()
                }
              }
            },
            [ACTIONS_FIELD.SHOW_HIDE.TYPE]: {
              ...ACTIONS_FIELD.SHOW_HIDE,
              attrs: {},
              on: {
                click: (e) => {
                  e.preventDefault()
                  this.showHideField(fieldName)
                  e.stopPropagation()
                }
              }
            },
            [EDIT.type]: {
              ...EDIT,
              attrs: {},
              on: {
                click: (e) => {
                  this.editField(fieldName)
                  e.stopPropagation()
                }
              }
            },
            [DELETE.type]: {
              ...DELETE,
              attrs: {
                ...DELETE.attrs,
                color: 'red',
                activeClass: "red--text"
              },
              on: {
                click: (e) => {
                  this.removeField(fieldName)
                  e.stopPropagation()
                }
              }
            },

          }
        }

        let field = createInitiatedAttribute(attribute)
        this.setFields(field)
        this.cancelProcess()
      } else {
        // binding
      }

    },
    async updateField(newField) {
      // todo call api update field
      let {fieldTemp} = this
      let t = {...fieldTemp}
      this.setFields(t)
      this.cancelProcess()

    },
    editField(fieldName) {
      console.error(arguments)
      // turn on flat EDIT FIELD
      this.editCurrentField()
      let {fields} = this
      let field = fields[fieldName]
      if (field) {
        this.fieldIdSelected = fieldName
        this.fieldTypeIdSelected = field['type']
        this.fieldTemp = {...field}
      }
    },
    pinField(fieldName) {
      let {fields} = this
      let field = fields[fieldName]
      if (field) {
        field['pinned'] = true
        this.setFields(field)
      }
    },
    showHideField(fieldName) {
      let {fields} = this
      let field = fields[fieldName]
      if (field) {
        field['hide'] = true
        this.setFields(field)
      }
    },

    removeField(fieldName) {
      let {fields} = this
      let field = fields[fieldName]
      if (field) {
        let fieldLabel = field['label']
        if (window.confirm(`Want to delete field ${fieldLabel}?`)) {
          this.setFields(field, true)
        }
      }
    },
    setRequiredField(fieldId) {

    },
    setOrderField() {

    },
    getLabelOfTypeSelected() {
      let {fieldTypeIdSelected} = this
      if (Boolean(fieldTypeIdSelected)) {
        // if(!Boolean(fieldTemp['label'])) {
        return ATTRIBUTE_FIELDS[fieldTypeIdSelected]['LABEL']
        // }
      }
      return ''
    },
    chooseTypes(types = []) {
      this.fieldTypesSelected = [...types]
    },
    chooseFieldType({evt, fieldType}) {
      evt.preventDefault()
      this.fieldTypeIdSelected = fieldType['TYPE']
      evt.stopPropagation()
    },
    searchFilterTypes(option = {}) {
      let {
        data, k
      } = option
      if (k === 'search') {
        this.setQueryFilterTypes('search', data)
      } else if (k === 'cate') {
        this.setQueryFilterTypes('cate', data)
      }
    },
    setQueryFilterTypes(pathQuery, value) {
      let {queryFilterOfTypes = {}} = this
      let qr = {...queryFilterOfTypes}
      dotProp.set(qr, pathQuery, value)
      this.queryFilterOfTypes = {...qr}
    },
    processField(option) { // {data, k}
      let {sourceDataPredefined, typeOptionalConfig, fieldTemp} = this
      let {data, k} = option
      let attribute = {
        list: sourceDataPredefined || [],
        ...fieldTemp,
        // ...typeOptionalConfig,
      }
      if (k === 'field_name') {
        attribute["label"] = data
      } else if (k === 'field_type') {
        console.error('field_type', data)
        let type
        if (typeof data === "object") {
          type = data['TYPE']
        } else {
          type = data
        }
        attribute["type"] = type
        let _typeOptionalConfig = getAttributeOptionalConfig(type) || {}
        _typeOptionalConfig = {
          ...TYPE_OPTIONAL_CONFIG_DEFAULT,
          ..._typeOptionalConfig
        }
        // todo: setup selected id type of field
        this.fieldTypeIdSelected = type
        // todo: initialize Field Temp with label as label of type selected
        attribute['label'] = this.getLabelOfTypeSelected()
        attribute['typeOptionalConfig'] = _typeOptionalConfig
        attribute = {...attribute, ..._typeOptionalConfig}
        attribute['optionalField'] = attribute.optionalField || {}
        // todo: reset optionalField configs
        attribute['optionalField'] = {
          ..._typeOptionalConfig
        }
      } else if (k === 'field_color') {
        console.error('PROCESS_FIELD_COLOR', option)
        attribute['colorField'] = data
        attribute['darkField'] = $$lightOrDark(data)
      } else if (k === 'field_optional') {
        console.error('PROCESS_FIELD_OPTIONAL', data)
        console.error('sourceDataPredefined', sourceDataPredefined)
        let t = {...data}
        let choices = t['choices'] ? t['choices'] : sourceDataPredefined
        t['choices'] = choices
        attribute['list'] = choices
        attribute['optionalField'] = {
          ...t
        }
      }
      this.setFieldTempValue(attribute)
    },
    setFieldTempValue(field = {}) {
      let {fieldTemp} = this
      this.fieldTemp = {
        ...fieldTemp,
        ...field
      }
    },
    setFields(field, isDelete = false) {
      let {fields} = this
      let fieldAs = field['name']
      if (isDelete) {
        let t = {...fields}
        delete t[fieldAs]
        this.fields = {
          ...t
        }
      } else {
        this.fields = {
          ...fields,
          [fieldAs]: field
        }
      }


    }
  },
  render() {
    return this.$scopedSlots.default({
      addNewField: this.addNewField,
      editCurrentField: this.editCurrentField,
      createField: this.createField,
      updateField: this.updateField,
      removeField: this.removeField,
      setRequiredField: this.setRequiredField,
      setOrderField: this.setOrderField,
      pinField: this.pinField,
      cancelProcess: this.cancelProcess,
      prevProcess: this.prevProcess,
      chooseFieldType: this.chooseFieldType,
      searchFilterTypes: this.searchFilterTypes,
      chooseTypes: this.chooseTypes,
      processField: this.processField,
      processTitle: this.processTitle,
      fields: this.fields,
      fieldTypes: this.fieldTypes,
      queryFilterOfTypes: this.queryFilterOfTypes,
      categoriesFieldType: this.categoriesFieldType,
      fieldTypesSelected: this.fieldTypesSelected,
      valuesOfFieldTypes: this.valuesOfFieldTypes,
      loadingFields: this.loading,
      totalFields: this.totalFields,
      fieldSelected: this.fieldSelected,
      fieldTypeSelected: this.fieldTypeIdSelected,
      optionalLayoutName: this.optionalLayoutName,
      sourceDataPredefined: this.sourceDataPredefined,
      typeOptionalConfig: this.typeOptionalConfig,
      isEditing: this.isEditing,
      isAdding: this.isAdding,
      isProcessing: this.isProcessing,
      disabledProcessAddingWithDropDownMode: this.disabledProcessAddingWithDropDownMode,
      isPrevProcess: this.isPrevProcess,
      formActionsProcess: this.formActionsProcess,
      fieldTemp: this.fieldTemp,

    })
  }
}
