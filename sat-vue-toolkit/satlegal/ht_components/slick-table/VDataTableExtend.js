import { VDataTable } from "vuetify/lib/components/VDataTable";
import VCheckbox from "vuetify/lib/components/VCheckbox";
export default {
  extends: VDataTable,
  data() {
    return {
      drag: false
    }
  },
  methods: {
    genTHead() {
      if (this.hideHeaders) return // Exit Early since no headers are needed.

      let children = []

      if (this.$scopedSlots.headers) {
        const row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.everyItem
        })

        children = [this.hasTag(row, 'th') ? this.genTR(row) : row]
      } else {
        const row = this.headers.map((o, i) => this.genHeader(o, this.headerKey ? o[this.headerKey] : i))
        const checkbox = this.$createElement(VCheckbox, {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true ? '' : this.selectAll,
            hideDetails: true,
            inputValue: this.everyItem,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        })

        this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]))

        children = [this.genTR(row)]
      }

      if (this.$scopedSlots.filterRow) {
        const row = this.$scopedSlots.filterRow({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.everyItem
        })

        children.push(this.hasTag(row, 'th') ? this.genTR(row) : row)
      }
      children.push(this.genTProgress());

      return this.$createElement('thead', [children])
    },
    genTBody() {
      const children = this.genItems();
      let tbody;
      const attrs = {
        id: this.idGroup,
        group: JSON.stringify(this.group)
      }
      if (!this.itemsLength && !this.items.length || !this.filteredItems.length) {
        tbody = this.$createElement('tbody', { attrs }, children);
      } else {
        tbody = this.$createElement('transition-group', {
          props: {
            tag: 'tbody',
            name: this.dragging ? 'flip-list' : null
          },
          attrs
        }, children)
      }
      return tbody;
    },
  },
  props: {
    dragging: {
      type: Boolean,
      default: false
    },
    idGroup: [Number,String],
    group: Object
  }
};
