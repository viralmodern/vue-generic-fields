<template>
  <v-container>
    <div class="box-red">
      <v-btn @click="loadMore">Load more</v-btn>
      <div id="scrollableContainer">
        <div>
          <div id="container-rows"></div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import VirtualScroller from 'virtual-scroller/dom'
import Vue from 'vue'
import Temp from '~/features/odt/Temp'

async function fetchMessages() {
  try {
    let url = 'http://two.legal/api/jurisdictions/?ungroup=true'
    let a = await fetch(url)
    let b = await a.json()
    // let groups = Object.keys(b)
    console.error('RESULT', b)
    let results = b['results']
    // groups.forEach((group) => (results = [...results, ...b[group]['results']]))
    return Promise.resolve([
      ...results,
      ...results,
      ...results,
      ...results,
      ...results,
    ])
  } catch (e) {
    return Promise.resolve(false)
  }
}

window.VirtualScrollerDebug = false

async function initScroll() {
  let rows = await fetchMessages()
  if (!rows) return
  const container = document.getElementById('container-rows')
  function renderRow(i) {
    console.log('renderRow', arguments)
    return new Vue({
      render(createElement) {
        return createElement(Temp, { props: { item: i } })
      },
    }).$mount().$el
  }
  function onStateChange(newState, prevState) {
    console.log(newState)
    const {
      items,
      beforeItemsHeight,
      afterItemsHeight,
      firstShownItemIndex,
      lastShownItemIndex,
    } = newState
    // Set `paddingTop` and `paddingBottom` on the container element:
    // it emulates the non-visible items as if they were rendered.
    container.style.paddingTop = Math.round(beforeItemsHeight) + 'px'
    container.style.paddingBottom = Math.round(afterItemsHeight) + 'px'
    // Perform an intelligent "diff" re-render as the user scrolls the page.
    // This also requires that the list of `items` hasn't been changed.
    // On initial render, `prevState` is `undefined`.
    if (prevState && items === prevState.items) {
      // Remove no longer visible items.
      let i = prevState.lastShownItemIndex
      while (i >= prevState.firstShownItemIndex) {
        if (i >= firstShownItemIndex && i <= lastShownItemIndex) {
          // The item is still visible.
        } else {
          // The item is no longer visible. Remove it.
          container.removeChild(
            container.childNodes[i - prevState.firstShownItemIndex]
          )
        }
        i--
      }
      // Add newly visible items.
      let prependBefore = container.firstChild
      i = firstShownItemIndex
      while (i <= lastShownItemIndex) {
        if (
          i >= prevState.firstShownItemIndex &&
          i <= prevState.lastShownItemIndex
        ) {
          // The item is already being rendered.
          // Next items will be appended rather than prepended.
          prependBefore = undefined
        } else {
          if (prependBefore) {
            container.insertBefore(renderRow(items[i]), prependBefore)
          } else {
            container.appendChild(renderRow(items[i]))
          }
        }
        i++
      }
    } else {
      // Re-render the list from scratch.
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      let i = firstShownItemIndex
      while (i <= lastShownItemIndex) {
        container.appendChild(renderRow(items[i]))
        i++
      }
    }
  }
  function getScrollableContainer() {
    return document.getElementById('scrollableContainer')
  }
  let options = {
    getScrollableContainer,
  }

  let virtualScroller = new VirtualScroller(container, rows, renderRow, options)
  virtualScroller.virtualScroller.onStateChange = onStateChange
  console.log('virtualScroller', virtualScroller)
}
const functional = true
export default {
  name: 'datatable',
  components: { Temp },
  data() {
    return {
      rows: [],
    }
  },
  mounted() {
    initScroll()
  },
  methods: {
    loadMore() {},
    renderTemp() {
      console.log(this)
      /*return(
        <Temp item={{pk: 1, description: 'xxx'}}>
          <span>Hello</span> world!
        </Temp>
      )*/
    },
  },
  /*render (createElement, context) {
    return(
      <Temp item={{pk: 1, description: 'xxx'}}>
        <span>Hello</span> world!
      </Temp>
    )
  }*/
}
</script>

<style lang="scss">
.box-red {
  border: solid 1px rgba(0, 0, 0, 0.05);
}
#scrollableContainer {
  .tr {
    background: #fff;
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  }
  .th,
  .td {
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
}
</style>
<style scoped lang="scss">
#scrollableContainer {
  height: 80vh;
  overflow: auto;
}
</style>
