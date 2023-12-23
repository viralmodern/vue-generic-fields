<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>Note Book</v-list-item-title>
      <v-icon @click="$emit('openModal')">mdi-add_circle</v-icon>
    </v-list-item>
    <v-list-item v-if="loadingDataMenu">
      <v-progress-linear height="2" :indeterminate="true"></v-progress-linear>
    </v-list-item>
    <v-list-group v-else prepend-icon="bookmark_border" value="true">
      <v-list-item v-slot:activator="{ on }">
        <v-list-item-title v-on="on">{{ dataMenu.name }}</v-list-item-title>
      </v-list-item>
      <v-list subheader>
        <v-list-item
          v-for="itemChild in dataMenu"
          to="/"
          :key="itemChild.id"
          class="board-item py-2"
        >
          <v-row no-gutters  class="d-flex justify-center align-center">
            <v-col cols="11">
              <v-row no-gutters class="text-body-2">
                {{ itemChild.name }}
                <v-spacer></v-spacer>
                <span>&nbsp;&nbsp;{{ itemChild.count }}</span>
              </v-row>
              <ProgressNotebook
                :color="itemChild.color"
                :top="getCountNotebookMax"
                :count="itemChild.count"
              />
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-list-group>
    <v-list-item @click="getDataNotebookTrash">
      <v-list-item-action>
        <v-icon>restore_from_trash</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Trash&nbsp;{{ countTrash }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ProgressNotebook from "../progress-bars/NotebookProgress";
export default {
  data() {
    return {
      tags: []
    };
  },
  components: {
    ProgressNotebook
  },
  methods: {
    getDataNotebookTrash() {},
    ...mapActions("ht_store/noteBook", ["getDataMenuRequest", "doFilter"]),
    ...mapActions("ht_store/noteBook/trash", ["getDataNotebookTrashRequest"]),
    ...mapMutations("ht_store/noteBook", ["tagsNotebook"])
  },
  computed: {
    countTrash() {
      const count = this.dataNotebookTrash.length;
      return count ? `(${count})` : "";
    },
    ...mapGetters("ht_store/noteBook", ["dataMenu", "loadingDataMenu"]),
    ...mapGetters("ht_store/noteBook/trash", ["dataNotebookTrash"]),
    getCountNotebookMax() {
      return Math.max.apply(
        Math,
        this.dataMenu.map(x => x.count)
      );
    }
  },
  mounted() {
    this.getDataMenuRequest();
    this.getDataNotebookTrashRequest();
  },
  watch: {
    tags(val) {
      this.tagsNotebook(val);
      this.doFilter({ pageSize: 10, page: 0 });
    }
  }
};
</script>
