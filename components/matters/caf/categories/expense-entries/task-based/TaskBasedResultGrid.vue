<template>
  <div>
    <TableGrid :headers="headers" hide-default-header :desserts="desserts">
      <template v-slot:item.taskboard="{ props: { row, item } }">
        <v-menu open-on-hover offset-x right :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <nuxt-link to="#">#{{ item.taskboard }}</nuxt-link>
            </div>
          </template>
          <v-card>
            <v-card-title>
              Task board &nbsp;
              <span class="text-caption grey--text">#{{ item.taskboard }}</span>
            </v-card-title>
            <v-card-subtitle>
              Secondary text
            </v-card-subtitle>
            <v-card-text>
              Greyhound divisively hello coldly wonderfully marginally far upon
              excluding.
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
      <template v-slot:item.members="{ props: { row, item } }">
        <nuxt-link to="#">@{{ item.members.username }}</nuxt-link>
      </template>
      <template v-slot:item.estimate="{ props: { row, item } }">
        <div class="text-subtitle-1">{{ $$currency }} {{ item.estimate }}</div>
      </template>
      <template v-slot:item.actual="{ props: { row, item } }">
        {{ $$currency }} {{ item.actual }}
      </template>
      <template v-slot:item.remaining="{ props: { row, item } }">
        {{ $$currency }} {{ item.remaining }}
      </template>
      <template v-slot:item.activities="{ props: { row, item } }">
        {{ $$currency }} {{ item.activities }}
      </template>
    </TableGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import LinkMember from '../../../../../utils/LinkMember'

export default {
  name: 'TaskBasedResultGrid',
  components: { LinkMember, TableGrid },
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
        {
          taskname: 'quibusdam quos repellendus',
          taskboard: 16,
          activities: 159,
          remaining: 159,
          estimate: 159,
          actual: 35,
          members: {
            pk: 1,
            avatar: null,
            first_name: 'Viet',
            last_name: 'Duc',
            name: 'Viet Duc',
            username: 'vietho',
            email: 'viet@mailinator.com',
          },
        },
      ],
    }
  },
}
</script>

<style scoped></style>
