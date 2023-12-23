<template>
  <v-row no-gutters>
    <VueKanban
      :class="`kanban ${isShowingProjectHeader ? 'has-header' : ''}`"
      :stages="tasksInStages"
      @update-block="updateBlocks"
    >
      <v-row v-for="(stage, index) in tasksInStages" :slot="`sl-stage-${stage.id}`" :key="index">
        <v-row no-gutters class="py-2" v-if="stage">
          <v-col align-self-center>
            <span class="mx-2 subheading font-weight-bold text-uppercase">
              {{
              stage.name
              }}
            </span>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-row>
      <v-row no-gutters slot="taskTemplate" slot-scope="{ stage, task }">
        <CardBoard
          :item="task"
          @updateRequestItem="
            $emit('updateRequestItem', {
              name: stage.id,
              requestItemId: task.id,
              value: $event
            })
          "
          @removeRequestItem="
            $emit('removeRequestItem', {
              name: stage.id,
              requestItemId: task.id
            })
          "
        />
      </v-row>
      <v-row no-gutters v-for="stage in tasksInStages" :key="stage.id" :slot="`footer-${stage.id}`">
        <v-row no-gutters class="px-2 pb-2">
          <v-col>
            <v-btn
              class="ma-0"
              v-if="stage && inputAddCardOfStage !== stage"
              block
              color="primary"
              @click="() => showInputAddCard(stage)"
            >
              <v-icon>mdi-add</v-icon>Add a request
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="px-2 pb-2" v-if="inputAddCardOfStage === stage">
          <v-text-field label="Enter a name" single-line solo hide-details v-model="cardTitle"></v-text-field>
          <v-row no-gutters class="pt-2">
            <v-btn
              class="ma-0"
              color="primary"
              @click="$emit('addRequestItem', stage, cardTitle)"
            >Add</v-btn>
            <v-btn class="ma-0" icon @click="hideBtnAddCard">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-row>
      </v-row>
    </VueKanban>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import VueKanban from "../../kanban-board/VueKanban";
import CardBoard from "./CardBoard";
export default {
  props: {
    stage: String,
    tasksInStages: Array
  },
  components: {
    CardBoard,
    VueKanban
  },
  data() {
    return {
      inputAddCardOfStage: false,
      cardTitle: ""
    };
  },
  methods: {
    clearData() {
      this.inputAddCardOfStage = false;
      this.cardTitle = "";
    },
    hideBtnAddCard() {
      this.clearData();
    },
    updateBlocks(begin, end, position) {
      /* eslint-disable */
      const { fromTask, fromList, fromListIndex } = begin;
      const { toTask, toList, toListIndex } = end;
      const { newIndex, oldIndex } = position;
      let order = 0;
      let data = {
        taskId: fromTask.id,
        fromListName: fromList.name,
        fromListId: fromList.id,
        newIndex,
        oldIndex,
        toListId: toList.id
      };
      if (fromList.id !== toList.id) {
        const tasks = toList.tasks;
        if (!tasks.length) {
          order = fromTask.order;
        } else {
          if (newIndex == 0) {
            order = tasks[newIndex].order - 1000000;
          } else {
            if (newIndex === tasks.length) {
              order = tasks[newIndex - 1].order + 1000000;
            } else {
              order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
            }
          }
        }
        data.order = order;
      } else {
        const tasks = fromList.tasks;
        if (newIndex > oldIndex) {
          if (newIndex == tasks.length - 1) {
            order = tasks[newIndex].order + 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
          }
        } else {
          if (newIndex == 0) {
            order = tasks[newIndex].order - 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
          }
        }
        data.order = order;
      }
      this.$emit("updateBlocks", data);
    },
    showInputAddCard(stage) {
      this.inputAddCardOfStage = stage;
    }
  },
  computed: {
    ...mapGetters("ht_store/layout", ["isShowingProjectHeader"])
  }
};
</script>
<style>
@import "../../../assets/kanban.css";

.kanban /deep/ .drag-list {
  height: calc(100vh - 190px);
}
.kanban.has-header /deep/ .drag-list {
  height: calc(100vh - 280px);
}
</style>
