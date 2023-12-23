<template>
  <v-card :to="routeForDetail" class="card card-content">
    <ImageResponsive
      :imageUrl="item.coverPhoto &&  item.coverPhoto.imageUrl"
      minHeight="140"
      aspectRatio="2.75"
    />
    <confirmDeleteBoard @removeItems="$emit('emitRemoveItem', item)" class="btn-edit-card ma-0"/>
    <v-card-text class="py-2">
      <div class="ListLabel py-1">
        <ListLabel :labels="labelsJoin"/>
      </div>
      <div class="pa-1">
        <v-text-field
          hide-details
          :value="item.cardName"
          class="ma-0 pa-0 custom-text-field"
          @click.prevent
          v-model="newValue"
        ></v-text-field>
        <span v-if="isShowValidationTaskName" class="red--text text-caption">Task name is required</span>
      </div>
      <div class="py-1">
        <TaskSummary
          :deadline="item.duaDate"
          :hasDescription="item.hasDescription"
          :numberOfComments="(item.ticketMessages || []).length"
          :numberOfAttachments="(item.attachment || []).length"
          :checklist="calculateCheckListNumber(item.checkList)"
        />
      </div>
      <div>
        <AvatarListUser :members="membersJoin" :justifyEnd="true"/>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ImageResponsive from "../images/ImageResponsive";
import ListLabel from "../list/ListLabel";
import TaskSummary from "../list/TaskSummary";
import AvatarListUser from "../avatars/AvatarListUser";
import confirmDeleteBoard from "../dialogs/confirmDeleteBoard";
export default {
  data() {
    return {
      isShowValidationTaskName: false,
      newValue: ""
    };
  },
  components: {
    ImageResponsive,
    ListLabel,
    TaskSummary,
    AvatarListUser,
    confirmDeleteBoard
  },
  props: {
    item: Object,
    dataListLabel: Array
  },
  watch: {
    newValue(val) {
      if (val.length) {
        (this.isShowValidationTaskName = false),
          this.$emit("changeTitileCard", val, this.item);
      } else {
        this.isShowValidationTaskName = true;
      }
    }
  },
  mounted() {
    this.newValue = this.item.cardName;
  },
  methods: {
    calculateCheckListNumber(checklist) {
      return {
        total: checklist.map(x => x.list.length).reduce((a, b) => a + b, 0),
        done: checklist
          .map(x => x.list.filter(x => x.status).length)
          .reduce((a, b) => a + b, 0)
      };
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
  top: 2px;
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
