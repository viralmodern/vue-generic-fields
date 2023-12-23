import dotProp from "dot-prop"

export default {
  computed: {
    convertValToValuesObject () {
      try {
        let {val} = this
        let {itemValue, returnObject, items} = this.$$attribute
        // todo return object value
        if (returnObject) {
          return val
        }
        if([null, undefined, '', NaN].includes(val)) {
          return []
        }
        // console.error(val, items, returnObject)

        let value = Array.isArray(val) ? val : [val]
        // todo return flat value
        return value.map(v => {
          // todo if typeof v is object
          let isObject = typeof v === "object", item
          if (isObject) {
            item = items.filter(t => t[itemValue] == v[itemValue])[0]
            // console.error('item_1', item)
            item = item && item || {...v} // todo if item are undefined
          } else {
            item = items.filter(t => t[itemValue] == v)[0]
            // console.error('item_2', item)
            item = item && item || v // todo if item are undefined
          }
          return item
        })

      }catch (e) {
        if(e instanceof RangeError) {
          console.log('LIST',e.message, this.val)
        }
        console.log('LIST',e.message, this.val)
        return {}
      }
    },
    isAvatar() {
      let {itemAvatar, itemFavicon } = this.$$attribute
      return itemAvatar || itemFavicon
    }
  },
  methods: {
    colorValue (item) {
      let {itemColor} = this.$$attribute
      if (itemColor) {
        return `#${item[itemColor]}`
      }
      return ""
    },
    avatarValue (item) {
      try {
        let urlAvatar = false
        let {itemAvatar, itemFavicon} = this.$$attribute
        if(item['avatar']) {
          urlAvatar = dotProp.get(item, 'avatar')
        }else if(itemAvatar) {
          urlAvatar = `${dotProp.get(item, itemAvatar)}`
        } else if(itemFavicon) {
          urlAvatar = dotProp.get(item, itemFavicon)
          if(Boolean(urlAvatar)) {
            urlAvatar = `https://www.google.com/s2/favicons?domain_url=${urlAvatar}`
          }
        }
        return urlAvatar
      } catch (e) {
        return false
      }
    },
    textValue (item) {
      let {dotPropText, itemText} = this.$$attribute
      if(dotPropText && Array.isArray(dotPropText)) { // [ "name.first", "name.last" ]
        return dotPropText.map(d => {
          return `${dotProp.get(item, d)}`
        }).join(' ')
      }
      return item[itemText]
    },

  },
}
