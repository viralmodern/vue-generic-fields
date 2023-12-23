<template>
  <div>
    <div>
      <CreateGoal :labels="labels" @addNewGoal="addNewGoal" />
    </div>
    <v-row no-gutters class="pa-1">
      <v-col
        md="4"
        cols="12"
        v-for="(item, index) in goals"
        :key="index"
        class="pa-2"
      >
        <div class="itemGoal" @click="showCardGoalDetail(item)">
          <CardGoalItem :item="item" :labels="labels" />
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-xs-center">
        <v-btn color="primary" @click="showMore">
          <v-progress-circular
            v-if="isShowLoading"
            indeterminate
            color="white"
          ></v-progress-circular>
          <span v-else>LOAD MORE</span>
        </v-btn>
      </v-col>
    </v-row>
    <CardDetailGoal
      :isShow="isShowDetail"
      @closeModel="closeModel"
      :item="item || {}"
      @changeInfor="changeInfor"
      @changeDesCriptionKey="changeDesCriptionKey"
      @addKeyResult="addKeyResult"
      @changeProgressItem="changeProgressItem"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import CardGoalItem from "../../../ht_components/cards/CardGoalItem";
import CreateGoal from "../../../ht_components/dialogs/CreateGoal";
import CardDetailGoal from "../../../ht_components/dialogs/CardDetailGoal";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    CardGoalItem,
    CreateGoal,
    CardDetailGoal
  },
  data() {
    return {
      isShowLoading: false,
      page: 0,
      isShowDetail: false,
      item: {}
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/goal", ["goals"]),
    ...mapGetters("ht_store/matter/character/characterProfile/goal/label", ["labels"])
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile/goal", [
      "getDataCharacterGoalRequest"
    ]),
    ...mapMutations("ht_store/matter/character/characterProfile/goal", [
      "addNewGoal",
      "changeInfor",
      "changeDesCriptionKey",
      "addKeyResult",
      "changeProgressItem"
    ]),
    async showMore() {
      this.page += 1;
      this.isShowLoading = true;
      await this.getDataCharacterGoalRequest(this.page);
      this.isShowLoading = false;
    },
    closeModel() {
      this.isShowDetail = false;
    },
    showCardGoalDetail(data) {
      this.item = data;
      this.isShowDetail = true;
    }
  }
};
</script>
<style scoped>
.itemGoal {
  cursor: pointer;
}
</style>
