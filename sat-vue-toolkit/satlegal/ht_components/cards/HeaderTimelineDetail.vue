<template>
  <v-row no-gutters>
    <v-col cols="9">
      <v-text-field
        hide-details
        class="ma-0 pa-0 custom-text-field title"
        :value="item.name"
        @change="updateDetail('name', $event)"
      ></v-text-field>
      <v-textarea
        hide-details
        name="input-7-1"
        :value="item.desc"
        class="mt-2 pa-0 custom-text-field"
        @change="updateDetail('desc', $event)"
      ></v-textarea>
    </v-col>
    <v-col cols="3">
      <MenuListMembers
        style="flex-wrap: unset;"
        title="List Characters"
        :value="item.members && item.members.map(x => x.user)"
        :list="members"
        name="Characters"
        keySearch="name"
        @select="update"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MenuListMembers from "../menus/MenuListMembers";
export default {
  components: {
    MenuListMembers
  },
  props: {
    item: Object
  },
  data() {
    return {
      nameTimeline: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline", ["updateTimelineDetail"]),
    update(val) {
      const { projectId, timelineId } = this.$route.params;
      const isSome = this.item.members.some(
        x => x.user === val[val.length - 1]
      );
      if (!isSome && val.length > 0) {
        this.$emit("updateMembers", {
          type: "add",
          userId: val,
          matterId: projectId,
          timelineId
        });
      } else {
        var user = this.item.members.filter(x => {
          return !val.includes(x.user);
        });
        this.$emit("updateMembers", {
          type: "remove",
          userId: user[0].pk,
          id: user[0].user,
          matterId: projectId,
          timelineId
        });
      }
    },
    updateDetail(name, val) {
      const { projectId, timelineId } = this.$route.params;
      this.updateTimelineDetail({
        matterId: projectId,
        timelineId,
        body: {
          [name]: val
        }
      });
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
