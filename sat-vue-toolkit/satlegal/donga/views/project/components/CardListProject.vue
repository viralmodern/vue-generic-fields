<template>
  <v-row no-gutters class="justify-start">
    <v-col cols="12" sm="3">
      <v-card>
        <v-app-bar>
          <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->
          <v-toolbar-title>
            Project
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark small> <v-icon>mdi-add</v-icon> Add </v-btn>
        </v-app-bar>

        <v-list three-line v-if="items.length">
          <!--<v-subheader>All Project</v-subheader>-->
          <template v-for="item in items">
            <v-list-item
              :key="item.title"
              :to="'/project/' + item.pk + '/'"
              avatar
            >
              <v-list-item-avatar color="red">
                <img v-if="item.avatar" :src="item.avatar" />
                <span v-else class="white--text text-h5">J</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.description"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CardListProject",
  data() {
    return {
      items: []
    };
  },
  created() {
    // fetch all project
    this.$http
      .get("/api/projects/")
      .then(rs => {
        this.items = rs.data;
      })
      .finally(() => {});
  }
};
</script>

<style scoped></style>
