<template>
  <div id="list_detail">
    <div id="list">
      <div id="list-root" ref="list-root">
        <div id="viewport" ref="viewport" :style="viewportStyle">
          <div id="spacer" ref="spacer" :style="spacerStyle">
            <!--            <slot :selectedIndex="selectedIndex" :visibleItems="visibleItems">-->
            <div
              v-for="i in visibleItems"
              :key="i.id"
              class="list-item"
              :ref="i.id"
              :data-index="i.index"
              @click="select(i.index)"
              :class="i.index === selectedIndex ? 'selected' : ''"
            >
              <div>{{ i.index + ' ' + i.full_name }}</div>
            </div>
            <!--            </slot>-->
          </div>
        </div>
      </div>
    </div>
    <div id="detail">
      <div class="pa-4">
        <table class="caption">
          <tbody>
            <tr>
              <th class="caption1">Root Container Height</th>
              <td>{{ store['root-height'] }} px</td>
            </tr>
            <tr>
              <th class="caption1">Viewport Height</th>
              <td>{{ store['viewport-height'] }} px</td>
            </tr>
            <tr>
              <th class="caption1">Smallest Row Height</th>
              <td>{{ store['smallest-height'] }} px</td>
            </tr>
            <tr>
              <th class="caption1">Largest Row Height</th>
              <td>{{ store['largest-height'] }} px</td>
            </tr>
            <tr>
              <th class="caption1">Scroll Top</th>
              <td>{{ store['scroll-top'] }} px</td>
            </tr>
            <tr>
              <th class="caption1">Page Index</th>
              <td>{{ store['page-start-index'] }}</td>
            </tr>
            <tr>
              <th class="caption1">Start Index</th>
              <td>{{ store['start-index'] }}</td>
            </tr>
            <tr>
              <th class="caption1">End Index</th>
              <td>{{ store['end-index'] }}</td>
            </tr>
            <tr>
              <th class="caption1">Translate Y</th>
              <td>{{ store['translate-y'] }} px</td>
            </tr>
          </tbody>
        </table>
        <p class="caption">
          <b>Visible Item Indices on DOM</b> {{ store['visible-items'] }}
        </p>
        <p class="caption">
          <b>Total Height Till Current Page</b> {{ store['page-positions'] }}
        </p>
        <p class="caption">
          <b class="caption1">Row's Vertical Displacement From Viewport Top</b>
          {{ store['row-positions'] }}
        </p>
        <p class="caption">
          <b class="caption1">Heights</b> {{ store['heights'] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {
  PAGE_SIZE,
  EMIT_ENABLED,
  DummyDataMixin,
  SearchMixin,
  PassiveSupportMixin,
  EmitMixin,
} from '../mixins/scroll'

export default {
  name: 'InfiniteList',
  mixins: [DummyDataMixin, SearchMixin, PassiveSupportMixin, EmitMixin],
  data() {
    return {
      store: {},
      // Has the mount() been called yet atleast once?
      isMounted: false,
      // Are items currently loading as part of the infinite scroll?, handly if you got AJAX calls
      loading: false,
      // Should events corresponding to data changes be emitted from this component?
      // Disable this in production to cut emitting events
      emitEnabled: EMIT_ENABLED,
      // Index of the starting page, each page has PAGE_SIZE items
      pageStartIndex: 0,
      // Index of the first list item on DOM
      startIndex: 0,
      endIndex: PAGE_SIZE,
      // List of all the items out of which a subset will be rendered on DOM
      items: [],
      // Height of each row
      heights: [],
      // Total height per page
      // On page 0 , lets say all PAGE_SIZE rows add up to 2000
      // On page 1, lets say all PAGE_SIZE rows add up to 2500, then
      // rollingPageHeights: [2000, 4500]
      // page 1 = page 0 height of PAGE_SIZE items + page 1 height of PAGE_SIZE items
      rollingPageHeights: [],
      // Height of the smallest row
      smallestRowHeight: Number.MAX_SAFE_INTEGER,
      // Height of the largest row
      largestRowHeight: Number.MIN_SAFE_INTEGER,
      // How much to shift the spacer vertically so that the scrollbar is not disturbed when hiding items
      translateY: 0,
      // Height of the outermost div inside which all the list items are present
      rootHeight: 0,
      // Total height of all the rows of all the pages
      viewportHeight: 0,
      // Current scroll position
      scrollTop: 0,
      renderAhead: 10,

      // The id of the currently selected item, by default set to 0
      selectedIndex: 0,
    }
  },
  computed: {
    rowPositions() {
      const currentHeights = this.heights.slice(
        this.pageStartIndex * PAGE_SIZE,
        (this.pageStartIndex + 1) * PAGE_SIZE
      )
      let totalDisplacement =
        this.rollingPageHeights[this.pageStartIndex - 1] || 0
      let displacements = []
      for (let i = 0; i < currentHeights.length; i++) {
        displacements.push(totalDisplacement)
        totalDisplacement += currentHeights[i]
      }
      displacements.push(totalDisplacement)
      return displacements
    },
    /**
       Subset of list items rendered on the DOM
       */
    visibleItems() {
      return this.items.slice(this.startIndex, this.endIndex)
    },
    /**
       Translate the spacer verticaly to keep the scrollbar intact
       We only show N items at a time so the scrollbar would get affected if we dont translate
       */
    spacerStyle() {
      return {
        willChange: 'auto',
        transform: 'translateY(' + this.translateY + 'px)',
      }
    },
    /**
       Set the height of the viewport
       For a list where all items are of equal height, height of the viewport = number of items x height of each item
       For a list where all items are of different height, it is the sum of height of each row
       */
    viewportStyle() {
      return {
        height: this.viewportHeight + 'px',
        overflow: 'hidden',
        position: 'relative',
        willChange: 'auto',
      }
    },
  },
  methods: {
    async init() {
      this.isMounted = true
      // Insert the dummy data
      const insertedItems = await this.dummyData(this.items.length)
      console.error('CC_1', insertedItems)
      this.items.push(...insertedItems)
      console.error('CC_1_2')
      // Check if browser supports passive scroll and add scroll event listener
      console.error('TARGET', this.$el, this.$refs['list-root'])
      let $el = this.$refs['list-root']
      $el.addEventListener(
        'scroll',
        this.handleScroll,
        this.doesBrowserSupportPassiveScroll() ? { passive: true } : false
      )

      window.addEventListener('keydown', this.handleKeyDown)

      // After the items are added when they are rendered on DOM, update the heights and other properties
      this.$nextTick(() => {
        this.update(insertedItems)
        // this.update2();
        // Observe one or multiple elements
        this.emitEnabled && this.emit()
      })
    },
    select(itemId) {
      this.selectedIndex = itemId
      // scrollIntoViewIfNeeded(this.$el, this.childPositions[itemId]);
      // this.$el.children[item.id].scrollIntoView({ behavior: "smooth" });
    },

    scrollTo(index) {
      const pageStartIndex = Math.floor(index / PAGE_SIZE)
      let $el = this.$refs['list-root']
      const currentHeights = this.heights.slice(
        pageStartIndex * PAGE_SIZE,
        (pageStartIndex + 1) * PAGE_SIZE
      )
      let totalDisplacement = this.rollingPageHeights[pageStartIndex - 1] || 0
      let displacements = []
      for (let i = 0; i < currentHeights.length; i++) {
        displacements.push(totalDisplacement)
        totalDisplacement += currentHeights[i]
      }
      displacements.push(totalDisplacement)
      console.log(
        pageStartIndex,
        this.rollingPageHeights[pageStartIndex],
        this.heights.slice(
          pageStartIndex * PAGE_SIZE,
          (pageStartIndex + 1) * PAGE_SIZE
        ),
        displacements[index]
      )
      const top = displacements[index % PAGE_SIZE]
      const isVisible =
        top >= this.scrollTop && top <= this.scrollTop + $el.offsetHeight
      if (!isVisible) {
        $el.scrollTo({
          left: 0,
          top: displacements[index % PAGE_SIZE],
          behavior: 'smooth',
        })
      }
    },

    handleKeyDown(event) {
      switch (event.keyCode) {
        // In case of left arrow key move to the last item
        case 37:
          if (this.selectedIndex > 0) {
            this.select(this.selectedIndex - 1)
            this.scrollTo(this.selectedIndex)
          }
          // Prevent the default scroll event from firing
          event.preventDefault()
          break
        // In case of up arrow key, move to the last item
        case 38:
          if (this.selectedIndex > 0) {
            this.select(this.selectedIndex - 1)
            this.scrollTo(this.selectedIndex)
          }
          event.preventDefault()
          break
        // In case of right arrow key, move to the next item
        case 39:
          if (this.selectedIndex < this.items.length - 1) {
            this.select(this.selectedIndex + 1)
            this.scrollTo(this.selectedIndex)
          }
          event.preventDefault()
          break
        // In case of down arrow key, move to the next item
        case 40:
          if (this.selectedIndex < this.items.length - 1) {
            this.select(this.selectedIndex + 1)
            this.scrollTo(this.selectedIndex)
          }
          event.preventDefault()
          break
      }
    },

    update(insertedItems) {
      for (let i = 0; i < insertedItems.length; i++) {
        // Get the id and index of the inserted items from the array
        const { id, index } = insertedItems[i]
        // Check if the id has been rendered on DOM and is available
        if (this.$refs[id] && this.$refs[id][0]) {
          // Get the scroll height and update the height of the item at index
          const height = this.$refs[id][0].scrollHeight
          this.heights[index] = height
          // Update the largest and smallest row heights
          this.largestRowHeight =
            height > this.largestRowHeight ? height : this.largestRowHeight
          this.smallestRowHeight =
            height < this.smallestRowHeight ? height : this.smallestRowHeight
          // Given an item index, compute the page index
          // For example, any item index from 0 to 40 would translate to page index 0
          // Any item with index 50 to 99 would translate to page index 1
          const pageIndex = Math.floor(index / PAGE_SIZE)
          if (pageIndex === 0) {
            if (!this.rollingPageHeights[pageIndex]) {
              this.rollingPageHeights[pageIndex] = 0
            }
          } else {
            if (!this.rollingPageHeights[pageIndex]) {
              this.rollingPageHeights[pageIndex] = this.rollingPageHeights[
                pageIndex - 1
              ]
            }
          }
          //Add the height of the row to the total height of all rows on the current page
          this.rollingPageHeights[pageIndex] += height
        }
        // else {
        //   console.log(id, "was not found");
        // }
      }
      let $el = this.$refs['list-root']
      this.rootHeight = $el.offsetHeight
      // Total height of the viewport is the sum of heights of all the rows on all the pages currently stored at the last index of page positions
      // For our example with page 0 of 2000px and page 1 of 2500px, the rollingPageHeights array looks like [2000, 4500]
      // Viewport height = 4500px
      this.viewportHeight = this.rollingPageHeights[
        this.rollingPageHeights.length - 1
      ]
    },

    handleScroll: throttle(function () {
      let $el = this.$refs['list-root']
      const { scrollTop, offsetHeight, scrollHeight } = $el
      this.scrollTop = scrollTop
      this.emitEnabled && this.emit()
      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        this.loadMore()
      }
    }, 17),
    loadMore() {
      // Mark the loading status
      this.loading = true
      setTimeout(async () => {
        // Add more dummy data
        const insertedItems = await this.dummyData(this.items.length)
        console.error('CC_2', insertedItems)
        this.items.push(...insertedItems)
        // Very important to update the end index here to be the page size at this stage
        // If you are on page 0 with 50 items and loaded 50 more items, endIndex is set to 100
        // Without this step, the 50 new items on DOM are not rendered and therefore we dont get their heights

        // REMOVING this LINE will CRASH THE ENTIRE COMPONENT
        // If you have a better idea, you better comment :)
        this.endIndex =
          Math.floor(this.items[this.items.length - 1].index / PAGE_SIZE) *
            PAGE_SIZE +
          PAGE_SIZE
        this.$nextTick(() => {
          // Update the heights for the newly inserted rows
          this.update(insertedItems)
          // this.update2();
          this.emitEnabled && this.emit()
          this.loading = false
        })
      }, 1)
    },
    initBus() {
      let _self = this
      for (let event of [
        'scroll-top',
        'viewport-height',
        'heights',
        'page-positions',
        'translate-y',
        'page-start-index',
        'start-index',
        'end-index',
        'smallest-height',
        'largest-height',
        'root-height',
        'row-positions',
        'visible-items',
      ]) {
        this.$eventHub.$on(event, (value) => {
          _self.$set(_self.store, event, value)
        })
      }
    },
    getComputedItem(row) {
      // :key="i.id"
      // class="list-item"
      // :ref="i.id"
      // :data-index="i.index"
      // @click="select(i.index)"
      // :class="i.index === selectedIndex ? 'selected' : ''"
      let { id, index } = row
      let { selectedIndex } = this
      try {
        return {
          key: id,
          class: {
            'list-item': true,
            selected: index === selectedIndex,
          },
          ref: id,
          dataIndex: index,
        }
      } catch (e) {
        return {}
      }
    },
  },
  watch: {
    scrollTop(newValue, oldValue) {
      this.pageStartIndex = this.binarySearch(
        this.rollingPageHeights,
        this.scrollTop
      )

      const startNodeIndex = Math.max(
        0,
        this.findStartNode(
          this.scrollTop,
          this.rowPositions,
          this.rowPositions.length
        )
      )
      this.startIndex = this.pageStartIndex * PAGE_SIZE + startNodeIndex

      this.endIndex =
        this.startIndex + Math.floor(this.rootHeight / this.smallestRowHeight)

      this.translateY = this.rowPositions[startNodeIndex]
    },
  },
  mounted() {
    this.init()
    this.initBus()
    // https://stackoverflow.com/questions/641857/javascript-window-resize-event/641874#641874
    var ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect
        console.log('Element:', entry.target, cr)
        this.rootHeight = cr.height
        this.emitEnabled && this.emit()
        //         const children = this.$refs.spacer.children;

        //         for (let i = 0; i < children.length; i++) {
        //           const { id, scrollHeight } = children[i];
        //           const index = children[i].getAttribute("data-index");
        //           console.log(index, scrollHeight, this.heights[index]);
        //         }
      }
    })
    let $el = this.$refs['list-root']
    ro.observe($el)
  },
  beforeDestroy() {
    let $el = this.$refs['list-root']
    $el.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('keydown', this.handleKeyDown)
    this.isMounted = false
  },
}
</script>
<style scoped lang="scss">
@import '../infinite';
</style>
