import faker from 'faker'

// export const PAGE_SIZE = 20
// export const PAGE_SIZE = 425 // todo all courts
export const PAGE_SIZE = 425 // todo all courts
export const EMIT_ENABLED = false
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-ii-3j86
// define a mixin object to check if the browser supports the option passive that can be used while dealing with scroll events
export const PassiveSupportMixin = {
  methods: {
    // This snippet is taken straight from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // It will only work on browser so if you are using in an SSR environment, keep your eyes open
    doesBrowserSupportPassiveScroll() {
      let passiveSupported = false

      try {
        const options = {
          get passive() {
            // This function will be called when the browser
            //   attempts to access the passive property.
            passiveSupported = true
            return false
          },
        }

        window.addEventListener('test', null, options)
        window.removeEventListener('test', null, options)
      } catch (err) {
        passiveSupported = false
      }
      return passiveSupported
    },
  },
}

/**
 No need for this in production, just remove the mixin from the component
 */
export const EmitMixin = {
  methods: {
    emit() {
      let bus = this.$eventHub
      this.$eventHub.$emit('scroll-top', this.scrollTop)
      this.$eventHub.$emit('viewport-height', this.viewportHeight)
      this.$eventHub.$emit('heights', this.heights)
      this.$eventHub.$emit('page-positions', this.rollingPageHeights)
      this.$eventHub.$emit('translate-y', this.translateY)
      this.$eventHub.$emit('page-start-index', this.pageStartIndex)
      this.$eventHub.$emit('start-index', this.startIndex)
      this.$eventHub.$emit('end-index', this.endIndex)
      this.$eventHub.$emit('smallest-height', this.smallestRowHeight)
      this.$eventHub.$emit('largest-height', this.largestRowHeight)
      this.$eventHub.$emit('root-height', this.rootHeight)
      this.$eventHub.$emit('row-positions', this.rowPositions)
      this.$eventHub.$emit(
        'visible-items',
        this.visibleItems.map((item) => item.index)
      )
    },
  },
}

export const SearchMixin = {
  methods: {
    binarySearch(arr, x) {
      let low = 0
      let high = Array.isArray(arr)
        ? arr.length - 1
        : Object.keys(arr).length - 1
      let mid
      while (low < high) {
        mid = Math.floor((high + low) / 2)
        // Check if x is present at middle position
        if (arr[mid] == x) {
          break
        } else if (arr[mid] > x) {
          high = mid - 1
        } else {
          low = mid + 1
        }
      }
      mid = Math.floor((high + low) / 2)
      if (x <= arr[mid]) {
        return mid
      } else {
        return mid + 1
      }
    },
    /**
     Given a scroll top value, the map containing id of the each row as key and its vertical position from the top of the viewport in px and the number of total number of items available, find the index of the first node that is just above the current scroll top value or in simple words, find the index of the item that is just not seen by the user and is above the current scroll bar position
     */
    findStartNode(scrollTop, nodePositions, itemCount) {
      let startRange = 0
      let endRange = itemCount - 1
      while (endRange !== startRange) {
        const middle = Math.floor((endRange - startRange) / 2 + startRange)
        if (
          nodePositions[middle] <= scrollTop &&
          nodePositions[middle + 1] > scrollTop
        ) {
          return middle
        }
        if (middle === startRange) {
          // edge case - start and end range are consecutive
          return endRange
        } else {
          if (nodePositions[middle] <= scrollTop) {
            startRange = middle
          } else {
            endRange = middle
          }
        }
      }
      return itemCount
    },
  },
}

export const DummyDataMixin = {
  data() {
    return {
      minWordCount: 3,
      maxWordCount: 50,
    }
  },
  methods: {
    async dummyData(currentLength) {
      let endPoint = `/api/courts/`
      let res = await this.$api.get(endPoint)
      let courts = res['data']
      const items = []
      /*const length = PAGE_SIZE
      for (let i = 0; i < length; i++) {
        const wordCount =
          this.minWordCount +
          Math.floor(Math.random() * (this.maxWordCount - this.minWordCount))
        // For each item we take a UUID, an index and a value
        // UUID clashes here will be bad
        items.push({
          id: faker.random.uuid(),
          index: currentLength + i,
          value: "Item " + faker.random.words(wordCount)
        })
      }
      return items*/
      let { minWordCount, maxWordCount } = this
      // let pageSize = courts.length
      let pageSize = PAGE_SIZE
      for (let i = 0; i < pageSize; i++) {
        let court = courts[i] || {}
        const wordCount =
          minWordCount +
          Math.floor(Math.random() * (maxWordCount - minWordCount))
        let id = faker.random.uuid()
        let index = currentLength + i
        let value = `Item ${faker.random.words(wordCount)}`
        let t = { ...court, id, index, value }
        items.push(t)
      }
      return Promise.resolve(items)
    },
  },
}
