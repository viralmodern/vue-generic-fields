import { $$labelByName } from "~/sat-vue-toolkit/functions"
import md5 from "md5"
import { generatorDummyList } from "@/sat-vue-toolkit/components/slick-grid/helpers/coreCurd"
import { ACTIONS_FIELD, ATTRIBUTE_FIELDS } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"

const attributeTypesOfChoice = [
  ATTRIBUTE_FIELDS.LIST.TYPE,
  ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
]
export function reduceAttributes (attributes, fieldsConfig, mainCellId) {
  try {
    let items = [], nAttributes = []

    if(Array.isArray(attributes)) {
      nAttributes = [...attributes]
    }else if(typeof attributes === "object"){
      nAttributes = [...Object.values(attributes)]
    }
    items = nAttributes.map((attribute, index) => {
      let temp = { ...attribute }
      if(fieldsConfig) {
        temp = fieldsConfig[index] ? { ...fieldsConfig[index], ...temp } : temp
      }
      let isFirstField = index === 0
      return createInitiatedAttribute(temp, mainCellId, isFirstField)
    })
    return [...items]
  }catch (e) {
    console.error(e.message)
    return []
  }
}
export function createInitiatedAttribute (attribute = {}, mainCellId, isFirstField = false) {
  let temp = {...attribute}
  let label = temp["text"] = $$labelByName(attribute),
    attributeType = temp['type'],
    itemText = attribute['itemText'] || 'label',
    itemValue = attribute['itemValue'] || 'value',
    attributeName = attribute['name']

  let pinned = temp['pinned'] || isFirstField
  let isMainCellId  = mainCellId ? attributeName === mainCellId : isFirstField
  temp["icon"] = Boolean(ATTRIBUTE_FIELDS[attributeType].ICON) ? ATTRIBUTE_FIELDS[attributeType].ICON : '';
  temp["label"] = label
  temp['itemText'] = itemText
  temp['itemValue'] = itemValue
  temp['width'] = attribute['width'] || 150

  temp['pinned'] = pinned
  temp['isMainCellId'] = isMainCellId
  temp['isChoiceField'] = attributeTypesOfChoice.includes(attributeType)

  if(attribute.type === ATTRIBUTE_FIELDS.SPARK_LINE.TYPE) {
    temp['width'] = 240
  }
  temp['uuidField'] = attributeName
  temp['uuidLabel'] = label
  temp['strFieldId'] = `field-${attributeName}`
  temp['actionsField'] = {
    [ACTIONS_FIELD.PIN.TYPE]: {
      ...ACTIONS_FIELD.PIN,
      LABEL: pinned ? ACTIONS_FIELD.PIN.LABEL_OFF : ACTIONS_FIELD.PIN.LABEL,
      DISABLED: isMainCellId
    },
    [ACTIONS_FIELD.GROUP_BY_FIELD.TYPE]: {
      ...ACTIONS_FIELD.GROUP_BY_FIELD,
      LABEL: `${ACTIONS_FIELD.GROUP_BY_FIELD.LABEL} ${label}`
    },
    [ACTIONS_FIELD.SHOW_HIDE.TYPE]: {
      ...ACTIONS_FIELD.SHOW_HIDE,
      DISABLED: isMainCellId
    },
    [ACTIONS_FIELD.HIGHLIGHT.TYPE]: {
      ...ACTIONS_FIELD.HIGHLIGHT
    },
    [ACTIONS_FIELD.EDIT.TYPE]: {
      ...ACTIONS_FIELD.EDIT
    },
  }
  // optional field
  let optionalField = temp['optionalField'] || {}
  let list =  attribute['list'] || []
  if(optionalField) {
    if(optionalField['isCustomChoices']) {
      if(optionalField['customChoices']) {
        list = optionalField['customChoices']
      }else {
        // list = optionalField['choices']
      }
    }
    if(optionalField.hasOwnProperty('multiple')) {
      temp['multiple'] = optionalField['multiple']
    }
    if(optionalField.hasOwnProperty('chips')) {
      temp['chips'] = optionalField['chips']
    }

  }
  if(list.length) {
    temp['list'] = list
  }else {
    temp['list'] = generatorDummyList(attribute)
  }
  temp['list'] = temp['list'].map(item => {
    let t = {...item}
    let value = t.hasOwnProperty(itemValue) && t[itemValue].toString() || ''
    let idField = `${attributeName}-${value}`
    let uuid_field = md5(idField)
    t['uuidLabel'] = item[itemText]
    t['uuidField'] = uuid_field
    t[uuid_field] = value
    return t
  })
  return temp
}
