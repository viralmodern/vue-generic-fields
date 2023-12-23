<template>
  <v-container fluid>
    <div class="mb-4">
      <TaskBasedResultGrid />
    </div>
    <div>
      <TaskBasedResultBrid />
    </div>
  </v-container>
</template>

<script>
import TaskBasedResultGrid from './TaskBasedResultGrid'
import TaskBasedResultBrid from './TaskBasedResultBrid'
export default {
  name: 'ExpenseTaskBasedBase',
  components: { TaskBasedResultBrid, TaskBasedResultGrid }
}
</script>

<style scoped></style>
