<template>
  <v-menu offset-x transition="scale-transition" :nudge-width="150">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary">
        Manage Board
        <v-icon right>mdi-dashboard</v-icon>
      </v-btn>
    </template>
    <v-list class="py-3">
      <ProjectItemBoard
        v-for="item in dataListBoard"
        :key="item.id"
        :to="{ name: 'DigitalHoweyChecklist', params: { id: item.id, type: $route.params.type }}"
        :name="item.name"
        :done="item.done"
        :total="item.total"
        @deleteBoard="deleteBoard(item)"
      />
      <div>
        <v-btn v-if="!isAdd" @click.native.stop="isAdd = true" class="primary ml-3">Add a board</v-btn>
        <AddInline v-else class="ml-3 mr-2" @add="add" @close="isAdd = false"/>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectItemBoard from "../list/ProjectItemBoard";
import AddInline from "../inputs/AddInline";
export default {
  data() {
    return {
      isAdd: false
    };
  },
  components: {
    ProjectItemBoard,
    AddInline
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist", ["dataListBoard"])
  },
  methods: {
    add(text) {
      const data = {
        id: Math.random(),
        name: text,
        done: 0,
        total: 0
      };
      this.addBoardRequest(data);
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist", [
      "addBoardRequest",
      "deleteBoard"
    ])
  }
};
</script>
