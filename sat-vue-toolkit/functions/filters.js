import uniq from 'lodash/uniq'
export function $$filterDataByFuse ({ list, queryStringParams, predicate = '$and' }) {
  let Fuse = require("fuse.js").default
  queryStringParams = queryStringParams || {
    "name.Contains": "ddd",
    "name.StartsWith": "aaa"
  }
  let ks = Object.keys(queryStringParams)
  let fields = [...ks].map(k => {
    let str = ''
    str = k.split('.')[0]
    return str
  })
  let options = {
    // includeScore: true,
    caseSensitive: true,
    // Search in `author` and in `tags` array
    // keys: ['name', 'link', 'file'],
    keys: [...uniq(fields)]
  }
  let fuse = new Fuse(list, options)
  let predicateRules = ks.map(k => {
    let l = {}
    let str = k.split('.')
    let keyName = str[0]
    l[keyName] = `^${queryStringParams[k]}`
    return l
  })

  let results = fuse.search({
    [predicate]: [
      ...predicateRules
    ]
  })

  return results.map(result => {
    return {...result.item}
  })
}
