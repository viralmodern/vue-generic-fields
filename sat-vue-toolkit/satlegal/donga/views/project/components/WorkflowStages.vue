<template>
  <div>
    <v-timeline align-top dense v-if="WF">
      <draggable
        v-model="workflow"
        :options="{ handle: '.myHandle' }"
        @end="onEndDraggable"
        :move="onMove"
      >
        <transition-group>
          <v-card
            v-for="(item, idx) in workflow"
            :key="item.pk"
            color="rgba(0,0,0,0)"
            class="_move brb-1"
            :class="orderDefault(idx) ? '_disabled' : 'myHandle'"
          >
            <v-timeline-item
              :color="item.pk === 'new' ? '#' + color : '#' + item.color"
              small
              class="py-0"
            >
              <v-row
                no-gutters
                class="align-center"
                v-if="item.pk !== 'new'"
                py-2
              >
                <v-col cols="5">
                  {{ item.stage_name }}
                  <v-chip
                    v-if="orderDefault(idx)"
                    class="white--text"
                    color="#999"
                    label
                    small
                  >
                    Default
                  </v-chip>
                </v-col>
                <v-col v-if="orderDefault(idx)" class="layout justify-end">
                  <StageMenuControl>
                    <v-list>
                      <v-list-item @click="handleMoveDel(ACTIONS.EDIT, idx)">
                        <v-list-item-action style="min-width: 35px;">
                          <v-btn small color="rgba(109, 66, 199,0.12)" icon>
                            <v-icon color="primary" size="15">edit</v-icon>
                          </v-btn>
                        </v-list-item-action>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </StageMenuControl>
                </v-col>
                <v-col v-if="!orderDefault(idx)" class="layout justify-end">
                  <StageMenuControl>
                    <v-list>
                      <v-list-item @click="handleMoveDel(ACTIONS.EDIT, idx)">
                        <v-list-item-action style="min-width: 35px;">
                          <v-btn small color="rgba(109, 66, 199,0.12)" icon>
                            <v-icon color="primary" size="15">edit</v-icon>
                          </v-btn>
                        </v-list-item-action>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        @click.stop="handleMoveDel(ACTIONS.DEL, idx)"
                      >
                        <v-list-item-action style="min-width: 35px;">
                          <v-btn small color="red" icon>
                            <v-icon color="white" size="15">remove</v-icon>
                          </v-btn>
                        </v-list-item-action>
                        <v-list-item-title>Remove</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </StageMenuControl>
                </v-col>
              </v-row>

              <v-row
                no-gutters
                class="align-center"
                v-if="item.pk === 'new'"
                py-2
              >
                <v-col class="layout justify-end align-center" cols="12">
                  <v-form
                    @submit.prevent="handleMoveDel(ACTIONS.ADD, idx)"
                    style="flex: 1;"
                  >
                    <v-text-field
                      box
                      outlined
                      v-model="item.stage_name"
                      label="Add workflow stage..."
                      hide-details
                      required
                    ></v-text-field>
                  </v-form>
                  <div
                    class="color_picker translate-x"
                    :style="`background: #${color}`"
                  ></div>
                  <StageMenuControl icon="arrow_drop_down">
                    <MenuColor @getColorStage="getColorStage" />
                  </StageMenuControl>
                  <!--<v-icon class="ml-0" @click.stop="toggleModalColors">mdi-arrow_drop_down</v-icon>-->
                </v-col>
                <v-col> </v-col>
              </v-row>
            </v-timeline-item>
          </v-card>
        </transition-group>
      </draggable>
    </v-timeline>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      fixed
      app
      right
      temporary
      v-if="idx !== null"
    >
      <EditStageWorkflow
        :stage="workflow[idx]"
        :on-save="onSaveWf"
        :closeDrawer="closeDrawer"
      />

      <Confirm
        :openConfirm="openConfirm"
        @toggleConfirm="toggleConfirm"
        :title="getStageName"
        :onConfirm="onConfirm"
      />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import { ACTIONS, COLORS } from "./constant";
