<template>
  <div class="py-2">
    <v-row no-gutters justify="end" class="mr-3">
      <v-tooltip bottom v-for="item in items" :key="item.id">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            :color="$route.name === item.to.name ? 'primary' : ''"
            v-on="on"
            :to="item.to"
          >
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
        </template>
        <span>{{item.text}}</span>
      </v-tooltip>
    </v-row>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          text: "Subpoena",
          to: {
            name: ""
          },
          icon: "mdi-briefcase"
        },
        {
          id: 2,
          text: "Definition and Instruction",
          to: {
            name: "SubpoenaDefiAndInstrucs"
          },
          icon: "mdi-library"
        },
        {
          id: 3,
          text: "Production",
          to: {
            name: "SubpoenaProduction"
          },
          icon: "mdi-archive"
        },
      ]
    };
  }
};
</script>
