<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center">
        <v-chip class="mr-4" v-on="on">
          Group by
          <template v-if="active">
            :<span class="text-caption ml-2">{{ active }}</span>
          </template>
          <v-icon right>mdi-chevron-down</v-icon>
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
  name: 'MenuGroupByTimeTracking',
  data() {
    return {
      active: null,
      items: [
        {
          title: 'Task',
        },
        {
          title: 'Litigation Code',
        },
        {
          title: 'Activities Code',
        },
        {
          title: 'Client',
        },
        {
          title: 'Labels',
        },
        {
          title: 'Billable',
        },
        {
          title: 'Logged For',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
