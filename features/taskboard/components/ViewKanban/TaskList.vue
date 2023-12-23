<template>
  <div
    class="mx-2 fill-height px-1"
    style="width: 250px; height: calc(100% - 3px);"
  >
    <v-card
      width="250px"
      v-mutate="scrollBottom"
      class="group_item overflow-y-auto fill-height overflow-x-hidden"
      ref="groupCard"
    >
      <v-card-title
        class="heading py-0 stick_head_board"
        style="background: #e4e4e4;"
        color="primary"
      >
        <p class="text-left ma-0 text-body-1 font-weight-bold">
          {{ list.name }}
        </p>
        <v-spacer></v-spacer>
        <TaskListActions
          style="position: relative; color: #000; bottom: 5px;"
          :board="board"
          :list="list"
        ></TaskListActions>
      </v-card-title>
      <div class="cards cards-list">
        <draggable v-model="items" v-bind="dragOptions">
          <TaskListItem
            v-for="item in items"
            :item="item"
            :system-attributes="systemAttributes"
            :list="list"
            :board="board"
            :key="item.pk"
            @item-edited="itemEdited"
            @item-cancelled="itemCancelled"
            @item-editing="itemEditing"
          ></TaskListItem>
        </draggable>
        <TaskListItem
          class="fixed-card"
          :item="defaultItem"
          :list="list"
          :board="board"
          @item-edited="itemEdited"
          @item-cancelled="itemCancelled"
          @item-editing="itemEditing"
        ></TaskListItem>
      </div>
    </v-card>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import TaskListActions from './TaskListActions'
import TaskListItem from '../Items/TaskListItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TaskList',
  components: {
    TaskListItem,
    TaskListActions,
    Draggable,
  },
  props: ['board', 'list'],
  data() {
    return {
      isEditing: false,
    }
  },
  computed: {
    systemAttributes() {
      try {
        return this.$store.getters['genericAttributes/systemAttributes']
      } catch (e) {
        return []
      }
    },
    defaultItem() {
      return {
        pk: '',
        id: '',
        text: '',
      }
    },
    dragOptions() {
      return {
        animation: '200',
        ghostClass: 'ghost',
        group: 'kanban-board-list-items',
        disabled: this.isEditing || !this.shouldAllowTaskItemsReorder,
        forceFallback: true,
        fallbackOnBody: true,
      }
    },
    items: {
      get() {
        return this.list.items
      },
      set(reorderedListItems) {
        const payload = {
          boardId: this.board.pk,
          listId: this.list.pk,
          items: reorderedListItems,
        }
        this.reorderTaskListItems(payload)
      },
    },
    shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet
    },
  },
  methods: {
    ...mapActions('da_taskboard', {
      reorderTaskListItems: 'reorderTaskListItems',
    }),
    itemEditing() {
      this.isEditing = true
    },
    itemEdited() {
      this.isEditing = false
      console.log(
        'this.$refs.groupCard',
        this.$refs.groupCard.$el.scrollTop,
        this.$refs.groupCard.$el.scrollHeight
      )
    },
    itemCancelled() {
      this.isEditing = false
    },
    scrollBottom() {
      console.log('scrollBottom')
      // this.$refs.groupCard.$el.scrollTop = this.$refs.groupCard.$el.scrollHeight
    },
  },
}
</script>
<style scoped>
.stick_head_board {
  position: sticky;
  top: 0;
  z-index: 2;
}

.group_item {
  /*border: solid 1px blue;*/
}

.fixed-card {
  position: sticky;
  bottom: 0px;
}
</style>
