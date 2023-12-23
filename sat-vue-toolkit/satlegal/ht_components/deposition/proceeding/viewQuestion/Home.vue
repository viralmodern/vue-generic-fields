<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col cols="3">
        <LeftMenu
          @toggle="toggle"
          @handleTask="handleTask"
          @addList="e => $emit('addList', e)"
          @addTask="e => $emit('addTask', e)"
          :dataList="dataList"
          :proceeding_items="proceeding_items"
          :dataQuestions="dataQuestions"
        />
      </v-col>
      <v-col cols="9">
        <v-row class="ml-2 align-center" no-gutters>
          <v-icon>bubble_chart</v-icon>
          <span class="subheading">{{ titleExpan }}</span>
        </v-row>
        <div v-for="(item, index) in dataListExpan" :key="index">
          <v-row class="ml-2 align-cent" no-gutters e>
            <v-icon small>filter_none</v-icon>
            <span class="ml-2">{{ item.name }}</span>
          </v-row>
          <v-col cols="12" class="pa-2">
            <ExpansionContent
              :item="item"
              :dataQuestions="dataQuestions"
              @updateQuestions="evt => $emit('updateQuestions', evt)"
            />
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import LeftMenu from "./LeftMenu";
import ExpansionContent from "./ExpansionContent";
export default {
  data() {
    return {
      dataListExpan: [],
      titleExpan: ""
    };
  },
  props: {
    proceeding_items: Array,
    dataList: Array,
    dataQuestions: Array
  },
  components: {
    LeftMenu,
    ExpansionContent
  },
  methods: {
    proceeding(evt) {
      if (evt.type === "proceeding") {
        this.dataListExpan = this.dataList.filter(
          x => x.proceeding_pk === evt.pk
        );
        this.titleExpan = evt.name;
      }
    },
    toggle(evt) {
      this.proceeding(evt);
      this.$emit("toggle", evt);
      this.$emit("getListFromApi", {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: evt.deposition,
        boardId: evt.pk
      });
    },
    handleTask(evt) {
      this.proceeding(evt);
    }
  },
  mounted() {
    this.dataListExpan = this.dataList.filter(x => x.proceeding_pk === 1) || [];
    this.titleExpan = (this.proceeding_items[0] || {}).name;
  },
  watch: {
    dataList(val) {
      if (val) {
        this.dataListExpan = val.filter(x => x.proceeding_pk === 1) || [];
        this.titleExpan = (this.proceeding_items[0] || {}).name;
      }
    }
  }
};
</script>
