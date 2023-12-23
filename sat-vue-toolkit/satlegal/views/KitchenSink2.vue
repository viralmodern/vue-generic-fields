<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div>
        <MovedItemOfList
          :list="list"
          name="text"
          titleLeft="Available"
          titleRight="Selected"
          classLeft="sm5"
          classCenter="sm1"
          classRight="sm5"
          @choseItem="choseItem"
          @moveRight="moveRight"
          @moveAllRight="moveAllRight"
          @moveLeft="moveLeft"
          @moveAllLeft="moveAllLeft"
          @dragItem="dragItem"
        />
      </div>
      <div style="width:40%">
        <ProgressMultiColor
          :list="progressList"
          keyProgress="progress"
          keyColor="color"
        />
      </div>
    </v-col>
    <div>
      <DynamicForm
        :fieldList.sync="dynamicFormFieldList"
        @update:fieldList="formChange"
      />
    </div>
  </v-row>
</template>

<script>
import MovedItemOfList from "../ht_components/list/MovedItemOfList";
import ProgressMultiColor from "../ht_components/progress-bars/ProgressMultiColor";
import DynamicForm from "../ht_components/dynamic-form/form";
import { dynamicFormParser } from "../utils";
export default {
  components: {
    MovedItemOfList,
    ProgressMultiColor,
    DynamicForm
  },
  data() {
    return {
      list: [
        {
          id: Math.random(),
          text: "Optimize performance",
          selected: false
        },
        {
          id: Math.random(),
          text: "Authentication modules",
          selected: false
        },
        {
          id: Math.random(),
          text: "Video supporting",
          selected: false
        },
        {
          id: Math.random(),
          text: "Rebuild database",
          selected: false
        },
        {
          id: Math.random(),
          text: "Optimize performance 2",
          selected: false
        },
        {
          id: Math.random(),
          text: "Authentication modules 2",
          selected: false
        },
        {
          id: Math.random(),
          text: "Rebuild database 2",
          selected: false
        }
      ],
      id: null,
      progressList: [
        {
          id: Math.random(),
          progress: 20,
          color: "#3f51b5"
        },
        {
          id: Math.random(),
          progress: 10,
          color: "#f44336"
        },
        {
          id: Math.random(),
          progress: 30,
          color: "#9c27b0"
        },
        {
          id: Math.random(),
          progress: 5,
          color: "#4caf50"
        }
      ],
      dynamicFormFieldList: []
    };
  },
  methods: {
    choseItem(id) {
      this.id = id;
    },
    moveRight() {
      const result = this.list.find(x => x.id === this.id);
      if (result) {
        result.selected = true;
      }
    },
    moveAllRight() {
      this.list = this.list.map(x => ({ ...x, selected: true }));
    },
    moveLeft() {
      const result = this.list.find(x => x.id === this.id);
      if (result) {
        result.selected = false;
      }
    },
    moveAllLeft() {
      this.list = this.list.map(x => ({ ...x, selected: false }));
    },
    dragItem({ title, value }) {
      if (title === "Selected") {
        value.forEach(id => (this.list.find(x => x.id === id).selected = true));
      }
      if (title === "Available") {
        value.forEach(
          id => (this.list.find(x => x.id === id).selected = false)
        );
      }
      this.list.sort((a, b) => value.indexOf(a.id) - value.indexOf(b.id));
    },
    formChange(f) {
      // eslint-disable-next-line
      console.log(dynamicFormParser(f));
    }
  }
};
</script>
