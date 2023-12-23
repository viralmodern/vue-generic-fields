<template>
  <v-app-bar app dense flat>
    <v-toolbar-items>
      <div class="d-flex align-center">
        <TaskBoardEdit></TaskBoardEdit>
      </div>
    </v-toolbar-items>
    <!--<v-toolbar-items>
      <div class="d-flex align-center">
        <TaskListEdit></TaskListEdit>
      </div>
    </v-toolbar-items>-->
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <MenuShowBy />
      <div class="mx-1"></div>
      <MenuModeView />
      <div class="mx-1"></div>
      <MenuFilterBoard />
      <div class="mx-1"></div>
      <MenuAttributesConfig />
    </div>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
import TaskBoardEdit from './Boards/TaskBoardEdit'
import TaskListEdit from './ViewKanban/TaskListEdit'
import MenuShowBy from './controls/MenuShowBy'
import MenuModeView from './controls/MenuModeView'
import MenuFilterBoard from './controls/MenuFilterBoard'
import MenuCustomizeBoard from './controls/MenuCustomizeBoard'
import MenuAttributesConfig from './controls/MenuAttributesConfig'

export default {
  name: 'AppHeader',
  components: {
    MenuAttributesConfig,
    MenuFilterBoard,
    MenuModeView,
    MenuShowBy,
    MenuCustomizeBoard,

    TaskBoardEdit,
    TaskListEdit
  },
  computed: {
    ...mapGetters('da_taskboard', {
      activeBoard: 'activeBoard',
      isLoading: 'isLoading'
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ''
    }
  }
}
</script>
<style>
.x {
  background: #fff;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  padding: 0px 0px 0px 10px !important;
  margin: 0px 0px 10px 0px;
}
</style>
