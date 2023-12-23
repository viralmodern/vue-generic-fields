<template>
  <v-row  no-gutters>
    <v-col cols="12" class="text-xs-left">
      <v-menu offset-x>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" outlined v-on="on">
            <v-icon class="mr-2">compare_arrows</v-icon>
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
      nameTypesOfGrid: "All Facts",
      items: [
        {
          id: 1,
          name: "All Facts",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "all-facts"
            }
          }
        },
        {
          id: 2,
          name: "By Characters",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "characters"
            }
          }
        },
        {
          id: 3,
          name: "By Location",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "location"
            }
          }
        },
        {
          id: 4,
          name: "By Disputed",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "disputed"
            }
          }
        },
        {
          id: 5,
          name: "By Issue",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "issue"
            }
          }
        },
        {
          id: 6,
          name: "By Types",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "types"
            }
          }
        },
        {
          id: 7,
          name: "By Favorable",
          toLink: {
            name: "facts",
            params: {
              listType: this.$route.params.listType,
              groupType: "favorable"
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
