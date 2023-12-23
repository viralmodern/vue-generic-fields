<template>
  <td class="changeSelect" :style="{backgroundColor: typeJoin.color}">
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ typeJoin.name }}</span>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in types" :key="index" @click="change(item)">
          <v-chip
            class="white--text"
            rounded
            :color="item.color"
            small
          >{{ item.id }}: {{ item.name }}</v-chip>
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
  computed: {
    typeJoin() {
      return this.types.find(x => x.id === this.dataRow.type) || {};
    },
    ...mapGetters("ht_store/matter/type", ["types"]),
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    change(item) {
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          type: item.id
        }
      };
      this.updateTask(data);
      this.menu = false;
    }
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
