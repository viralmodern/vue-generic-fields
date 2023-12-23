<template>
  <v-row  no-gutters>
    <ProjectCheckList
      class="pr-1"
      v-for="checkList in checkListData"
      :key="checkList.id"
      :name="checkList.name"
      :type="checkList.type"
      :finishedItems="checkList.finishedItems"
      :totalItems="checkList.totalItems"
    />
  </v-row>
</template>
<script>
import ProjectCheckList from "../cards/ProjectCheckList";
export default {
  components: {
    ProjectCheckList
  },

  data() {
    return {

    };
  },
  methods: {

  },
  props: {
    checkListData: Array
  }
};
</script>
