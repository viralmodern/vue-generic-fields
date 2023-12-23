import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
const actionsGenericField = {
  DELETE: {
    value: 'D',
    label: 'Delete',
  },
}
const FormatGenericField = [
  {
    value: ATTRIBUTE_FIELDS.DATE.TYPE,
    label: ATTRIBUTE_FIELDS.DATE.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    label: ATTRIBUTE_FIELDS.DROPDOWN.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.LABELS.TYPE,
    label: ATTRIBUTE_FIELDS.LABELS.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
    label: ATTRIBUTE_FIELDS.PROGRESS.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
    label: ATTRIBUTE_FIELDS.CHECKBOX.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.TEXT.TYPE,
    label: ATTRIBUTE_FIELDS.TEXT.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
    label: ATTRIBUTE_FIELDS.LONG_TEXT.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.EMAIL.TYPE,
    label: ATTRIBUTE_FIELDS.EMAIL.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
    label: ATTRIBUTE_FIELDS.ATTACHMENT.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.LOCATION.TYPE,
    label: ATTRIBUTE_FIELDS.LOCATION.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.MONEY.TYPE,
    label: ATTRIBUTE_FIELDS.MONEY.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.NUMBER.TYPE,
    label: ATTRIBUTE_FIELDS.NUMBER.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
    label: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
    label: ATTRIBUTE_FIELDS.PHONE_NUMBER.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
    label: ATTRIBUTE_FIELDS.PROGRESS.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.RATING.TYPE,
    label: ATTRIBUTE_FIELDS.RATING.LABEL,
  },
  {
    value: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
    label: ATTRIBUTE_FIELDS.WEBSITE.LABEL,
  },
]
export const fieldsGeneric = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  field_name: {
    name: 'field_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  field_format: {
    name: 'field_format',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    list: FormatGenericField,
  },
  field_definition: {
    name: 'field_definition',
    type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
  },
  tooltip_display: {
    name: 'tooltip_display',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        label: 'YES',
        value: 'Y',
      },
      {
        label: 'NO',
        value: 'N',
      },
    ],
  },
  created_by: {
    name: 'created_by',
    type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
  },
  field_show_hide: {
    name: 'field_show_hide',
    label: 'Field Show/Hide',
    type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
  },
  set_primary: {
    name: 'set_primary',
    type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
  },
  set_pinned: {
    name: 'set_pinned',
    type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
  },

  highlight_color: {
    name: 'highlight_color',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        label: 'YES',
        value: 'Y',
      },
      {
        label: 'NO',
        value: 'N',
      },
    ],
  },
  field_action: {
    name: 'field_action',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    list: [
      {
        ...actionsGenericField.DELETE,
      },
    ],
  },
}
