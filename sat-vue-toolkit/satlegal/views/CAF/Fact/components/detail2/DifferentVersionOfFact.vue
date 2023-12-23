<template>
  <div>
    <div>
      <h3>
        Different version of fact
        <v-btn class="ma-0" icon @click="isShow = true">
          <v-icon>mdi-add_circle_outline</v-icon>
        </v-btn>
        <AddFeelingOfFact :isShow="isShow"  @submit="addDataFeelings" @closeModel="isShow = false"/>
      </h3>
    </div>
    <div class="ma-2">
      <FeelingItem
        class="my-2"
        v-for="item in feelingsJoin"
        :key="item.id"
        :imageUrl="(item.avatar || {}).imageUrl"
        :name="item.name"
        :feelings="item.feelings"
        @updateComment="updateDataFeelingsRequest"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FeelingItem from "../cards/FeelingItem";
import AddFeelingOfFact from "../dialogs/AddFeelingOfFact";
export default {
  components: {
    FeelingItem,
    AddFeelingOfFact
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    feelingsJoin() {
      const result = [];
      const group = {};
      if (!this.dataFeelings.length) return [];
      this.dataFeelings.forEach(x => {
        x.characters.forEach(id =>
          (group[id] = group[id] || []).push({ id: x.id, comment: x.comment })
        );
      });
      Object.keys(group).forEach(charactersId => {
        const characterJoin = this.character.find(x => x.id == charactersId);
        result.push({
          id: charactersId,
          ...characterJoin,
          feelings: group[charactersId]
        });
      });
      return result;
    },
    ...mapGetters("ht_store/project/research/facts/detail/feelings", ["dataFeelings"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    addDataFeelings(data){
      data.id = Math.random()
      this.addDataFeelingsRequest(data)
    },
    ...mapActions("ht_store/project/research/facts/detail/feelings", [
      "addDataFeelingsRequest",
      "updateDataFeelingsRequest",
    ])
  }
};
</script>

<style>
.avatar {
  border-right: 1px solid #d0cbcb;
}
</style>


