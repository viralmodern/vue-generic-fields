import assign from "lodash/assign"
import groupBy from "lodash/groupBy"
import keyBy from "lodash/keyBy"

export function $$convertGroupDataToFlatData (groupData, uniqueId) {
  let l = [], temp = { ...groupData }
  for (let groupItem in temp) {
    let currentGroup = temp[groupItem]
    let count = currentGroup.count
    let totalTaskServer = currentGroup.count
    let next = currentGroup.next
    let results = [...currentGroup.results]
    results = results.map(result => {
      return { ...result, groupItem }
    })
    let totalTask = currentGroup.results.length
    let pkGroup = `task-list-item-${groupItem}`
    let isFooter = true, isHeader = true
    let itemHeader = {
      groupItem, isHeader,
      [uniqueId]: `${pkGroup}-header`,
      totalTask,
      totalTaskServer
    }
    let itemFooter = {
      groupItem,
      count,
      next,
      isFooter,
      [uniqueId]: `${pkGroup}-footer`,
      totalTask,
      totalTaskServer
    }

    let newResults = [itemHeader, ...results, itemFooter]
    l = [...l, ...newResults]
  }
  return l
}

export function $$layoutTypes (types, includes, excludes) {
  let temp = assign(types) || {}
  if (includes.length) {
    for (let i in includes) {
      let type = includes[i]
      temp[type]["shown"] = true
    }
  }
  if (excludes) {
    for (let i in excludes) {
      let type = excludes[i]
      temp[type]["shown"] = false
    }
  }
  let rs = groupBy(temp, 'shown')
  return keyBy(rs["true"], 'TYPE')
}
export function convertLinkBookmarkToContentType (link, object_pk) {
  try {
    let path = '/'
    let regex = {
      opinions:  /\/api\/dockets\/[0-9]+\/docket\-entries\/[0-9]*/,
      dockets:  /\/api\/dockets\/[0-9]+\/docket\-entries\/[0-9]*/,
      docketEntries:  /\/api\/dockets\/[0-9]+\/docket\-entries\/[0-9]*/,
    }
    if(link.startsWith('/api/opinions/')) { // opinions
      path = `/odt/opinions/${object_pk}`
    }else if(regex.docketEntries.test(link)) {
      let strPath = link.split('/')
      let docket = strPath[3]
      path = `/odt/d/1/dockets/${docket}/${object_pk}`
    }else if(link.startsWith('/api/dockets/')){ // dockets
      path = `/odt/d/1/dockets/${object_pk}`
    }
    return path
  }catch (e) {
    return ''
  }
}
export const URL_PATTERN = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i');
export function $$validURL(str) {
  return URL_PATTERN.test(str) === true;
}
export function $$setEntriesSelected(rows = {}, row, uniqueId) {
  let temp = {...rows}
  let rowId = row[uniqueId]
  let newRows = {
    [rowId]: {...row}
  }
  if(temp.hasOwnProperty(rowId)) {
    delete temp[rowId]
  }else {
    temp = {...temp, ...newRows}
  }
  return temp
}

export function $$getEntriesSelected(arr = [], rowId) {
  return arr.includes(rowId)
}
