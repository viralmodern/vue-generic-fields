<template>
  <v-row no-gutters>
    <v-col cols="12" sm="3" v-for="item in items" :key="item.id" class="my-2">
      <v-col
        v-bind:style="{ backgroundColor: item.color }"
        class="characterCard text-xs-center white--text mx-1 mb-2"
        >{{ item.name }}</v-col
      >
      <v-row
        no-gutters
        class="mt-1 pa-2 mx-1 characterParrent"
        v-for="val in dataCharacterGroup[item.id]"
        :key="val.id"
        :style="{ backgroundColor: convertColor(item.color) }"
      >
        <span
          class="characterItem"
          v-bind:style="{ backgroundColor: val.status.color }"
        ></span>
        <ItemCharacter
          :title="val.title"
          :content="val.causeOfActions"
          :to="showLink(val.id)"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import ItemCharacter from "../cards/ItemCharacter";
import { convertColor } from "../../ht_helpers/color.js";
import { mapGetters } from "vuex";
export default {
  props: {
    items: Array
  },
  data() {
    return {
      convertColor
    };
  },
  methods: {
    showLink(id) {
      let listType = this.$route.params.listType;
      let groupType = this.$route.params.groupType;
      let projectId = this.$route.params.matter || this.$route.params.projectId;
      return {
        name: "factDetail",
        params: {
          projectId: projectId,
          listType: listType,
          groupType: groupType,
          factId: id
        }
      };
    }
  },
  components: {
    ItemCharacter
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataCharacterGroup"])
  }
};
</script>
<style scoped>
.characterCard {
  border-radius: 20px;
  height: 40px;
  line-height: 40px;
}
.characterParrent {
  position: relative;
  border-radius: 10px;
  border-top-right-radius: 0px;
}
.characterItem {
  position: absolute;
  height: 10px;
  width: 10px;
  top: 5px;
  right: 5px;
  border-radius: 5px;
}
</style>
