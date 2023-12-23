<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center">
        <v-chip class="mr-4">
          Group by
          <template v-if="active">
            :<span class="grey--text text-caption ml-2">{{ active }}</span>
          </template>
          <v-icon right v-on="on">mdi-chevron-down</v-icon>
        </v-chip>
      </div>
    </template>
    <v-list shaped dense>
      <v-list-item
        color="primary"
        v-for="(item, index) in items"
        :key="index"
        :input-value="item.title === active"
        @click="active = item.title"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuGroupByExpenseLogs',
  data() {
    return {
      active: null,
      items: [
        {
          title: 'Expense Category',
        },
        {
          title: 'Created By',
        },
        {
          title: 'Expense Code',
        },
        {
          title: 'Expense Status',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
