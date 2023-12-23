import { ATTRIBUTE_FIELDS, COLORS } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import faker from "faker"
import uniqWith from "lodash/uniqWith"
import isEqual from "lodash/isEqual"

export async function $$fetchEntries ({
  dataGroup, endPoint,
  includeParams,
  excludeParams,
  noQueryParams,
  items,
  $api,
  queryParams
}) {
  return new Promise(async (resolve, reject) => {
    let temp = { ...dataGroup }
    try {
      const querystring = require("querystring")
      const strQueryParams = querystring.encode(queryParams)
      const isUngroup = querystring.decode(strQueryParams).ungroup.toLowerCase() === "true"
      let params = { ...queryParams }
      // console.error('CURD', params, includeParams)
      // todo includes query params
      if (Object.keys(includeParams).length > 0) {
        // params = {...params, ...includeParams }
        console.log(Boolean(Object.values(includeParams).length))
        params = { ...includeParams, ...params }
        // console.error('INCLUDES', {params, includeParams})
      }
      // todo exclude query params
      if (excludeParams.length) {
        // todo remove exclude params
        for (let i = 0; i < excludeParams.length; i++) {
          const param = excludeParams[i]
          delete params[param]
        }
      }
      if (noQueryParams) {
        if (items) {
          if (Array.isArray(items)) {
            temp = {
              "": {
                results: items,
                count: items.length
              }
            }
          } else {
            temp = items
          }
        }
      } else {
        const rs = await $api.get(endPoint, { params })
        let res
        if (Array.isArray(rs.data)) {
          // todo flat map data ex: [{}, {}]
          res = {
            results: [...rs.data],
            count: rs.data.length,
            next: null,
            previous: null
          }
        } else {
          res = { ...rs.data }
        }
        if (isUngroup) {
          temp = { "": res }
        } else {
          // todo check load more

          // ...
          temp = { ...res }
        }
      }
      console.log("SUCCESS", temp)
      resolve({ ...temp })
    } catch (e) {
      console.error("$$fetchEntries", e?.message)
      reject(false)
    } finally {

    }
  })
}

export async function $$loadRowDetail ({ rowId, $api, groupByItem, ungroup, dataGroup, endPoint, uniqueId, row, queryParams }) {
  return new Promise(async (resolve, reject) => {
    const temp = { ...dataGroup }; let k = ""
    if (ungroup === false) {
      k = groupByItem
    }
    const groupData = { ...temp[k] }
    console.error("groupData", groupData)
    const resultsGroup = groupData.results
    const results = [...resultsGroup]
    const pk = row ? row[uniqueId] : rowId
    const indexRow = results.findIndex(item => item[uniqueId] == pk)
    if (indexRow >= 0) {
      if (row) {
        results[indexRow] = row
        groupData.results = [...results]
        temp[k] = { ...groupData }
      } else {
        const res = await $api.get(`${endPoint}${rowId}`)
        const newRow = res.data
        results[indexRow] = { ...newRow }
        groupData.results = [...results]
        temp[k] = { ...groupData }
      }
      console.log(results, indexRow, row, uniqueId, groupByItem, temp, rowId)
      resolve({ ...temp })
    }
  })
}

export async function $$updateOrderField ({ rowId, $api, groupByItem, ungroup, dataGroup, endPoint, uniqueId, row, order }) {
  return new Promise(async (resolve, reject) => {
    try {
      const temp = { ...dataGroup }
      let k = ""
      if (ungroup === false) {
        k = groupByItem
      }
      const groupData = { ...temp[k] }
      const results = [...groupData.results]
      const pk = row ? row[uniqueId] : rowId
      const indexRow = results.findIndex(item => item[uniqueId] == pk)
      if (indexRow >= 0) {
        const res = await $api.patch(`${endPoint}${pk}`, { order })
        results[indexRow] = { ...res.data }
        groupData.results = [...results]
        temp[k] = { ...groupData }
      }
      resolve({ ...temp })
    } catch (e) {
      console.error("$$updateOrderField", e.message)
      reject({ ...dataGroup })
    } finally {

    }
  })
}

