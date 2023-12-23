<template>
  <td
    class="changeSelect"
    v-bind:style="{
      backgroundColor: showClassColor(getData(dataRow.favorable).name)
    }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ getData(dataRow.favorable).name }}</span>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in favorable"
          :key="index"
          @click="changeFavorable(item.id)"
        >
          <v-chip
            class="white--text"
            rounded
            :color="showClassColor(item.name)"
            small
            >{{ item.id }}: {{ item.name }}</v-chip
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    changeFavorable(item) {
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          favorable: item
        }
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "plaintiff") {
        return "#8E24AA";
      } else if (name == "defendant") {
        return "#2196F3";
      } else {
        return "#3E2723";
      }
    },
    getData(id) {
      return this.favorable.find(x => x.id === id);
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/favorable", ["favorable"])
  }
};
</script>
<style scoped>
.showBackground {
  border-radius: 10px;
}
.changeSelect {
  text-align: center;
  color: white;
  border: 3px solid transparent;
  background-clip: padding-box;
}
</style>
