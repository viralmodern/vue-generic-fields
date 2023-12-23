import { SORT_TYPE } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
import keyBy from "lodash/keyBy"
import values from "lodash/values"

function updateItemAttributeSort (item, attributeName, sortType, index) {
  let temp = { ...item }
  temp[attributeName]["sort"] = sortType
  temp[attributeName]["sortIndex"] = index + 1
  temp[attributeName]["sortIndexLabel"] = index + 1 < 0 ? "" : index + 1
  return temp
}

export function $$initSortFields (query, attributes) {
  let sortConfig = [],
    fieldsConfig = [],
    attributesByName = keyBy(attributes, "name")
  if (query.ordering) {
    let ordering = query.ordering.split(",")
    ordering.forEach((item, i) => {
      let str = item.split("-")
      let attributeName = str[0]
      let attributeSortType = str[1]
      if(attributesByName[attributeName]) {
        // todo check with query route exist in attributes
        let sortType = attributeName === "" ? SORT_TYPE.DOWN.TYPE : SORT_TYPE.UP.TYPE
        let name = sortType === SORT_TYPE.DOWN.TYPE ? attributeSortType : attributeName
        let temp = { sortType, name }
        sortConfig.push(temp)
      }else {
        // todo query route not exist in attributes
      }

    })
  }
  for (let i = 0; i < sortConfig.length; i++) {
    let sortTemp = sortConfig[i]
    let attributeName = sortTemp["name"]
    attributesByName[attributeName] = {
      ...attributesByName[attributeName],
      sort: sortTemp.sortType,
      sortIndex: i + 1,
      sortIndexLabel: i + 1 < 0 ? "" : i + 1
    }
  }
  fieldsConfig = [...values(attributesByName)]
  return {
    fieldsConfig, sortConfig
  }
}

export function $$sortFields (data, queryParams) {
  // todo reset fields
  let fieldsConfig, sortConfig, newQueryParams = {}, ordering = []
  if (data) {
    if (data.unset) {
      sortConfig = []
      fieldsConfig = data.fields
      if (queryParams.ordering) {
        newQueryParams = { ...queryParams, ordering: "" }
      }

    } else {
      if (data.fields) {
        // todo update configs fields
        fieldsConfig = data.fields
      }
      if (data.ordering) {
        // todo update ordering binding
        ordering = data.ordering
        let strOrdering = ordering.join()
        newQueryParams = { ...queryParams, ordering: strOrdering }
      }
      if (data.sortConfig) {
        // todo update sort config
        sortConfig = data.sortConfig
      }
    }
  }
  let temp = {
    queryParams: newQueryParams,
    sortConfig: sortConfig,
    fieldsConfig: fieldsConfig
  }
  if (ordering.length) {
    temp["ordering"] = ordering
  }
  return { ...temp }
}

export function $$sortField ({ item, isSort, attributes, queryParams, sortConfig }) {
  let attributesByName = { ...keyBy(attributes, "name") },
    fieldsConfig
  sortConfig = [...sortConfig]
  let indexOfConfig = sortConfig.findIndex(sortItem => sortItem["name"] === item["name"])
  if (isSort) {
    if (indexOfConfig >= 0) {
      sortConfig[indexOfConfig] = item
    } else {
      sortConfig.push(item)
    }
  } else {
    if (indexOfConfig >= 0) {
      sortConfig.splice(indexOfConfig, 1)
      // todo reset attribute item
      attributesByName[item["name"]]["sort"] = ""
      attributesByName[item["name"]]["sortIndex"] = -1
      attributesByName[item["name"]]["sortIndexLabel"] = ""
    }
  }
  for (let i = 0; i < sortConfig.length; i++) {
    let sortTemp = sortConfig[i]
    let attributeName = sortTemp["name"]
    attributesByName[attributeName] = {
      ...attributesByName[attributeName],
      sort: sortTemp.sortType,
      sortIndex: i + 1,
      sortIndexLabel: i + 1 < 0 ? "" : i + 1
    }
  }
  // this.sortConfig = sortConfig
  fieldsConfig = values(attributesByName)
  let ordering = sortConfig.map(i => {
    return i.sortType === SORT_TYPE.UP.TYPE ? `${i.name}` : `-${i.name}`
  })
  let strOrdering = ordering.join()
  let newQueryParams = {
    ...queryParams,
    ordering: strOrdering
  }
  return {
    queryParams: newQueryParams,
    sortConfig,
    fieldsConfig
  }

}
