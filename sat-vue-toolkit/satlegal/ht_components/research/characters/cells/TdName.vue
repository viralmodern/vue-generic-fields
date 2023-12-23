<template>
  <td>
    <v-menu
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-row no-gutters class="align-center" v-on="on">
          <UserAvatar
            :imageUrl="(dataRow.avatar || {}).imageUrl"
            :name="dataRow.avatar.name"
            :avatarSize="32"
          />
          <span class="pl-1" style="width:125px">{{
            dataRow.avatar.name
          }}</span>
        </v-row>
      </template>
      <v-list class="px-2">
        <v-text-field
          label="First name"
          :value="dataRow.first_name"
          @change="update({ id: dataRow.id, first_name: $event })"
        />
        <v-text-field
          label="Last name"
          :value="dataRow.last_name"
          @change="update({ id: dataRow.id, last_name: $event })"
        />
      </v-list>
    </v-menu>
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
    column: Object,
    dataRow: Object
  },
  methods: {
    update(data) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.updateDataCharacterRequest({ matterId, data });
    },
    ...mapActions("ht_store/matter/character", ["updateDataCharacterRequest"])
  }
};
</script>
