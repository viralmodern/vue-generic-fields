<template>
  <div style="height: calc(100vh - 84px);" class="overflow-x-auto">
    <div class="d-flex fill-height">
      <div class="fill-height">
        <draggable
          v-model="lists"
          class="d-flex align-start fill-height mx-n2"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in lists"
            :key="index"
            :board="getBoard"
            :list="listItem"
          ></TaskList>
        </draggable>
      </div>
      <div class="ml-2">
        <TaskListEdit />
      </div>
    </div>
  </div>
</template>
<script>
import TaskList from './TaskList'
import Draggable from 'vuedraggable'
import AppHeader from '../AppHeader'
import mx_taskboard from '../../mixins/mx_taskboard'
import TaskListEdit from './TaskListEdit'

export default {
  name: 'ViewKanban',
  mixins: [mx_taskboard],
  components: {
    TaskListEdit,
    AppHeader,
    TaskList,

    Draggable
  }
}
</script>

<style scoped lang="scss">
.scrolling-wrapper {
  /*border: solid 1px blue;*/
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}
</style>
