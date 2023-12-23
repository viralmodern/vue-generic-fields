<template>
  <v-row no-gutters class="mt-1">
    <v-col>
      <MenuListLinkRecored
        style="flex-wrap: unset;"
        title="List"
        :value="subTaskValue"
        :list="dataSubTask"
        name="tasks"
        keySearch="name"
        @select="$emit('update', $event)"
      >
        <template slot="sectionCustom">
          <h3 class="title pl-2">Add Subtask</h3>
        </template>
      </MenuListLinkRecored>
    </v-col>
    <v-row no-gutters class="mt-1">
      <v-col cols="6" class="pa-1" v-for="item in subTaskJoin" :key="item.id">
        <ProjectSubTasks
          @deleteSubTask="deleteSubTask(item.id)"
          :name="item.name"
          :zoom="item.zoom"
          :code="item.code"
          :progress="item.progress"
          :content="item.content"
          :tags="item.tags"
        />
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import ProjectSubTasks from "../cards/ProjectSubTasks";
import MenuListLinkRecored from "../menus/MenuListLinkRecored";

export default {
  props: {
    dataSubTask: Array,
    subTaskValue: Array
  },
  components: {
    ProjectSubTasks,
    MenuListLinkRecored
  },
  computed: {
    subTaskJoin() {
      return (this.dataSubTask || []).filter(x =>
        (this.subTaskValue || []).includes(x.id)
      );
    }
  },
  methods: {
    deleteSubTask(id) {
      this.$emit(
        "update",
        this.subTaskValue.filter(subtask => subtask !== id)
      );
    }
  }
};
</script>
