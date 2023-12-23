<template>
  <draggable
    class="list-group"
    tag="div"
    v-model="dataList"
    v-bind="dragOptions"
  >
    <v-row
      class="div-display itemStep align-center"
      v-for="(val, index) in items.steps"
      :key="index"
    >
      <v-col sm="2" class="font-weight-bold">Step {{ index + 2 }}</v-col>
      <v-col sm="5">{{ val.name }}</v-col>
      <v-col sm="1">
        <v-btn icon @click="deleteStep(items.id, val.id)">
          <v-icon>mdi-delete_outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this step?"
    />
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  data() {
    return {
      isShowPopup: false,
      itemDelete: {}
    };
  },
  components: {
    draggable,
    ConfirmItem
  },
  props: {
    items: Object
  },
  methods: {
    deleteStep(parent, childrent) {
      this.itemDelete = { parent, childrent };
      this.isShowPopup = true;
    },
    deleteConfirm() {
      this.$emit("deleteStep", this.itemDelete);
      this.isShowPopup = false;
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "list" + this.items.id,
        disabled: false,
        ghostClass: "ghost"
      };
    },
    dataList: {
      get() {
        return this.items.steps.map(x => x.id);
      },
      set(value) {
        const data = {
          parent: this.items.id,
          value: value
        };
        this.$emit("dragItem", data);
      }
    }
  }
};
</script>
<style scoped>
.itemStep {
  cursor: pointer;
}
</style>
