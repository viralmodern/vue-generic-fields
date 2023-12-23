<template>
  <v-card>
    <v-card-text>
      <div class="title mb-3">Matter Procedures</div>
      <v-btn
        fab
        dark
        color="primary addWorkFlow"
        @click="isShowFormWorkFlowCreate = true"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
      <FormWorkFlow
        :isShow="isShowFormWorkFlowCreate"
        @closeModal="isShowFormWorkFlowCreate = false"
        @addWorkFlow="addWorkFlow"
      />
      <v-col
        v-for="(val, index) in dataWorkFlow"
        :key="index"
        class="my-2"
      >
        <ItemWorkFlow
          :item="val"
          @deleteStep="deleteStep"
          @editItemStep="editItemStep"
          @removeWorkFlow="removeWorkFlow"
          @dragItem="dragItem"
        />
      </v-col>
      <FormWorkFlow
        v-if="itemEdit"
        :isShow="isShowFormWorkFlowEdit"
        @closeModal="isShowFormWorkFlowEdit = false"
        :item="itemEdit"
        @editWorkFlow="editWorkFlowStep"
      />
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :right="true"
        :bottom="true"
        >{{ message }}</v-snackbar
      >
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ItemWorkFlow from "../cards/ItemWorkFlow";
import FormWorkFlow from "./FormWorkFlow";
export default {
  data() {
    return {
      isShowFormWorkFlowCreate: false,
      isShowFormWorkFlowEdit: false,
      itemEdit: {},
      snackbar: false,
      message: ""
    };
  },
  components: {
    ItemWorkFlow,
    FormWorkFlow
  },
  methods: {
    ...mapActions("ht_store/adminSetting/workFlow", ["getDataWorkFlowRequest"]),
    ...mapMutations("ht_store/adminSetting/workFlow", [
      "deleteStepByParent",
      "addWorkFlowStep",
      "editWorkFlowStep",
      "deleteWorkFlow",
      "sortStepWorkFlow"
    ]),
    dragItem(data) {
      this.sortStepWorkFlow(data);
    },
    deleteStep(data) {
      this.deleteStepByParent(data);
    },
    addWorkFlow(data) {
      this.addWorkFlowStep(data);
      this.snackbar = true;
      this.message = "Create success!";
    },
    editItemStep(e) {
      this.itemEdit = e;
      this.isShowFormWorkFlowEdit = true;
    },
    editWorkFlow(e) {
      this.editWorkFlowStep(e);
    },
    removeWorkFlow(e) {
      this.deleteWorkFlow(e);
    }
  },
  computed: {
    ...mapGetters("ht_store/adminSetting/workFlow", ["dataWorkFlow"])
  },
  mounted() {
    this.getDataWorkFlowRequest();
  }
};
</script>
<style scoped>
.addWorkFlow {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