export function $$deleteRow ({ row, groupByItem, uniqueId, ungroup, dataGroup }) {
  return new Promise(async (resolve, reject) => {
    let k = ""
    if (ungroup === false) {
      k = groupByItem
    }
    const temp = { ...dataGroup }
    const results = [...temp[k].results]
    const newResults = results.filter(item => item[uniqueId] != row[uniqueId])
    temp[k].results = [...newResults]
    temp[k].count = temp[k].count - 1
    resolve({ ...temp })
  })
}

export async function $$addNewRow ({ data, ungroup, dataGroup, isOffline }) {
  return new Promise(async (resolve, reject) => {
    // todo: add new row
    const temp = { ...dataGroup }
    const row = data.row
    const rows = data.rows
    let newRow = []
    // todo: multiple row
    if (rows) {
      newRow = [...rows]
    } else {
      newRow = [row]
    }
    // isOffline
    console.error("TEMP", temp)
    if (ungroup) {
      const k = ""
      temp[k] = temp[k] || {}
      temp[k].results = temp[k].results || []

      const resultsGroup = temp[k].results
      const results = [...resultsGroup, ...newRow]
      temp[k].results = [...results]
      temp[k].count = temp[k].count + newRow.length
    } else {
      let group = data.group
      if (group === "ungroup") {
        group = 0
      }
      group = group.toString()
      if (temp[group]) {
        const resultsGroup = temp[group].results
        const results = [...resultsGroup, ...newRow]
        temp[group].results = [...results]
        temp[group].count = temp[group].count + newRow.length
      }
    }

    resolve({ ...temp })
  })
}

export async function $$paginateRows ({ $api, queryParams, dataGroup, endPoint }) {
  return new Promise(async (resolve, reject) => {
    try {
      // ungroup: { "ordering": "-latest_filed_date,case_name", "page": "2", "ungroup": "true" }
      //
      const querystring = require("querystring")
      const strQueryParams = querystring.encode(queryParams)
      const isUngroup = querystring.decode(strQueryParams).ungroup.toLowerCase() === "true"
      const _res = await $api.get(endPoint, { params: { ...queryParams } })
      const res = _res.data
      const temp = { ...dataGroup }
      let results = []; let group_items = ""
      if (isUngroup) {
        results = [...temp[""].results, ...res.results]
        temp[group_items] = { ...temp[group_items], ...res, results }
      } else {
        group_items = queryParams.group_items
        results = [...temp[group_items].results, ...res[group_items].results]
        temp[group_items] = { ...temp[group_items], ...res[group_items], results }
      }
      resolve({ ...temp })
    } catch (e) {
      reject(false)
      console.log(e.message) // eslint-disable-line
    } finally { // eslint-disable-line
    }
  })
}

export function normalizeRelations (data, fields) {
  return {
    ...data,
    ...fields.reduce((prev, field) => ({
      ...prev,
      [field]: Array.isArray(data[field])
        ? data[field].map(x => x.id)
        : data[field].id
    }), {})
  }
}

export function resolveRelations (data, fields, rootGetters) {
  return {
    ...data,
    ...fields.reduce((prev, field) => ({
      ...prev,
      [field]: Array.isArray(data[field])
        ? data[field].map(x => rootGetters[`${field}/find`](x))
        : rootGetters[`${field}/find`](data[field])
    }), {})
  }
}

