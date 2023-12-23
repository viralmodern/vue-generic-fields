<template>
  <v-tabs large class="v-jumbotron">
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab v-for="(item, index) in tabs" :key="item.title" :href="`#tab-${index}`">
      <span>{{item.title}}</span>
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        v-for="(i, index) in tabs"
        :key="'tab-'+index"
        :value="'tab-' + index"
        :transition="false"
      >
        <ProjectOverView v-if="tabs[index]['id'] === 'overview'"/>
        <v-card-text v-else>{{ i.title }}</v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  import ProjectOverView from './ProjectOverView';

  export default {
    name: "TabProject",
    components: {ProjectOverView},
    data: () => ({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tabs: [
        {
          title: 'Overview',
          id: 'overview',
        },
        {
          title: 'Discussion',
          id: 'discussion',
        },
        {
          title: 'Meeting',
          id: 'meeting',
        },
        {
          title: 'Dataroom',
          id: 'dataroom',
        },
        {
          title: 'Ticket',
          id: 'ticket',
        },
        {
          title: 'Wiki',
          id: 'wiki',
        },

      ],
    }),
  }
</script>

<style scoped>

</style>
