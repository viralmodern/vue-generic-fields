<template>
  <div>
    <v-list two-line class="custom pt-3">
      <draggable class="list-group" v-model="listIdAgenda" v-bind="dragOptions">
        <transition-group type="transition" name="flip-list">
          <AgendaItem
            v-for="item in dataAgenda"
            :key="item.id"
            :item="item"
            class="mt-3 mouse-card"
            :itemDuration="itemDuration"
            :cardTitle="cardTitle"
            @emitDataCard="emitDataCard"
            @editCard="editCard"
            @click.native.stop
            @updateWhenClickingOnTheCard="updateWhenClickingOnTheCard"
            @removeCard="removeCard"
          />
        </transition-group>
      </draggable>
      <v-btn class="mt-3 primary" @click="addItemAgenda">
        <v-icon class="mr-2">add_box</v-icon>Add agenda item
      </v-btn>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import AgendaItem from "./AgendaItem";
function showCard(o) {
  o.isActive = false;
  for (let i = 0; i < o.length; i++) {
    showCard(o[i]);
  }
}
export default {
  components: {
    draggable,
    AgendaItem
  },
  data() {
    return {
      isActiveCard: false,
      objectCard: null,
      itemDuration: [
        { id: 1, name: "no duration" },
        { id: 2, name: "5 minutes" },
        { id: 3, name: "10 minutes" },
        { id: 4, name: "15 minutes" },
        { id: 5, name: "20 minutes" },
        { id: 6, name: "25 minutes" },
        { id: 7, name: "30 minutes" },
        { id: 8, name: "35 minutes" },
        { id: 9, name: "40 minutes" },
        { id: 10, name: "45 minutes" },
        { id: 11, name: "50 minutes" },
        { id: 12, name: "55 minutes" },
        { id: 13, name: "60 minutes" }
      ],
      typeCard: "",
      objectCardChanges: null
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "agenda",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    listIdAgenda: {
      get() {
        return this.dataAgenda.map(x => x.id);
      },
      set(value) {
        this.moveAgendaItem(value);
      }
    },
    ...mapGetters("ht_store/meeting/agenda", ["dataAgenda", "cardTitle"])
  },
  methods: {
    ...mapActions("ht_store/meeting/agenda", [
      "getDataAgendaRequest",
      "postCreateCard",
      "activeCard",
      "postUpdateCard",
      "removeCard"
    ]),
    ...mapMutations("ht_store/meeting/agenda", ["moveAgendaItem"]),
    addItemAgenda() {
      const data = {
        id: Math.random(),
        title: "Add a title",
        content: "Add a Description",
        duration: { id: 1, name: "no duration" },
        arrFile: []
      };
      this.postCreateCard(data);
    },
    editCard(item) {
      this.objectCard = item;
      showCard(this.dataAgenda);
      item.isActive = true;
      this.isActiveCard = item.isActive;
      this.typeCard = item.title;
      this.activeCard(this.typeCard);
      if (this.objectCardChanges !== null) {
        this.postUpdateCard(this.objectCardChanges);
      }
    },
    emitDataCard(item) {
      this.objectCardChanges = null;
      this.activeCard("");
      this.postUpdateCard(item);
    },
    updateWhenClickingOnTheCard(v) {
      this.objectCardChanges = v;
    }
  },
  mounted() {
    this.getDataAgendaRequest();
  }
};
</script>

<style scoped>
.custom /deep/ .v-list__tile {
  padding: unset;
}
.action-add-agenda /deep/ .v-list__tile {
  height: 45px;
}
</style>
