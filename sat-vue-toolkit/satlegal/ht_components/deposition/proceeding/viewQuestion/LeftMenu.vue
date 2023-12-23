<template>
  <v-list class="list">
    <div
      class="div-tree"
      v-for="(item, index) in proceeding_items"
      :key="index"
    >
      <v-row no-gutters style="flex-direction: column;">
        <v-row
          no-gutters
          class="align-center"
          @click="$emit('toggle', { ...item, type: 'proceeding' })"
        >
          <v-icon>{{
            item.isToggle === true ? "arrow_drop_down" : "arrow_right"
          }}</v-icon>
          <span class="ml-1">{{ item.name }}</span>
        </v-row>

        <div v-if="item.isToggle === true">
          <div v-for="list in dataListFilter(item)" :key="list.pk" class="ml-2">
            <v-row no-gutters>
              <v-row
                no-gutters
                class="align-center"
                @click="$emit('toggle', { ...list, type: 'list' })"
              >
                <v-icon>{{
                  list.isToggle === true ? "arrow_drop_down" : "arrow_right"
                }}</v-icon>
                <v-icon small class="ml-1">filter_none</v-icon>
                <span class="ml-1">{{ list.name }}</span>
              </v-row>

              <div v-if="list.isToggle === true">
                <v-row
                  no-gutters
                  v-for="ques in dataQuestionFilter(list)"
                  :key="ques.pk"
                  class="ml-4"
                  @click="handleTask({ ...item, type: 'proceeding' })"
                >
                  <v-icon small>layers</v-icon>
                  <span class="ml-1">{{ ques.name }}</span>
                </v-row>

                <FormAddInline
                  v-if="
                    itemShowTask && itemShowTask.pk === list.pk ? true : false
                  "
                  :isShow="isShowTask"
                  @cancel="
                    isShowTask = false;
                    itemShowTask = null;
                  "
                  @add="addTask($event, item, list)"
                  class="text-xs-left ml-4"
                />
                <span
                  class="primary--text ml-4"
                  @click="showOnTask(list)"
                  v-else
                  >Add Task</span
                >
              </div>
            </v-row>
          </div>

          <FormAddInline
            v-if="itemShowList && itemShowList.pk === item.pk ? true : false"
            :isShow="isShowList"
            @cancel="
              isShowList = false;
              itemShowList = null;
            "
            @add="addList($event, item)"
            class="text-xs-left ml-4"
          />
          <span class="primary--text ml-4" @click="showOnList(item)" v-else
            >Add List</span
          >
        </div>
      </v-row>
    </div>
  </v-list>
</template>
<script>
import FormAddInline from "../../../forms/FormAddInline";
export default {
  components: {
    FormAddInline
  },
  props: {
    proceeding_items: Array,
    dataList: Array,
    dataQuestions: Array
  },
  data() {
    return {
      isShowTask: false,
      isShowList: false,
      itemShowTask: null,
      itemShowList: null
    };
  },
  methods: {
    showOnList(item) {
      this.isShowTask = true;
      this.itemShowList = item;
    },
    showOnTask(item) {
      this.isShowList = true;
      this.itemShowTask = item;
    },
    dataListFilter(item) {
      return (this.dataList || []).filter(x => x.proceeding_pk === item.pk);
    },
    dataQuestionFilter(item) {
      return (this.dataQuestions || []).filter(x => x.list_pk === item.pk);
    },
    handleTask(item) {
      this.$emit("handleTask", item);
    },
    addTask(name, item, list) {
      var { depositionId, projectId } = this.$route.params;
      var req = {
        pk: Math.random(),
        name,
        title: "",
        question: "",
        result_progress: 1,
        progress: 1,
        list_pk: list.pk,
        matterId: projectId,
        proceeding_pk: item.pk,
        depositionId,
        isToggle: true
      };
      this.$emit("addTask", req);
    },
    addList(name, item) {
      var { depositionId, projectId } = this.$route.params;
      var req = {
        pk: Math.random(),
        name,
        isToggle: true,
        proceeding_pk: item.pk,
        matterId: projectId,
        depositionId
      };
      this.$emit("addList", req);
    }
  }
};
</script>
<style scoped>
.list {
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #c1c1c1;
  /* height: calc(100vh - 212px); */
}
.div-tree {
  width: 100%;
  cursor: pointer;
}
</style>