import EditStageWorkflow from "./EditStageWorkflow";
import Confirm from "./Confirm";
import StageMenuControl from "./StageMenuControl";
import MenuColor from "./MenuColor";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  name: "WorkflowStages",
  components: {
    MenuColor,
    StageMenuControl,
    Confirm,
    EditStageWorkflow,
    draggable
  },
  props: {
    WF: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      ACTIONS,
      workflow: [],
      idx: null,
      color: COLORS[3],
      isEditWf: false,
      selectedStage: {},
      drawer: false,
      openConfirm: false,
      isOpenColor: false
    };
  },
  created() {
    this.$http
      .get("/api/workflows/" + this.WF.pk + "/stages/")
      .then(rs => {
        let _new = {
          stage_name: "",
          color: "#ffffff",
          pk: "new"
        };
        this.workflow = [...rs.data];
        this.workflow.splice(this.workflow.length - 1, 0, _new);
      })
      .catch(() => {})
      .finally(() => {});
  },

  computed: {
    getStageName() {
      try {
        return this.workflow[this.idx]["stage_name"];
      } catch (e) {
        return "";
      }
    }
  },
  methods: {
    ...mapMutations("ht_store/projectDetail", ["setStagesWorkFlow"]),
    handleMoveDel(type, _index) {
      let wf = [...this.workflow];
      let new_wf = { stage_name: wf[_index]["stage_name"], color: this.color };
      switch (type) {
        case ACTIONS.UP:
          this.workflow.splice(_index, 1, wf[_index - 1]);
          this.workflow.splice(_index - 1, 1, wf[_index]);
          break;
        case ACTIONS.DOWN:
          this.workflow.splice(_index, 1, wf[_index + 1]);
          this.workflow.splice(_index + 1, 1, wf[_index]);
          break;
        case ACTIONS.DEL:
          this.openConfirm = true;
          this.idx = _index;
          break;
        case ACTIONS.ADD:
          if (!new_wf.stage_name) return false;
          // todo api add stages
          this.$eventHub.$emit(this.$eventTypes.DeterminateProgress);
          this.addWorkflowStage(new_wf)
            .then(rs => {
              this.workflow.splice(_index, 0, rs.data);
              this.workflow[_index + 1]["stage_name"] = "";
              this.setStagesWorkFlow(this.workflow);
            })
            .catch(err => {
              if (err.response) {
                this.$eventHub.$emit(
                  this.$eventTypes.snackNotify,
                  err.response.data.stage_name.toString()
                );
              }
            })
            .finally(() => {});
          break;
        case ACTIONS.EDIT:
          this.idx = _index;
          this.isEditWf = true;
          this.drawer = true;
          break;
        default:
          break;
      }
    },
    onMove(evt) {
      this.selectedStage = evt.draggedContext;
      return evt.related.className.indexOf("_disabled") === -1;
    },
    onEndDraggable() {
      let _index = this.selectedStage["index"],
        _futureIndex = this.selectedStage["futureIndex"],
        stageId = this.selectedStage["element"]["pk"];
      if (_index === _futureIndex || stageId === "new") return false;
      let dataOrder = { order: this.workflow[_index]["order"] };
      this.updateWorkflowStage(stageId, dataOrder).then(() => {
        this.setStagesWorkFlow(this.workflow);
      });
    },
    onSaveWf(item) {
      this.workflow.splice(this.idx, 1, item);
      this.setStagesWorkFlow(this.workflow);
      this.idx = null;
      this.$refs.StageEdit.toggleDialog();
    },
    onConfirm() {
      // todo del stages
      let stageId = this.workflow[this.idx]["pk"];
      this.$eventHub.$emit(this.$eventTypes.DeterminateProgress);
      this.delWorkflowStage(stageId).then(() => {
        this.workflow.splice(this.idx, 1);
        this.setStagesWorkFlow(this.workflow);
        this.idx = null;
      });
    },
    toggleConfirm() {
      this.openConfirm = !this.openConfirm;
    },
    toggleModalColors() {
      this.isOpenColor = !this.isOpenColor;
    },

    orderDefault(idx) {
      let _itemDf = this.workflow[idx];
      let orderMax = this.$underscore.maxBy(this.workflow, item => item.order);
      let orderMin = this.$underscore.minBy(this.workflow, item => item.order);
      // let orderZero = _itemDf.order === 0;
      // console.log(orderMax, orderMin);
      // return orderZero || orderMax.order === _itemDf.order || orderMin.order === _itemDf.order;
      return (
        orderMax.order === _itemDf.order || orderMin.order === _itemDf.order
      );
    },
    addWorkflowStage(data) {
      return this.$http.post("/api/workflows/" + this.WF.pk + "/stages/", data);
    },
    updateWorkflowStage(stageId, data) {
      return this.$http.patch(
        "/api/workflows/" + this.WF.pk + "/stages/" + stageId + "/",
        data
      );
    },
    delWorkflowStage(stageId) {
      return this.$http.delete(
        "/api/workflows/" + this.WF.pk + "/stages/" + stageId + "/"
      );
    },
    closeDrawer() {
      this.idx = null;
      this.drawer = false;
    },
    getColorStage(_color) {
      this.color = _color;
    }
  }
};
</script>

<style scoped>
.color_picker {
  box-shadow: none;
  border: none;
  outline: none;
  width: 15px;
  height: 15px;
  display: block;
  border-radius: 100%;
  margin-left: 5px;
}

.myHandle {
  cursor: move;
}
</style>
<style>
.color_picker {
  box-shadow: none;
  border: none;
  outline: none;
  width: 15px;
  height: 15px;
  display: block;
  border-radius: 100%;
  margin-left: 5px;
  font-size: 0;
}
</style>
