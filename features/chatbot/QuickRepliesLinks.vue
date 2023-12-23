<template>
  <div class="quick-replies d-flex flex-wrap pa-1">
    <template v-for="item in list">
      <v-btn
        small
        color="purple lighten-4"
        rounded
        shaped
        depressed
        class="primary--text text-capitalize caption ma-1"
        :key="item.id"
      >
        {{ item.title }}
      </v-btn>
    </template>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
  name: 'QuickRepliesLinks',
  props: {
    list: {
      type: Array,
      default: () => [
        {
          id: uuid(),
          title: 'Alleged Facts',
        },
        {
          id: uuid(),
          title: 'Involved Characters',
        },
        {
          id: uuid(),
          title: 'Data Docket',
        },
        {
          id: uuid(),
          title: 'Read Complaint',
        },
      ],
    },
  },
}
</script>

<style scoped></style>
