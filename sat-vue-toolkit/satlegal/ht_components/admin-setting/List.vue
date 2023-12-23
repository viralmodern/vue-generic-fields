<template>
  <div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="dataUsers.list"
      :options="pagination"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td class="text-xs-left">
              <UserAvatar
                :avatarSize="32"
                :imageUrl="(item || {}).avatar"
                :name="item.name"
              />
              {{ item.fullName }}
              <GeneralChip :text="item.role" :xSmall="true" />
            </td>
            <td class="text-xs-left">{{ item.email }}ssss</td>
            <td class="ml-4 layout px-0">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-edit</v-icon>
              <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination
        v-model="pagination.page"
        :total-visible="7"
        :length="pages"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import GeneralChip from "../chips/GeneralChip";

export default {
  components: {
    UserAvatar,
    GeneralChip
  },
  props: {
    dataUsers: Object,
    loading: Boolean
  },
  data() {
    return {
      pagination: {},
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Action", value: "action" }
      ]
    };
  },
  methods: {
    editItem(item) {
      this.$emit("editUser", item);
    },
    deleteUser(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$emit("deleteUser", item);
    }
  },
  computed: {
    pages() {
      if (
        !this.pagination ||
        !this.pagination.rowsPerPage ||
        !this.dataUsers.totals
      )
        return 0;
      return Math.ceil(this.dataUsers.totals / this.pagination.rowsPerPage);
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
.v-chip--x-small {
  font-size: 10px;
  height: 16px !important;
}
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
