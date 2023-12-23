<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading"
      :items="dataProjects.list"
      :pagination.sync="pagination"
      :total-items="dataProjects.totals"
      select-all
      class="elevation-1 filterable-table"
    >
      <template slot="headerCell" slot-scope="header">
        <span>{{header.header.text}}</span>
        <span class="right-filter" v-if="header.header.value==='deadline'">
          <ProgressFilter/>
        </span>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-checkbox v-model="props.selected" hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <div class="td-flex-space-around">
            <UserAvatar
              :avatarSize="32"
              :imageUrl="(props.item.project||{}).imageUrl"
              :name="props.item.project.name"
            />
            <router-link
              class="ml-2 project-name"
              :to="`/project/${props.item.id}`"
            >{{ props.item.project.name }}</router-link>
          </div>
        </td>
        <td class="text-xs-left">{{ props.item.contactPersion }}</td>
        <td class="text-xs-left">{{ props.item.projectLead }}</td>
        <td class="text-xs-left td-flex-space-around">
          <div class="td-flex-space-around">
            <UserAvatar
              v-for="item in props.item.team"
              :key="item.name"
              class="ml-1"
              :imageUrl="(item||{}).imageUrl"
              :name="item.name"
              :avatarSize="32"
            />
          </div>
        </td>
        <td class="text-xs-left">
          <v-chip small>
            <v-icon left>access_time</v-icon>
            <TimerLabel :time="props.item.deadline"/>
          </v-chip>
        </td>
        <td class="text-xs-left">
          <v-row no-gutters style="width: 100px" class="align-center justify-center">
            <h6
              :class="props.item.progress.type === true ? `primary--text` : `error--text`"
            >{{props.item.progress.value}} %</h6>
            <v-progress-linear
              class="ma-0"
              :color="props.item.progress.type === true ? `primary` : `error`"
              v-model="props.item.progress.value"
            />
          </v-row>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination v-model="pagination.page" :total-visible="7" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import ProgressFilter from "../filter/ProgressFilter";
import TimerLabel from "../labels/TimerLabel";

export default {
  components: {
    UserAvatar,
    ProgressFilter,
    TimerLabel
  },
  props: {
    dataProjects: Object,
    loading: Boolean
  },
  data() {
    return {
      pagination: {},
      selected: [],
      headers: [
        { text: "Project Name", value: "name" },
        { text: "Contact person", value: "person" },
        { text: "Project Lead", value: "lead" },
        { text: "Team", value: "team" },
        { text: "Deadline", value: "deadline" },
        { text: "Progress", value: "progress" }
      ]
    };
  },
  computed: {
    pages() {
      if (
        !this.pagination ||
        !this.pagination.rowsPerPage ||
        !this.dataProjects.totals
      )
        return 0;
      return Math.ceil(this.dataProjects.totals / this.pagination.rowsPerPage);
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$emit("getData", this.pagination);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.project-name {
  line-height: 1 !important;
}
.td-flex-space-around {
  justify-content: space-around;
  flex-direction: row;
  display: flex;
  align-items: center;
}
.right-filter {
  position: absolute;
  top: 8px;
  right: 0px;
}
.right-filter /deep/ .v-icon {
  opacity: 1 !important;
  transform: none !important;
}
.filterable-table /deep/ th.column {
  position: relative !important;
}
</style>
