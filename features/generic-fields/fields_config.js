import _ from 'lodash'
export const FIELD_TYPES = [
  'Attachment',
  'Checkbox',
  'Currency',
  'Date',
  'DateTime',
  'Decimal',
  'Email',
  'Image',
  'Integer',
  'Link',
  'Member',
  'Phone',
  'Progress',
  'Text',
  // more
  'Label',
  'DropDown',
  'CheckList',

  'LitigationCode',
  'ExpenseCode',
  'ActivityCode'
]
export const WORKSPACE_MODEL_ATTRIBUTES = {
  Attachment: {
    id: 'Attachment',
    label: 'Attachment',
    icon: 'mdi-attachment',
    component: 'AttributesAttachment',
    cell_component: 'AttributesAttachmentCell',
    cell_label: '',
    card_component: 'AttributesAttachmentCard',
    dialog_cell: true,
    has_group: false
  },
  Checkbox: {
    id: 'Checkbox',
    label: 'Checkbox',
    icon: 'mdi-checkbox-marked-outline',
    component: 'AttributesCheckbox',
    cell_component: 'AttributesCheckboxCell',
    cell_label: '',
    card_component: 'AttributesCheckboxCard',
    dialog_cell: false,
    has_group: false
  },
  Currency: {
    id: 'Currency',
    label: 'Currency',
    icon: 'mdi-currency-usd',
    component: 'AttributesCurrency',
    cell_component: 'AttributesCurrencyCell',
    cell_label: '',
    card_component: 'AttributesCurrencyCard',
    dialog_cell: false,
    has_group: true
  },
  Date: {
    id: 'Date',
    label: 'Date',
    icon: 'mdi-calendar',
    component: 'AttributesDate',
    cell_component: 'AttributesDateCell',
    cell_label: '',
    card_component: 'AttributesDateCard',
    dialog_cell: false,
    has_group: true
  },
  DateTime: {
    id: 'DateTime',
    label: 'DateTime',
    icon: 'mdi-calendar-clock',
    component: 'AttributesDateTime',
    cell_component: 'AttributesDateTimeCell',
    cell_label: '',
    card_component: 'AttributesDateTimeCard',
    dialog_cell: false,
    has_group: true
  },
  Decimal: {
    id: 'Decimal',
    label: 'Decimal',
    icon: 'mdi-numeric',
    component: 'AttributesDecimal',
    cell_component: 'AttributesDecimalCell',
    cell_label: '',
    card_component: 'AttributesDecimalCard',
    dialog_cell: true
  },
  Email: {
    id: 'Email',
    label: 'Email',
    icon: 'mdi-email',
    component: 'AttributesEmail',
    cell_component: 'AttributesEmailCell',
    cell_label: '',
    card_component: 'AttributesEmailCard',
    dialog_cell: false,
    has_group: false
  },
  Image: {
    id: 'Image',
    label: 'Image',
    icon: 'mdi-folder-multiple-image',
    component: 'AttributesImage',
    cell_component: 'AttributesImageCell',
    cell_label: '',
    card_component: 'AttributesImageCard',
    dialog_cell: true,
    has_group: false
  },
  Integer: {
    id: 'Integer',
    label: 'Integer',
    icon: 'mdi-numeric-9-box-multiple-outline',
    component: 'AttributesInteger',
    cell_component: 'AttributesIntegerCell',
    cell_label: '',
    card_component: 'AttributesIntegerCard',
    dialog_cell: true,
    has_group: true
  },
  Link: {
    id: 'Link',
    label: 'Link',
    icon: 'mdi-link-variant',
    component: 'AttributesLink',
    cell_component: 'AttributesLinkCell',
    cell_label: '',
    card_component: 'AttributesLinkCard',
    dialog_cell: true,
    has_group: false
  },
  Member: {
    id: 'Member',
    label: 'Member',
    icon: 'mdi-account-multiple',
    component: 'AttributesMember',
    cell_component: 'AttributesMemberCell',
    cell_label: '',
    card_component: 'AttributesMemberCard',
    dialog_cell: false,
    has_group: true
  },
  Phone: {
    id: 'Phone',
    label: 'Phone',
    icon: 'mdi-phone',
    component: 'AttributesPhone',
    cell_component: 'AttributesPhoneCell',
    cell_label: '',
    card_component: 'AttributesPhoneCard',
    dialog_cell: true,
    has_group: false
  },
  Progress: {
    id: 'Progress',
    label: 'Progress',
    icon: 'mdi-timelapse',
    component: 'AttributesProgress',
    cell_component: 'AttributesProgressCell',
    cell_label: '',
    card_component: 'AttributesProgressCard',
    dialog_cell: false,
    has_group: true
  },
  Text: {
    id: 'Text',
    label: 'Text',
    icon: 'mdi-pencil',
    component: 'AttributesText',
    cell_component: 'AttributesTextCell',
    cell_label: '',
    card_component: 'AttributesTextCard',
    dialog_cell: true,
    has_group: false
  },
  // more
  Label: {
    id: 'Label',
    label: 'Label',
    icon: 'mdi-timelapse',
    component: 'AttributesLabel',
    cell_component: 'AttributesLabelCell',
    cell_label: '',
    card_component: 'AttributesLabelCard',
    dialog_cell: false,
    has_group: true
  },
  DropDown: {
    id: 'DropDown',
    label: 'DropDown',
    icon: 'mdi-timelapse',
    component: 'AttributesDropDown',
    cell_component: 'AttributesDropDown',
    cell_label: '',
    card_component: 'AttributesDropDownCard',
    dialog_cell: false,
    has_group: false
  },
  CheckList: {
    id: 'CheckList',
    label: 'CheckList',
    icon: 'mdi-timelapse',
    component: 'AttributesCheckList',
    cell_component: 'AttributesCheckListCell',
    cell_label: '',
    card_component: 'AttributesCheckListCard',
    dialog_cell: false,
    has_group: false
  },
  LitigationCode: {
    id: 'LitigationCode',
    label: 'LitigationCode',
    icon: 'mdi-receipt',
    component: 'AttributesLitigationCode',
    cell_component: 'AttributesLitigationCodeCell',
    cell_label: '',
    card_component: 'AttributesLitigationCodeCard',
    dialog_cell: false,
    has_group: true
  },
  ExpenseCode: {
    id: 'ExpenseCode',
    label: 'ExpenseCode',
    icon: 'mdi-chart-pie',
    component: 'AttributesExpenseCode',
    cell_component: 'AttributesExpenseCodeCell',
    cell_label: '',
    card_component: 'AttributesExpenseCodeCard',
    dialog_cell: false,
    has_group: true
  },
  ActivityCode: {
    id: 'ActivityCode',
    label: 'ActivityCode',
    icon: 'mdi-flash',
    component: 'AttributesActivityCode',
    cell_component: 'AttributesActivityCodeCell',
    cell_label: '',
    card_component: 'AttributesActivityCodeCard',
    dialog_cell: false,
    has_group: true
  }
}

export const getAttributeByProp = ({ type, prop }) => {
  try {
    return WORKSPACE_MODEL_ATTRIBUTES[type][prop]
  } catch (e) {
    return ''
  }
}
export const getIconAttributeIcon = ({ type }) => {
  try {
    return WORKSPACE_MODEL_ATTRIBUTES[type].icon
  } catch (e) {
    return ''
  }
}
export const getAttributeComponentName = ({ type }) => {
  try {
    return WORKSPACE_MODEL_ATTRIBUTES[type].component
  } catch (e) {
    return ''
  }
}
export const getAttributeComponentCellName = ({ type }) => {
  try {
    return WORKSPACE_MODEL_ATTRIBUTES[type].cell_component
  } catch (e) {
    return ''
  }
}
export const getListAttribute = () => {
  return _.map(
    _.keys(WORKSPACE_MODEL_ATTRIBUTES),
    (k) => WORKSPACE_MODEL_ATTRIBUTES[k]
  )
}
