import groupBy from "lodash/groupBy"
import { $$rangeThisMonth, $$rangeThisWeek, $$toDay } from "@/sat-vue-toolkit/functions"
import uniq from "lodash/uniq"
import values from "lodash/values"

export const $PREDICATE = {
  $and: {
    type: '$and', value: "$and", label: "AND"
  },
  $or: {
    type: '$and', value: "$or", label: "OR"
  }
}
export const PREDICATE = [
  $PREDICATE.$and,
  $PREDICATE.$or
]

export const OPERATIONS = {
  IsEmpty: {
    type: "IsEmpty",
    label: "Is Empty",
    reg: "!",
    valueCount: 0
  },
  IsNotEmpty: {
    type: "IsNotEmpty",
    label: "Is Not Empty",
    reg: ">+=",
    valueCount: 0
  },
  Contains: {
    type: "Contains",
    label: "Contains",
    reg: "'",
    valueCount: 1
  },
  StartsWith: {
    type: "StartsWith",
    label: "Starts With",
    reg: "^",
    valueCount: 1
  },
  EndsWith: {
    type: "EndsWith",
    label: "Ends With",
    reg: "$",
    valueCount: 1
  },
  EqualTo: {
    type: "EqualTo",
    label: "Equal to",
    reg: "=",
    valueCount: 1
  },
  EqualValue: {
    type: "EqualValue",
    label: "Equal value",
    reg: "===",
    valueCount: 1
  },
  NotEqual: {
    type: "NotEqual",
    label: "Not equal",
    reg: "!=",
    valueCount: 1
  },
  NotEqualValue: {
    type: "NotEqualValue",
    label: "Not equal value",
    reg: "!==",
    valueCount: 1
  },
  GreaterThan: {
    type: "GreaterThan",
    label: "Greater than",
    reg: ">",
    valueCount: 1
  },
  GreaterThanOrEqualTo: {
    type: "GreaterThanOrEqualTo",
    label: "Greater than or equal to",
    reg: ">=",
    valueCount: 1
  },
  LessThan: {
    type: "LessThan",
    label: "Less than",
    reg: "<",
    valueCount: 1
  },
  LessThanOrEqualTo: {
    type: "LessThanOrEqualTo",
    label: "Less than or equal to",
    reg: "<=",
    valueCount: 1
  },
  IsBetween: {
    type: "IsBetween",
    label: "Is Between",
    reg: "<>",
    valueCount: 2
  },
  Is: {
    type: "Is",
    label: "Is",
    reg: "===",
    valueCount: 1
  },
  IsNot: {
    type: "IsNot",
    label: "Is Not",
    reg: "!==",
    valueCount: 1
  },
  IsAnyOf: {
    type: "IsAnyOf",
    label: "Is Any Of",
    reg: "^",
    valueCount: 1,
    valueMultiple: true
  },
  IsAllOf: {
    type: "IsAllOf",
    label: "Is All Of",
    reg: "*^",
    valueCount: 1,
    valueMultiple: true
  },
  IsNoneOf: {
    type: "IsNoneOf",
    label: "Is None Of",
    reg: "*$",
    valueCount: 1,
    valueMultiple: true
  },
  ToDay: {
    type: "ToDay",
    label: "Today",
    reg: "T",
    valueCount: 0
  },
  ThisWeek: {
    type: "ThisWeek",
    label: "This Week",
    reg: "W",
    valueCount: 0
  },
  ThisMonth: {
    type: "ThisMonth",
    label: "This Month",
    reg: "M",
    valueCount: 0
  },
  Before: {
    type: "Before",
    label: "Before",
    reg: "<",
    valueCount: 1
  },
  After: {
    type: "After",
    label: "After",
    reg: ">",
    valueCount: 1
  },
  Checked: {
    type: "Checked",
    label: "Checked",
    reg: "=",
    valueCount: 0
  },
  NotChecked: {
    type: "NotChecked",
    label: "Not Checked",
    reg: "!",
    valueCount: 0
  }

}

export function emptyValueFilter (operatorType) {
  let operationsEmpty = [
    OPERATIONS.IsEmpty.type,
    OPERATIONS.IsNotEmpty.type,
    OPERATIONS.ThisMonth.type,
    OPERATIONS.ThisWeek.type,
    OPERATIONS.ToDay.type,
    OPERATIONS.Checked.type,
    OPERATIONS.NotChecked.type
  ]
  return operationsEmpty.includes(operatorType)
}


export function isBetweenOperation (operatorType) {
  return operatorType === OPERATIONS.IsBetween.type
}

export function $$queryStringConvertRulesFilter (rules) {
  // if(!rules.length) return
  console.error('ALL_RULE', rules)
  let conditionNotAvailable = [null, "", "null", undefined]
  let l = {}, predicate;
  predicate = rules[0] ? rules[0]['predicate']['value'] : ''
  let v = rules.filter(v => !conditionNotAvailable.includes(v.attribute)).map(v => {
    return {
      id: v.id,
      predicate: v.predicate.value,
      attribute: v.attribute ? v.attribute.name : v.attribute,
      operator: v.operator ? v.operator.type : v.operator,
      value: v.value
    }
  })
  let grb = groupBy(v, "attribute")
  for (let attribute in grb) {
    // todo: level 1
    let itemsGroup = grb[attribute]
    let grbItems = groupBy(itemsGroup, "operator")
    let booleanValue = [
      OPERATIONS.IsEmpty.type,
      OPERATIONS.IsNotEmpty.type,
      OPERATIONS.Checked.type,
      OPERATIONS.NotChecked.type
    ]
    for (let operator in grbItems) {
      // todo: level 2
      if (conditionNotAvailable.includes(operator)) {

      } else {
        let itemGroup = grbItems[operator].filter(v => !conditionNotAvailable.includes(v.operator))
        let valueBefore = []
        let valueAfter = []
        if (operator === OPERATIONS.ThisWeek.type) {
          valueBefore = [...$$rangeThisWeek()]
        } else if (operator === OPERATIONS.ThisMonth.type) {
          valueBefore = [...$$rangeThisMonth()]
        } else if (operator === OPERATIONS.ToDay.type) {
          valueBefore = [...$$toDay()]
        } else if (booleanValue.includes(operator)) {
          valueBefore = [true]
        } else {
          valueBefore = itemGroup.map(temp => temp.value.valueBefore)
          valueAfter = itemGroup.map(temp => temp.value.valueAfter)
        }
        valueBefore = uniq(valueBefore)
        valueAfter = uniq(valueAfter)
        let strValue = ""
        let groupValue = uniq([...valueBefore, ...valueAfter].filter(v => !conditionNotAvailable.includes(v)))
        strValue = groupValue.join()
        if (groupValue.length) {
          l[`${attribute}.${operator}`] = {
            groupValue,
            [`${attribute}.${operator}`]: strValue
            // [`${attribute}.${operator}`]: groupValue
          }
        }
      }
    }
  }
  let queryStringParamsFilter = {predicate}
  Object.keys({ ...l }).forEach(k => {
    queryStringParamsFilter[k] = l[k][k]
  })
  return {
    predicate,
    queryStringParamsFilter,
    values: values(l),
  }
}
