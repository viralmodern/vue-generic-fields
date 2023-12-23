<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-left">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" outlined v-on="on">
            <v-icon class="mr-2">mdi-compare_arrows</v-icon>
            {{ nameTypesOfGrid }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.toLink"
            @click="setName(item)"
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
      nameTypesOfGrid: "All Service",
      items: [
        {
          id: 1,
          name: "All Service",
          toLink: {
            name: "Allservice",
            params: {
              listType: this.$route.params,
              groupType: "all-service"
            }
          }
        },
        {
          id: 2,
          name: "By Character",
          toLink: {
            name: "ByService",
            params: {
              listType: this.$route.params,
              type: "character"
            }
          }
        },
        {
          id: 2,
          name: "By Status",
          toLink: {
            name: "ByService",
            params: {
              listType: this.$route.params,
              type: "status"
            }
          }
        },
        {
          id: 3,
          name: "By Type",
          toLink: {
            name: "ByService",
            params: {
              listType: this.$route.params,
              type: "type"
            }
          }
        }
      ]
    };
  },
  methods: {
    setName(value) {
      this.nameTypesOfGrid = value.name;
    }
  }
};
</script>