export function generatorDummyList (attribute = {}, totalRow = 5) {
  const {
    itemValue = "value",
    itemText = "label"
  } = attribute
  const rows = []
  for (let i = 0; i < totalRow; i++) {
    const row = {}
    row[itemValue] = faker.random.uuid()
    row[itemText] = faker.random.words()
    rows.push(row)
  }
  return rows
}
export function dummyValueAttributeList (attribute = {}, totalRow = 3) {
  const {
    multiple = false,
    list = []
  } = attribute
  let val = null
  if (!list.length) { return val }
  if (multiple) {
    // icons = uniqWith(icons, isEqual)
    val = []
    while (val.length < totalRow) {
      const t = list[Math.floor(Math.random() * list.length)]
      val.push(t)
      val = uniqWith(val, isEqual)
    }
  } else {
    val = list[Math.floor(Math.random() * list.length)]
  }
  return val
}
export function dummyValueAttributeDropDown (attribute = {}) {
  const {
    list = [],
    itemValue = "value"
  } = attribute
  let val = null
  if (!list.length) { return val }
  val = list[Math.floor(Math.random() * list.length)]
  return val[itemValue]
}
export function dummyValueAttributeHeatMap () {
  const y = Math.floor(Math.random() * 39) + 1
  const m = Math.floor(Math.random() * 11) + 1
  const d = Math.floor(Math.random() * 29) + 1
  const label = `${y}y ${m}mo ${d}d`
  let title = ""
  title += `${y} ${y > 1 && "years" || "year"} `
  title += `${m} ${m > 1 && "months" || "month"} `
  title += d && `and ${d} ${d > 1 && "days" || "day"}`
  // let color = faker.commerce.color()
  let color = COLORS[Math.floor(Math.random() * COLORS.length)]
  color = color.replace("#", "")
  return {
    color,
    label,
    percent: Math.floor(Math.random() * 100),
    // title: "1 year, 6 months and 6 days",
    title
  }
}
export function createCellValueByAttribute (attribute = {}) {
  let value = ""
  const {
    type, sub_type
  } = attribute
  switch (type) {
    case ATTRIBUTE_FIELDS.TEXT.TYPE:
      if (sub_type === ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME) {
        value = faker.name.findName()
      } else if (sub_type === ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.COMPANY_NAME) {
        value = faker.company.companyName()
      } else if (sub_type === ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE) {
        value = faker.name.title()
      } else if (sub_type === ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TOTAL_DAY) {
        const days = dummyValueAttributeHeatMap()
        value = days.label
      } else if (sub_type === ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN) {
        value = faker.finance.iban()
      } else {
        value = faker.lorem.words()
      }
      break
    case ATTRIBUTE_FIELDS.EMAIL.TYPE:
      value = faker.internet.email()
      break
    case ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE:
      value = faker.phone.phoneNumberFormat()
      break
    case ATTRIBUTE_FIELDS.ADDRESS.TYPE:
      if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY) {
        value = faker.address.city()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY) {
        value = faker.address.county()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE) {
        value = faker.address.zipCode()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE) {
        value = faker.address.state()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTRY) {
        value = faker.address.country()
      } else {
        value = faker.address.streetAddress()
      }
      break
    case ATTRIBUTE_FIELDS.LIST.TYPE:
      value = dummyValueAttributeList(attribute)
      break
    case ATTRIBUTE_FIELDS.INTEGER.TYPE:
      value = faker.random.number()
      break
    case ATTRIBUTE_FIELDS.HEATMAP.TYPE:
      value = dummyValueAttributeHeatMap()
      break
    case ATTRIBUTE_FIELDS.LINK_TEXT.TYPE:
      if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY) {
        value = faker.address.city()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY) {
        value = faker.address.county()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE) {
        value = faker.address.zipCode()
      } else if (sub_type === ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE) {
        value = faker.address.state()
      } else {
        value = faker.lorem.words()
      }
      break
    case ATTRIBUTE_FIELDS.DATE.TYPE:
      value = faker.date.past()
      break
    case ATTRIBUTE_FIELDS.DATE_TIME.TYPE:
      value = faker.date.past()
      break
    case ATTRIBUTE_FIELDS.LABELS.TYPE:
      break
    case ATTRIBUTE_FIELDS.CHECKBOX.TYPE:
      value = faker.random.boolean()
      break
    case ATTRIBUTE_FIELDS.PICTURE.TYPE:
      value = faker.image.image()
      break
    case ATTRIBUTE_FIELDS.DROPDOWN.TYPE:
      value = dummyValueAttributeDropDown(attribute)
      break
    case ATTRIBUTE_FIELDS.SPARK_LINE.TYPE:

      break
    case ATTRIBUTE_FIELDS.WEBSITE.TYPE:
      value = faker.internet.url()
      break
    default:
      break
  }
  console.error("FIELD_TYPE", type + " AND " + sub_type)
  return value
}

export function $$generatorDummyRows (attributes = [], totalRow = 1, uniqueId = "pk") {
  function createRow () {
    const row = {}
    const pk = faker.random.uuid()
    attributes.forEach((attribute) => {
      const attributeName = attribute.name
      row[uniqueId] = pk
      console.error("attributeName", attributeName, attributes)
      row[attributeName] = createCellValueByAttribute(attribute)
    })
    return row
  }
  const rows = []
  for (let i = 0; i < totalRow; i++) {
    const row = createRow()
    rows.push(row)
  }
  console.error("ROWS", {rows, attributes, totalRow})
  return rows
}
