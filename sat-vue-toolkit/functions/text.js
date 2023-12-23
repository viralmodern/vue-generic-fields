export const getTextContent = (row = {}, attribute = {}) => {
  try {
    let { dotPropText, itemText, name } = attribute
    let val = row[name]
    if (!Boolean(val)) {
      return ""
    } else if (typeof val === "string") {
      return val
    }
    const dotProp = require("dot-prop")
    let textResult = ""
    /*
    * value
    * ["1", "2"]
    * [{x: 1}]
    * {x: 1}
    * */
    let valToArr = Array.isArray(val) ? val : [val]
    valToArr.forEach((choice, index) => {
      let sln = index === 0 ? '' : ','
      if (typeof choice === "string") {
        // let isLast = index === valToArr.length - 1
        textResult += `${sln} ${choice}`
      } else if (typeof choice === "object") {
        if (Boolean(dotPropText)) {
          if (Array.isArray(dotPropText)) { // ['name', 'title']
            let text = dotPropText.map(d => {
              return dotProp.get(choice, d)
            }).join(" ")
            textResult += `${sln} ${text}`
          } else if (typeof dotPropText === "string") { // 'name'
            let text = dotProp.get(choice, dotPropText)
            textResult += `${sln} ${text}`
          }
        }else if(Boolean(itemText)) {
          let text = choice[itemText]
          textResult += `${sln} ${text}`
        }
      }
    })
    return textResult
  } catch (e) {
    throw e.message
  }
}

function getText () {

}
