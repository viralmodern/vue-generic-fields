<template>
  <v-row no-gutters fill-height>
    <LeftMenu
      @openModalEditTaskList="openModalEditTaskList"
      @opentModalDelete="opentModalDelete"
      class="left-menu"
    />
    <v-col>
      <v-row no-gutters fill-height>
        <v-col v-if="tasks && tasks.length">
          <draggable
            class="list-group"
            tag="div"
            :value="tasks"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            @change="finishDrag"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <CardTreeView
                v-for="item in tasks"
                :key="item.id"
                :item="item"
                :dataListLabel="dataListLabel"
                @confirmDelete="removeItemOfTreeCard"
              />
            </transition-group>
          </draggable>
        </v-col>
        <v-col v-else class="text-xs-center">(no item to display)</v-col>
      </v-row>
    </v-col>
    <DialogEditTaskBoard
      title="Edit title board list"
      :itemList="itemList"
      :isDialogEdit="isDialogEdit"
      label="Name list"
      @add="editListName"
      requireName="Name list is required"
      @closeDialog="isDialogEdit = false"
    />
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="confirmDeleteTaskBoard"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-row>
</template>
<script>
import draggable from "vuedraggable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import LeftMenu from "../left-menus/TreeViewBoard";
import CardTreeView from "../cards/CardTreeView";
import ConfirmItem from "../dialogs/ConfirmItem";
import DialogEditTaskBoard from "../dialogs/DialogEditTaskBoard";

export default {
  components: {
    draggable,
    LeftMenu,
    CardTreeView,
    DialogEditTaskBoard,
    ConfirmItem
  },
  data() {
    return {
      drag: false,
      isDialogEdit: false,
      itemList: null,
      isShowPopup: false
    };
  },
  methods: {
    ...mapMutations("ht_store/task/list", [
      "moveTask",
      "editListName",
      "removeItemTaskBoard"
    ]),
    ...mapActions("ht_store/task/list", ["removeItemOfTreeCard"]),
    finishDrag(event) {
      if (!event || !event.moved || !event.moved.element) return;
      const hover = this.tasks[event.moved.newIndex];
      if (!hover) return;
      this.moveTask({
        id: event.moved.element.id,
        priority: hover.priority,
        isMoveUp: event.moved.newIndex - event.moved.oldIndex < 0
      });
    },
    openModalEditTaskList(item) {
      this.itemList = item ? item : null;
      this.isDialogEdit = true;
    },
    opentModalDelete(item) {
      this.itemList = item;
      this.isShowPopup = true;
    },
    confirmDeleteTaskBoard() {
      this.removeItemTaskBoard(this.itemList);
      this.isShowPopup = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel"]),
    ...mapGetters("ht_store/task/list", ["tasks"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>
<style scoped>
.left-menu {
  width: 250px;
  border-right: 1px solid silver;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
