<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-left">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" outlined>
            <v-icon class="mr-2">mdi-compare_arrows</v-icon>
            {{ nameGroup }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.toLink"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Digital Howey Checklist",
          toLink: {
            name: "grid"
          }
        },
        {
          id: 2,
          name: "Group Result",
          toLink: {
            name: "GroupResult"
          }
        },
        {
          id: 3,
          name: "Group Status",
          toLink: {
            name: "GroupStatus"
          }
        }
      ]
    };
  },
  computed: {
    nameGroup() {
      const name = this.$route.name;
      return name === "grid"
        ? "Digital howey checklist"
        : name === "GroupResult"
        ? "Group result"
        : name === "GroupStatus"
        ? "Group status"
        : "";
    }
  }
};
</script>
