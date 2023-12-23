<template>
  <v-list-item avatar class="list-item" :to="routerLinkDetail">
    <v-list-item-action class="mr-3">
      <v-row no-gutters class="justify-content align-center d-flex">
        <v-checkbox
          :value="item.isCheckbox"
          @click.native.prevent="$emit('checkBoxItem', item)"
        ></v-checkbox>
        <v-btn
          icon
          @click.native.prevent="updateStar(item)"
          :disabled="item.is_removed"
        >
          <v-icon :color="item.starred ? 'primary' : ''">{{
            item.starred ? "star" : "star_border"
          }}</v-icon>
        </v-btn>
      </v-row>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title
        :style="
          `text-decoration: ${item.done === true ? 'line-through;' : 'none'}`
        "
        v-text="item.title"
      ></v-list-item-title>
      <v-row no-gutters>
        <v-chip
          style="height: 20px;"
          v-for="(chip, index) in item.labels.slice(0, 3)"
          :key="index"
          :color="`#` + chip.color"
          text-color="white"
          >{{ chip.name }}</v-chip
        >
        <v-chip
          v-if="item.labels.length > 5"
          style="height: 20px;"
          color="primary"
          text-color="white"
          >+{{ item.labels.length - 3 }}</v-chip
        >
      </v-row>
    </v-list-item-content>

    <v-list-item-avatar>
      <v-tooltip bottom v-if="item.users">
        <template v-slot:activator="{ on }">
          <UserAvatar
            v-on="on"
            class="mb-2"
            :avatarSize="36"
            :imageUrl="item.users.avatar.imageUrl"
            :name="item.users.avatar.name"
          />
        </template>
        <span>{{ item.users.avatar.name }}</span>
      </v-tooltip>
    </v-list-item-avatar>
  </v-list-item>
</template>
<script>
import UserAvatar from "../../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    item: Object
  },
  computed: {
    routerLinkDetail() {
      var { depositionId, projectId } = this.$route.params;
      var checklistId = this.item.pk;
      return `/project/${projectId}/discovery-deposition/detail/${depositionId}/checklist/detail/${checklistId}`;
    }
  },
  methods: {
    updateStar(item) {
      var { depositionId, projectId } = this.$route.params;
      this.$emit("updateStar", {
        taskId: item.pk,
        matterId: projectId,
        depositionId,
        starred: !item.starred
      });
    }
  }
};
</script>
<style scoped>
.list-item /deep/ .v-list--two-line .v-list__tile {
  height: 60px;
  align-items: center;
  display: flex;
  width: 100%;
}
</style>
