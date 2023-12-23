<template>
  <BaseViewTaskBoard>
    <attributes-list>
      <template slot-scope="{ data: fields, loading }">
        <nuxt-child :attributes="fields" />
      </template>
    </attributes-list>
    <TaskDetailDialog />
  </BaseViewTaskBoard>
</template>

<script>
import BaseViewTaskBoard from '../../../../../features/taskboard/components/BaseViewTaskBoard'
import mx_taskboard from '../../../../../features/taskboard/mixins/mx_taskboard'
import AttributesList from '../../../../../components/utils/AttributesList'
import TaskDetailDialog from '../../../../../features/taskboard/components/Card/TaskDetailDialog'
import mx_matter from '../../../../../mixins/mx_matter'

export default {
  components: { TaskDetailDialog, AttributesList, BaseViewTaskBoard },
  validate({ params }) {
    // Must be a number
    return true
    return /^\d+$/.test(params.id)
  },
  mixins: [mx_taskboard, mx_matter],
  created() {
    this.$store.dispatch('da_taskboard/fetchData', {
      matterID: this.$$matterID
    })
  },
  mounted() {
    // kanban | gantt | list
    if (this.getBoard) {
      this.setActiveTaskBoard({
        board: this.getBoard
      })
    }
  },
  computed: {}
}
</script>

<style scoped></style>
