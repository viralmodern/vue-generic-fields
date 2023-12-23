<template>
  <v-card>
    <v-row class="justify-space-between">
      <v-col cols="11">
        <v-row class="pa-3">
          <v-col sm="3" class="mt-3 subheading font-weight-bold">{{
            item.name
          }}</v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="12">
                <v-row row class="div-display my-2 align-center">
                  <v-col sm="2" class="font-weight-bold">Step 1</v-col>
                  <v-col sm="5">Initiate</v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <DropDrawWorkFlow
                  @dragItem="dragItem"
                  :items="item"
                  @deleteStep="deleteStep"
                />
              </v-col>
              <v-col cols="12">
                <v-row class="div-display my-2 align-center">
                  <v-col sm="2" class="font-weight-bold"
                    >Step {{ item.steps.length + 2 }}</v-col
                  >
                  <v-col sm="5">Done</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1">
        <v-row class="pr-2 pt-2 justify-end">
          <v-menu bottom left>
            <v-btn class="ma-0" v-slot:activator="{ on }" icon offset-x>
              <v-icon v-on="on" class="text--secondary">mdi-more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item @click="editItemStep">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="isShowPopup = true">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="deleteConfirm"
        @cancel="isShowPopup = false"
        messageConfirm="Are you sure you want to delete this procedure?"
      />
    </v-row>
  </v-card>
</template>
<script>
import DropDrawWorkFlow from "./DropDrawWorkFlow";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  components: {
    DropDrawWorkFlow,
    ConfirmItem
  },
  methods: {
    editItemStep() {
      this.$emit("editItemStep", this.item);
    },
    deleteConfirm() {
      this.$emit("removeWorkFlow", this.item);
      this.isShowPopup = false;
    },
    dragItem(data) {
      this.$emit("dragItem", data);
    },
    deleteStep(data) {
      this.$emit("deleteStep", data);
    }
  }
};
</script>
<style scoped>
.itemStep {
  cursor: pointer;
}
</style>
