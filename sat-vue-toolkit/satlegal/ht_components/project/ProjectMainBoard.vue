<template>
  <v-row no-gutters>
    <VueKanban
      :class="`kanban ${isShowingProjectHeader ? 'has-header' : ''}`"
      :stages="stages.concat([''])"
      @update-block="updateBlocks"
      @moveStages="moveStage"
    >
      <v-row
        no-gutters
        v-for="(stage, index) in stages.concat([''])"
        :slot="`sl-stage-${stage.id}`"
        :key="index"
      >
        <v-row no-gutters class="py-2" v-if="stage">
          <v-col class="align-self-center">
            <v-text-field
              class="pa-0 ma-0"
              v-if="isEditTitle === stage.id"
              single-line
              hide-details
              autofocus
              @blur="clearData()"
              @keyup.enter="editTitle(stage.id, index)"
              v-model="listTitle"
            ></v-text-field>
            <span class="subheading font-weight-bold text-uppercase" v-else>{{
              stage.name
            }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-x>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon small>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in TitleMenuItems"
                :key="i"
                @click="actionTitleMenu(stage, i)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row no-gutters class="pt-2" v-else>
          <v-row no-gutters v-if="!isShowInputAddList">
            <v-col class="align-self-center">
              <v-btn
                class="ma-0 primary"
                icon
                @click="isShowInputAddList = true"
              >
                <v-icon class>add</v-icon>
              </v-btn>
            </v-col>
            <v-col align-self-center>
              <h2>Add a list</h2>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="isShowInputAddList">
            <v-text-field
              placeholder="Enter list tilte"
              single-line
              hide-details
              outlined
              v-model="listTitle"
            ></v-text-field>
            <v-row no-gutters class="pt-2">
              <v-btn class="ma-0 primary" @click="addList">Add List</v-btn>
              <v-btn class="ma-0" icon @click="isShowInputAddList = false">
                <v-icon small class="white--text">close</v-icon>
              </v-btn>
            </v-row>
          </v-row>
        </v-row>
      </v-row>
      <v-row no-gutters slot="taskTemplate" slot-scope="{ task }">
        <CardBoard
          :item="task"
          :dataListLabel="dataListLabel"
          @emitRemoveItem="emitRemoveItem"
          @changeTitileCard="changeTitileCard"
        />
      </v-row>
      <v-row
        no-gutters
        v-for="stage in stages"
        :key="stage.id"
        :slot="`footer-${stage.id}`"
      >
        <v-row no-gutters class="px-2 pb-2">
          <v-col>
            <v-btn
              class="ma-0"
              v-if="stage && inputAddCardOfStage !== stage"
              block
              color="primary"
              @click="() => showInputAddCard(stage)"
            >
              <v-icon>mdi-plus</v-icon>Add a card
            </v-btn>
          </v-col>
        </v-row>
        <v-row column class="px-2 pb-2" v-if="inputAddCardOfStage === stage">
          <v-text-field
            label="Enter a title for this card"
            single-line
            solo
            hide-details
            v-model="cardTitle"
          ></v-text-field>
          <v-row no-gutters class="pt-2">
            <v-btn
              class="ma-0"
              color="primary"
              @click="addCard(stage, cardTitle)"
              >Add</v-btn
            >
            <v-btn class="ma-0" icon @click="hideBtnAddCard">
              <v-icon small>close</v-icon>
            </v-btn>
          </v-row>
        </v-row>
      </v-row>
    </VueKanban>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="confirmDeleteTaskBoard"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
    <DialogEditTaskBoard
      title="Edit title board list"
      :itemList="itemStage"
      :isDialogEdit="isDialogEdit"
      label="Name list"
      @add="editListName"
      requireName="Name list is required"
      @closeDialog="isDialogEdit = false"
    />
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VueKanban from "../kanban-board/VueKanban";
import CardBoard from "../cards/CardBoard";
import ConfirmItem from "../dialogs/ConfirmItem";
import DialogEditTaskBoard from "../dialogs/DialogEditTaskBoard";
export default {
  components: {
    CardBoard,
    VueKanban,
    ConfirmItem,
    DialogEditTaskBoard
  },
  data() {
    return {
      isDialogEdit: false,
      itemStage: null,
      isShowPopup: false,
      TitleMenuItems: [
        { title: "Edit Title..." },
        { title: "Delete This List..." }
      ],
      addCardMenuItems: [
        { title: "Members..." },
        { title: "Labels..." },
        { title: "Position..." }
      ],
      isShowInputAddList: false,
      inputAddCardOfStage: false,
      isEditTitle: false,
      listTitle: "",
      cardTitle: "",
      cardMembers: []
    };
  },
  methods: {
    ...mapMutations("ht_store/task/list", [
      "moveTask",
      "changeTaskStage",
      "deleteItemOfTreeCard",
      "removeItemTaskBoard",
      "editListName",
      "moveStage"
    ]),
    ...mapActions("ht_store/projectBoard", [
      "updateBlock",
      "editColumnTitle",
      "editTitleCard"
    ]),
    ...mapActions("ht_store/task/list", [
      "addItemTaskBoard",
      "updateTask",
      "addTopicTaskBoard"
    ]),
    clearData() {
      this.isShowInputAddList = false;
      this.inputAddCardOfStage = false;
      this.isEditTitle = false;
      this.cardTitle = "";
      this.listTitle = "";
    },
    hideBtnAddCard() {
      this.isShowInputAddList = false;
      this.clearData();
    },
    confirmDeleteTaskBoard() {
      this.removeItemTaskBoard(this.itemStage);
      this.isShowPopup = false;
    },
    emitRemoveItem(item) {
      this.deleteItemOfTreeCard(item);
    },
    updateBlocks(begin, end, position) {
      const { fromTask, fromList, fromListIndex } = begin;
      const { toTask, toList, toListIndex } = end;
      const { newIndex, oldIndex } = position;
      this.moveTask({
        id: fromTask.id,
        priority: toTask.priority,
        isMoveUp:
          fromList.id === toList.id
            ? newIndex - oldIndex < 0
            : fromListIndex - toListIndex
      });
      if (fromList.id !== toList.id) {
        this.changeTaskStage({
          id: fromTask.id,
          newStageId: toList.id
        });
      }
    },
    showInputAddCard(stage) {
      this.inputAddCardOfStage = stage;
    },
    addList() {
      const data = {
        id: Math.random(),
        name: this.listTitle,
        alias: this.listTitle.toLowerCase()
      };
      this.addTopicTaskBoard(data);
      this.clearData();
    },
    addCard(stage, cardTitle) {
      const data = {
        id: Math.random(),
        activities: [],
        attachment: [],
        checkList: [],
        dataCitation: [],
        duaDate: new Date().toISOString(),
        estimation: null,
        favorable: null,
        hasDescription: false,
        labels: [],
        location: [],
        members: [],
        notes: [],
        people: [],
        priority: 1,
        progress: 20,
        risk: null,
        subTasks: [],
        worklogs: [],
        vulnerability: null,
        treatment: null,
        ticketMessages: [],
        tagging: [],
        cardName: cardTitle,
        stage: {
          id: stage.id
        }
      };
      if (cardTitle !== "") {
        this.addItemTaskBoard(data);
        this.clearData();
      }
    },
    actionTitleMenu(stage, i) {
      if (i == 0) {
        (this.isDialogEdit = true), (this.itemStage = stage);
      } else {
        (this.isShowPopup = true), (this.itemStage = stage);
      }
    },
    changeTitileCard(titleName, object) {
      const data = {
        taskId: object.id,
        columnName: "cardName",
        newValue: titleName
      };
      this.updateTask(data);
    },
    editTitle(title, index) {
      let stage = {
        index: index,
        title: this.listTitle || title
      };
      if (this.listTitle !== "") {
        this.editColumnTitle(stage);
        this.clearData();
      } else {
        this.clearData();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel"]),
    ...mapGetters("ht_store/layout", ["isShowingProjectHeader"]),
    ...mapGetters({
      stages: "task/list/tasksInStages"
    })
  }
};
</script>
<style>
@import "../../assets/kanban.css";

.kanban /deep/ .drag-list {
  height: calc(100vh - 190px);
}
.kanban.has-header /deep/ .drag-list {
  height: calc(100vh - 280px);
}
</style>
