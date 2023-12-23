<template>
  <v-row no-gutters class="pa-2 row justify-space-between align-center">
    <v-col cols="5">
      <div class="white">
        <ListItem
          :title="titleLeft"
          :list="listAvilable"
          :name="name"
          :modeActive="modeActive"
          @choseItem="
            modeActive = titleLeft;
            $emit('choseItem', $event);
          "
          @dragItem="$emit('dragItem', { title: titleLeft, value: $event })"
        />
      </div>
    </v-col>
    <v-col text-sm-center cols="2">
      <ListBtnMove
        @moveRight="$emit('moveRight')"
        @moveAllRight="$emit('moveAllRight')"
        @moveLeft="$emit('moveLeft')"
        @moveAllLeft="$emit('moveAllLeft')"
      />
    </v-col>
    <v-col cols="5">
      <div class="white">
        <ListItem
          :title="titleRight"
          :list="listSelected"
          :name="name"
          :modeActive="modeActive"
          @choseItem="
            modeActive = titleRight;
            $emit('choseItem', $event);
          "
          @dragItem="$emit('dragItem', { title: titleRight, value: $event })"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ListItem from "./ListItem";
import ListBtnMove from "./ListBtnMove";
export default {
  components: {
    ListItem,
    ListBtnMove
  },
  props: {
    list: Array,
    name: String,
    classLeft: String,
    classCenter: String,
    classRight: String,
    titleLeft: String,
    titleRight: String
  },
  computed: {
    listAvilable() {
      return this.list.filter(x => !x.selected);
    },
    listSelected() {
      return this.list.filter(x => x.selected);
    }
  },
  data() {
    return {
      modeActive: this.titleLeft
    };
  }
};
</script>
