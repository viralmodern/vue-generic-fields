<template>
  <v-data-table
    :headers="headers"
    calculate-widths
    :fixed-header="fixedHeader"
    :hide-default-footer="hideDefaultFooter"
    :hide-default-header="hideDefaultHeader"
    :server-items-length="list.length"
    :items="list"
    :search="search"
    :loading="loading"
    class="elevation-1 table-grid"
    style="border-width: 1px; border-style: solid; border-color: #D6D7D9;"
  >
    <template v-slot:header="{ props: { headers } }">
      <tr v-if="hideDefaultHeader">
        <th
          @click="$emit('click-header', header['value'])"
          v-for="(header, index1) in headers"
          :key="index1"
          :class="`${index1 === 0 ? 'sticky_col' : ''} ${index1 + 1 === headers.length ? 'th-2' : 'th-1' } text-no-wrap cusor--pointer`"
          :colspan="header.colspan"
          :rowspan="header.rowspan"
        >
          <div class="d-flex align-center justify-center">
            <v-btn
              v-if="index1 === 0"
              small
              text
              icon
              style="cursor: move; opacity: 0"
              class="drag-hander"
            >
              <v-icon>mdi-drag</v-icon>
            </v-btn>
            <slot :name="'header.' + header['value']">{{ header["text"] }}</slot>
          </div>
        </th>
      </tr>
      <slot name="headerStack"></slot>
    </template>
    <template v-slot:body="{ items }">
      <draggable v-model="list" handle=".drag-hander" tag="tbody">
        <slot name="customBody" :props="{items}" />
      </draggable>
      <slot name="foot-rows"></slot>
    </template>
  </v-data-table>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TableGrid",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      internalValue: this.desserts
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    desserts: {
      type: Array,
      default: () => []
    },
    hideDefaultFooter: {
      type: Boolean
    },
    fixedHeader: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },

    hideDefaultHeader: {
      type: Boolean
    },
    search: {
      type: String,
      default: ""
    },
    bookmark: {
      type: Boolean,
      default: true
    },
    showExpand: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: String,
      default: "name"
    }
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    list: {
      get() {
        return this.desserts;
        // return this.internalValue
      },
      set(value) {
        this.internalValue = value;
        this.$emit("change", value);
      }
    }
  },
  methods: {
    updateFields({ fields }) {
      this.$emit("resetFields", { fields });
    },
    resetFields({ fields }) {
      // eslint-disable-next-line
      console.log("resetFields", arguments);
      this.$emit("resetFields", { fields });
    }
  }
};
</script>

<style scoped lang="scss">
.table-grid > thead tr th {
  /*border: solid 1px red !important;*/
  white-space: nowrap;
}

.table-grid > tr td {
  border-bottom: none;
}

.theme--light.v-data-table.table-grid
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

.table-grid tbody tr:nth-child(even) {
  background: hsla(0, 0%, 100%, 0.1);

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: hsla(0, 0%, 100%, 1);
  }
}

.table-grid tbody tr:nth-child(odd) {
  background: #f4f5f7;

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: #f4f5f7;
  }
}

.th-1 {
  border-bottom-style: solid;
  border-bottom-color: #D6D7D9;
  border-bottom-width: 1px;
  border-right-style: solid;
  border-right-color: #D6D7D9;
  border-right-width: 1px;
}
.th-2 {
  border-bottom-style: solid;
  border-bottom-color: #D6D7D9;
  border-bottom-width: 1px;
}

.sticky_col {
  position: sticky;
  left: 0;
  z-index: 3;
  background: hsla(0, 0%, 100%, 1);
}

.drag-hander {
  transform: translateX(-10px);
}
</style>
