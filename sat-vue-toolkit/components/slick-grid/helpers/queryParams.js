import assign from "lodash/assign"
import keys from "lodash/keys"

export function $$cleanQueryParams (queryParams, ...params) {
  console.log("cleanQueryParams", params)
  let temp = { ...queryParams }
  for (let i = 0; i < params.length; i++) {
    delete temp[i]
  }
  return temp
}

export function convertQueryParamsToQueryFilter (queryRoute) {
   queryRoute = queryRoute || {
    // "ungroup": "true",
    // "predicate": "AND",
    // "court.EndsWith": "File #3",
    // "docket_number.Contains": "dk123"
  }
  let ks = keys(queryRoute), temp = {predicate: queryRoute['predicate']}
  const regex = /\./gmi;
  ks.forEach(k => {
    let val = queryRoute[k]
    if(regex.test(k)) {
      temp[k] = val
    }
  })
  return temp
}
export function removeQueryFilterFromQueryParams (queryRoute) {
  let queryParams = assign(queryRoute || {})
  const regex = /\./gmi;
  delete queryParams['predicate']
  let ks = keys(queryParams)
  ks.forEach(k => {
    if(regex.test(k)) {
      delete queryParams[k]
    }
  })
  return queryParams
}
export function $$initQueryParams (queryRoute, currentQueryParams) {
  let queryParams = {}, ungroup,
    groupType
  if(queryRoute.hasOwnProperty('ungroup')) {
    ungroup = queryRoute.ungroup == 'true'
    queryParams["ungroup"] = ungroup
  }
  if (queryRoute.group_by) {
    groupType = queryRoute.group_by
    queryParams["group_by"] = groupType
  }
  queryParams = assign({}, currentQueryParams, queryParams)
  return {
    queryParams,
    groupType,
  }
}

const querystring = require("querystring")
const md5 = require("md5")
window.querystring = querystring
export function $$existQueryRouteParams (queryParams, prevQueryParams) {
  let hashPrevQueryParams = md5(querystring.encode(prevQueryParams))
  let hashQueryParams = md5(querystring.encode(queryParams))
  return hashPrevQueryParams.localeCompare(hashQueryParams) === 0
}
export function $$handleExcludeQueryParams(
  queryParams = {},
  excludeParamsPattern = []
) {
  if (!excludeParamsPattern.length) return { ...queryParams }
  let temp = { ...queryParams }
  let keysQueryParams = Object.keys(temp)
  keysQueryParams.forEach((k) => {
    let isExistPatternInParam = excludeParamsPattern.filter((_p) => k.includes(_p)).length > 0
    if (isExistPatternInParam) {
      delete temp[k]
    }
  })
  return temp
}
