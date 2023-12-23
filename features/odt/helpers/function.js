export const generateToSub = (obj = {}, query = {}, to = {}) => {
  let _to = {
    query: {
      ...query,
      by: obj.path,
    },
    ...to,
  }
  return {
    ...obj,
    to: _to,
  }
}
export function handleExcludeQueryParams(
  queryParams = {},
  excludeParamsPattern = []
) {
  if (!excludeParamsPattern.length) return { ...queryParams }
  let temp = { ...queryParams }
  let keysQueryParams = Object.keys(temp)
  keysQueryParams.forEach((k) => {
    let isExistPatternInParam =
      excludeParamsPattern.filter((_p) => k.includes(_p)).length > 0
    if (isExistPatternInParam) {
      delete temp[k]
    }
  })
  return temp
}
