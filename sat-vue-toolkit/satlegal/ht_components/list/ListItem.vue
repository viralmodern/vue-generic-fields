<template>
  <div style="border: 1px solid #c5c5c538">
    <div class="grey lighten-3 py-2" style="text-align:center;font-size: 18px">{{title}}</div>
    <div class="list-content">
      <draggable class="list-group" tag="div" v-model="dataList" v-bind="dragOptions">
        <v-list-item
          v-for="item in list"
          :key="item.id"
          :class="[active === item.id ? 'active' : '', 'item' ]"
          @click="choseItem(item.id)"
        >{{item[name]}}</v-list-item>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  props: {
    title: String,
    list: Array,
    name: String,
    modeActive: String
  },
  data() {
    return {
      active: null
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "list",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    dataList: {
      get() {
        return this.list.map(x => x.id);
      },
      set(value) {
        this.$emit('dragItem', value)
      }
    }
  },
  methods: {
    choseItem(id) {
      this.active = id;
      this.$emit("choseItem", id);
    }
  },
  watch: {
    modeActive(mode) {
      if (this.modeActive && mode !== this.title) {
        this.active = null;
      }
    }
  }
};
</script>

<style scoped>
.list-group {
  min-height: 100%;
}
.list-content {
  text-align: center;
  overflow: auto;
  height: 200px;
}
.item /deep/ .v-list__tile {
  padding: unset;
  justify-content: center;
}
.item:hover {
  background: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.active {
  color: #6d42c7;
}
</style>
