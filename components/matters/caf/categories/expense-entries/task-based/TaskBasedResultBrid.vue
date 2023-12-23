<template>
  <div>
    <TableGrid hide-default-header :desserts="desserts" :headers="headers" />
    <div class="mb-4"></div>
  </div>
</template>
<script>
import TableGrid from '../../../../../utils/TableGrid'

export default {
  name: 'TaskBasedResultBrid',
  components: { TableGrid },
  data() {
    return {
      headers: [
        {
          text: 'Taskboard',
          align: 'left',
          sortable: false,
          value: 'taskboard',
          active: true,
        },
        { text: 'Taskname', value: 'taskname', active: true },
        { text: 'Estimated Expense', value: 'estimate', active: true },
        { text: 'Actual Expense Amount', value: 'actual', active: true },
        { text: 'Remaining Expense Amount', value: 'remaining', active: true },
        { text: 'Expense Activities', value: 'activities', active: true },
        { text: 'Expense by', value: 'members', active: true },
      ],
      desserts: [
        {
          taskname: 'Lorem ipsum dolor sit amet',
          taskboard: 12,
          activities: 159,
          remaining: 159,
          estimate: 159,
          actual: 35,
          members: {
            pk: 1,
            avatar: null,
            first_name: 'Vio',
            last_name: 'Let',
            name: 'Violet',
            username: 'violet',
            email: 'violet@mailinator.com',
          },
        },
      ],
    }
  },
}
</script>

<style scoped></style>
