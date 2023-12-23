<template>
  <td>
    <v-row no-gutters>
      <UserAvatar
        class="mr-2"
        :name="dataRow.user.name"
        :imageUrl="dataRow.user.imageUrl"
        :avatarSize="32"
      />
      <v-textarea
        hide-details
        name="input-7-1"
        :value="dataRow.user.name"
        class="ma-0 pa-0 custom-text-field input-size"
        @input="change"
        rows="1"
      ></v-textarea>
    </v-row>
  </td>
</template>
<script>
import { mapActions } from "vuex";
import UserAvatar from "../../../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail/addressbook", ["updateTask"]),
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 200px;
  font-size: 13px;
}
</style>
