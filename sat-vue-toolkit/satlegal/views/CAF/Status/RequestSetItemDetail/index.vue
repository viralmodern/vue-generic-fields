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
          text: "Request Set Item Document",
          to: {
            name: "RequestSetItemDocument"
          },
          icon: "mdi-file-document-box"
        },
      ]
    };
  }
};
</script>
