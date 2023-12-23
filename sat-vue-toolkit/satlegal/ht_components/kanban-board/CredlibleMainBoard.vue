<template>
  <v-row no-gutters class="px-1">
    <v-col>
      <kanban-board
        :stages="stages"
        :blocks="blocks"
        @update-block="updateBlocks"
      >
        <v-row
          no-gutters
          v-for="(stage, index) in stages"
          :slot="stage"
          :key="index"
        >
          <span class="text-body-1 pt-2 pb-2">{{ stage }}</span>
        </v-row>
        <v-row
          no-gutters
          v-for="block in blocks"
          :slot="block.id"
          :key="block.id"
        >
          <v-col cols="12">
            <CardCredibleKanban :cardBlock="block" />
          </v-col>
        </v-row>
        <AddCredlibleCard
          v-for="stage in stages"
          :key="stage"
          :slot="`footer-${stage}`"
          :stage="stage"
          :addCardMenuItems="addCardMenuItems"
          :inputAddCardOfStage="inputAddCardOfStage || ''"
          @showInputAddCard="showInputAddCard"
          @emitAddCard="addCard"
          @emitHideInputAdd="hideInputAdd"
        />
      </kanban-board>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import Vue from "vue";
import vueKanban from "vue-kanban";
import CardCredibleKanban from "../cards/CardCredibleKanban";
import AddCredlibleCard from "./AddCredlibleCard";
Vue.use(vueKanban);
export default {
  components: {
    CardCredibleKanban,
    AddCredlibleCard
  },
  data() {
    return {
      addCardMenuItems: [
        { title: "Members..." },
        { title: "Labels..." },
        { title: "Position..." }
      ],
      inputAddCardOfStage: false,
      cardMembers: []
    };
  },
  methods: {
    ...mapActions("ht_store/project/credlibleBoard", [
      "updateBlock",
      "addColumn",
      "addBlock"
    ]),
    clearData() {
      this.inputAddCardOfStage = false;
    },
    updateBlocks(id, status) {
      this.updateBlock({ id, status });
    },
    showInputAddCard(stage) {
      this.inputAddCardOfStage = stage;
    },
    hideInputAdd() {
      this.inputAddCardOfStage = false;
    },
    addList(title) {
      this.clearData();
      this.addColumn(title);
    },
    addCard(stage, cardTitle) {
      const cardData = {
        id: Math.random(),
        status: stage,
        title: cardTitle,
        members: this.cardMembers || "0",
        comments: "0",
        attachment: "0"
      };
      if (cardTitle !== "") {
        this.addBlock(cardData);
        this.clearData();
      }
    }
  },
  computed: {
    stages() {
      return this.boardData.stages;
    },
    blocks() {
      return this.boardData.blocks;
    }
  },
  props: {
    boardData: Object
  }
};
</script>
<style>
@import "../../assets/kanban.css";
</style>
