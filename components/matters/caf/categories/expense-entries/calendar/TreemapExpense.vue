<template>
  <div>
    <!--<svg :width="width" :height="height">
      <g v-for="rectangle in rectangles" fill="grey">
        <rect
          :x="rectangle[0]"
          :y="rectangle[1]"
          :width="rectangle[2]"
          :height="rectangle[3]"
          style="stroke-width:1;stroke:white"
        />
        <text
          :x="rectangle[0] + rectangle[2] / 2"
          :y="rectangle[1] + rectangle[3] / 2"
          fill="white"
        >
          {{ getLabel(rectangle) }}
        </text>
      </g>
      Sorry, your browser does not support inline SVG.
    </svg>-->
  </div>
</template>

<script>
export default {
  name: 'TreemapExpense',
  components: {},
  data() {
    return {
      items: {
        name: 'Expenses',
        children: [
          {
            name: 'Condo',
            category: 'Expenses',
            value: '20338986'
          },
          {
            name: 'Condo fees 1',
            category: 'Product Design',
            value: '13285226'
          },
          {
            name: 'Condo fees 2',
            category: 'Expenses',
            value: '12779843'
          },
          {
            name: 'Pebble: E-Paper Watch for iPhone and Android',
            category: 'Product Design',
            value: '10266845'
          },
          {
            name: "The World's Best TRAVEL JACKET with 15 Features || BAUBAX",
            category: 'Product Design',
            value: '9192055'
          },
          {
            name: 'The Everyday Backpack, Tote, and Sling',
            category: 'Product Design',
            value: '6565782'
          },
          {
            name: 'Floating Vertical Turntable',
            category: 'Product Design',
            value: '1575976'
          }
        ],
        rectangles: [6, 6, 4, 3, 2, 1]
      }
    }
  },
  mounted() {},
  methods: {
    /*layoutLastRow() {},
    squarify(children, row, width) {
      if (children.length === 1) {
        this.layoutLastRow(row, children, width)
        return
      }

      const rowWithChild = [...row, children[0]]

      if (row.length === 0 || worst(row, width) >= worst(rowWithChild, width)) {
        children.shift()
        this.squarify(children, rowWithChild, width)
      } else {
        layoutRow(row, width)
        this.squarify(children, [], this.getMinWidth().width)
      }
    }*/
  }
}
</script>

<style scoped></style>
