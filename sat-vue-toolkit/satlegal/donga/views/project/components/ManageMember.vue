<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.mdAndUp"
    fixed
    app
    right
    temporary
  >
    <div class="layout column fill-height justify-space-between">
      <v-app-bar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="subheading">Manage member</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-card class="flex">
        <v-subheader>Assignees:</v-subheader>
        <v-card-text class="pt-0">
          <v-autocomplete
            v-model="friends"
            :disabled="isUpdating"
            :items="people"
            chips
            color="blue-grey lighten-2"
            item-text="name"
            item-value="name"
            multiple
            dense
            class="py-0"
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <img :src="data.item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-card-text>
        <v-subheader>Manager:</v-subheader>
        <v-card-text class="pt-0">
          <v-autocomplete
            v-model="friends2"
            :disabled="isUpdating"
            :items="people2"
            chips
            color="blue-grey lighten-2"
            item-text="name"
            item-value="name"
            dense
            class="py-0"
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <img :src="data.item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-card-text>
      </v-card>

      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-spacer></v-spacer>
        <v-btn color="default" @click="drawer = false">Cancel</v-btn>
        <v-btn color="primary" @click="drawer = false">Update</v-btn>
      </v-card-actions>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "ManageMember",
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };
    return {
      drawer: false,
      isUpdating: false,
      title: "",
      friends: ["Sandra Adams", "Britta Holt"],
      friends2: ["Sandra Adams", "Britta Holt"],
      people: [
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
      ],
      people2: [
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
      ]
    };
  },
  methods: {
    toggleModal() {
      this.drawer = !this.drawer;
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
