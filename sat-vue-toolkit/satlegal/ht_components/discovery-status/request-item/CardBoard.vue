<template>
  <v-card :to="routeForDetail" class="card card-content">
    <ImageResponsive
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXNT9R3uhBBxIg0N7SkH9OWrfRvrORlbreGwlxHLrDcPwULOeY"
      minHeight="140"
      aspectRatio="2.75"
    />
    <confirmDeleteBoard @removeItems="$emit('removeRequestItem', item)" class="btn-edit-card ma-0" />
    <v-card-text class="py-4">
      <div class="py-1">
        <v-text-field
          hide-details
          :value="item.name"
          class="ma-0 pa-0 custom-text-field"
          @change="$emit('updateRequestItem', {name: $event})"
          @click.prevent
        ></v-text-field>
      </div>
      <div class="py-1">
        <TaskSummary
          :deadline="item.deadline"
          :numberOfComments="item.total_notes"
          :numberOfAttachments="item.total_attachments"
        />
      </div>
      <div>
        <AvatarListUser :members="membersJoin" :justifyEnd="true" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ImageResponsive from "../../images/ImageResponsive";
import TaskSummary from "../../list/TaskSummary";
import AvatarListUser from "../../avatars/AvatarListUser";
import confirmDeleteBoard from "../../dialogs/confirmDeleteBoard";
export default {
  components: {
    ImageResponsive,
    TaskSummary,
    AvatarListUser,
    confirmDeleteBoard
  },
  props: {
    item: Object
  },
  computed: {
    routeForDetail() {
      return {};
    },
    membersJoin() {
      return (this.members || []).filter(x =>
        (this.item.members || []).includes(x.id)
      );
    },
    ...mapGetters("ht_store/project/members", ["members"])
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  border-radius: 3px;
}
.btn-edit-card {
  position: absolute;
  z-index: 1;
  display: none;
  right: 2px;
  top: 0px;
}
.card-content:hover {
  cursor: pointer;
}
.card-content:hover .btn-edit-card {
  display: block;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
