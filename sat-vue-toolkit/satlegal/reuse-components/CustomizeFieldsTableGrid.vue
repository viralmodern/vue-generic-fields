<template>
  <v-card>
    <v-card-text class="head-customize pb-0 white">
      <v-text-field
        dense
        solo
        hide-details
        class="mb-2"
        v-model="searchQuery"
        clearable
        label="Search attributes"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <draggable
        class="list-group"
        tag="ul"
        v-model="fields_setting"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            class="list-group-item"
            v-for="(element, index) in fields_setting"
            :key="`${element.value}-${index}`"
          >
            <div class="d-flex align-center">
              <div class="flex-grow-1">
                <v-icon>mdi-drag</v-icon>
                <span>{{ element.text }}</span>
              </div>
              <div>
                <v-switch
                  hide-details
                  dense
                  @change="change($event, element, index)"
                  class="mt-0"
                  :ripple="false"
                  :input-value="element.active"
                ></v-switch>
              </div>
            </div>
          </li>
        </transition-group>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import draggable from "vuedraggable";
// import { mapGetters } from 'vuex'

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
export default {
  name: "CustomizeFieldsTableGrid",
  display: "Transitions",
  order: 7,
  components: {
    draggable
  },
  data() {
    return {
      list1: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,

      searchQuery: ""
    };
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    hideFieldIndex: Array,
  },
  methods: {
    change(e, item, _index) {
      // eslint-disable-next-line
      console.log("CHANGE", e, item, _index);
      let field = { ...item };
      field.active = e;
      // this.$store.dispatch("matters/updateFields", { field })
      let fields = [...this.fields];
      let index = fields.findIndex(f => f.value === field.value);
      if (index >= 0) {
        fields[index] = field;
      }
      this.$emit("resetFields", { field, fields });
      this.$emit("onClickItem", {status: e, item});
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // return this.$store.getters["matters/fields_setting"]
    fields_setting: {
      get() {
        const fields = this.fields.filter(x => !this.hideFieldIndex.includes(x.value));
        let _search = this.searchQuery || "";
        return fields.filter(field => {
          if (field) {
            return field.text.toLowerCase().includes(_search.toLowerCase());
          }
        });
      },
      set(fields) {
        // eslint-disable-next-line
        console.error("fields", fields);
        if (this.searchQuery !== "") {
          return;
        }
        try {
          this.$emit("resetFields", { fields });
        } catch (e) {
          // eslint-disable-next-line
          console.log(e.message);
        }
      }
    }
  }
};
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
  list-style: none;
  list-style-type: unset;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

ul {
  list-style: none !important;
  margin: unset !important;
  padding: unset !important;
}

.head-customize {
  position: sticky;
  top: 0;
  padding-top: 20px;
  z-index: 9;
}
</style>
