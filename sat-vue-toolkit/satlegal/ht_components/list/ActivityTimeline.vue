<template>
  <div>
    <SlickTable :items="dataActivities" :headers="headers.filter(x=> x.visible)">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @updateDataActivities="updateDataActivitiesRequest({
            id: props.dataRow.id,
            matterId:$route.params.matter || $route.params.projectId,
            timelineId: $route.params.timelineId,
            body: {[props.column.name]: $event}
            })"
          @deleteItemActivity="deleteItemActivity"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdEventNameActivity from "../timeline/TdEventNameActivity";
import TdStartDateActivity from "../timeline/TdStartDateActivity";
import TdEndDateActivity from "../timeline/TdEndDateActivity";
import TdDescriptionActivity from "../timeline/TdDescriptionActivity";
import TdAttachmentActivity from "../timeline/TdAttachmentActivity";
import TdNoteActivity from "../timeline/TdNoteActivity";
import TdCharacterActivity from "../timeline/TdCharacterActivity";
import TdCommentActivity from "../timeline/TdCommentActivity";
import TdTagActivity from "../timeline/TdTagActivity";
import ActionActivity from "../timeline/ActionActivity";
export default {
  components: {
    SlickTable,
    TdEventNameActivity,
    TdStartDateActivity,
    TdEndDateActivity,
    TdDescriptionActivity,
    TdAttachmentActivity,
    TdNoteActivity,
    TdCharacterActivity,
    TdCommentActivity,
    TdTagActivity,
    ActionActivity
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Event name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Start date",
          value: "start",
          name: "start"
        },
        {
          visible: true,
          sortable: false,
          text: "End date",
          value: "end",
          name: "end"
        },
        {
          visible: true,
          sortable: false,
          text: "Description",
          value: "desc",
          name: "desc"
        },
        {
          visible: true,
          sortable: false,
          text: "Attachment",
          value: "attachments",
          name: "attachments"
        },
        {
          visible: true,
          sortable: false,
          text: "Note",
          value: "note",
          name: "note"
        },
        {
          visible: true,
          sortable: false,
          text: "Tags",
          value: "tag",
          name: "tag"
        },
        {
          visible: true,
          sortable: false,
          text: "Character",
          value: "members",
          name: "members"
        },
        {
          visible: true,
          sortable: false,
          text: "Comment",
          value: "comment",
          name: "comments"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/detail/activities", [
      "dataActivities"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdEventNameActivity;
      }
      if (columnName === "start") {
        return TdStartDateActivity;
      }
      if (columnName === "end") {
        return TdEndDateActivity;
      }
      if (columnName === "desc") {
        return TdDescriptionActivity;
      }
      if (columnName === "attachments") {
        return TdAttachmentActivity;
      }
      if (columnName === "note") {
        return TdNoteActivity;
      }
      if (columnName === "members") {
        return TdCharacterActivity;
      }
      if (columnName === "comments") {
        return TdCommentActivity;
      }
      if (columnName === "tag") {
        return TdTagActivity;
      }
      if (columnName === "action") {
        return ActionActivity;
      }
      return "td";
    },
    deleteItemActivity(id) {
      const { projectId, timelineId } = this.$route.params;
      this.deleteItemActivityTimelineRequest({
        matterId: projectId,
        timelineId,
        id
      });
    },
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "updateDataActivitiesRequest",
      "deleteItemActivityTimelineRequest"
    ])
  }
};
</script>
