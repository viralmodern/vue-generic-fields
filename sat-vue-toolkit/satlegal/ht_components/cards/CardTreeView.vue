<template>
  <v-card :to="routeForDetail">
    <v-card-text>
      <v-row no-gutters class="align-center">
        <v-col cols="6">
          <v-row no-gutters>
            <span class="subheading">{{ item.cardName }}</span>
            <ListLabel :labels="labelsJoin" />
          </v-row>
          <div>
            <TaskSummary
              :deadline="item.duaDate"
              :hasDescription="item.hasDescription"
              :numberOfComments="(item.ticketMessages || []).length"
              :numberOfAttachments="(item.attachment || []).length"
              :checklist="calculateCheckListNumber(item.checkList)"
            />
          </div>
        </v-col>
        <v-col cols="5">
          <AvatarListUser v-if="item.members && item.members.length" :members="membersJoin" />
          <span v-else>(no members)</span>
        </v-col>
        <v-col cols="1" class="d-flex justify-end">
          <MenuTreeCard @showViewDetail="showViewDetail" @openModalConfirm="isShowPopup = true" />
        </v-col>
        <ConfirmItem
          :isShowPopup="isShowPopup"
          @remove="confirmDelete(item)"
          @cancel="isShowPopup = false"
          messageConfirm="Please confirm you are deleting this card?"
        />
      </v-row>
    </v-card-text>
    <v-divider />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ListLabel from "../list/ListLabel";
import TaskSummary from "../list/TaskSummary";
import AvatarListUser from "../avatars/AvatarListUser";
import MenuTreeCard from "../menus/MenuTreeCard";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  components: {
    ListLabel,
    TaskSummary,
    AvatarListUser,
    MenuTreeCard,
    ConfirmItem
  },
  props: {
    item: Object,
    dataListLabel: Array
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    calculateCheckListNumber(checklist) {
      return {
        total: checklist.map(x => x.list.length).reduce((a, b) => a + b, 0),
        done: checklist
          .map(x => x.list.filter(x => x.status).length)
          .reduce((a, b) => a + b, 0)
      };
    },
    confirmDelete(item) {
      this.$emit("confirmDelete", item);
      this.isShowPopup = false;
    },
    showViewDetail() {
      this.$router.push(this.routeForDetail);
    }
  },
  computed: {
    routeForDetail() {
      return {
        name: "CardDetail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          cardId: 189
        }
      };
    },
    labelsJoin() {
      return (this.dataListLabel || []).filter(x =>
        (this.item.labels || []).includes(x.id)
      );
    },
    membersJoin() {
      return (this.members || []).filter(x =>
        (this.item.members || []).includes(x.id)
      );
    },
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
