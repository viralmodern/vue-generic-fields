<template>
  <v-card>
    <v-row no-gutters class="pa-3">
      <v-col class="pa-3">
        <v-row no-gutters>
          <v-col>
            <CardSelectTask/>
          </v-col>
          <v-col>
            <TaskProjectDetailSelect
              v-if="taskDetail.selects"
              :favorables="taskDetail.selects.favorable"
              :limitations="taskDetail.selects.limitation"
              :treatments="taskDetail.selects.treatment"
              :vulnerabilities="taskDetail.selects.vulnerability"
              :dataSelect="dataSelect"
              @changeFavorables="changeFavorables"
              @changeVulnerability="changeVulnerability"
              @changeTreatment="changeTreatment"
              @changeLimitation="changeLimitation"
            />
          </v-col>
          <v-col>
            <CardDescriptionTask
              v-if="Object.keys(taskDetail).length"
              :taskTitle="taskDetail.title"
              :codeTask="taskDetail.code"
              :descriptionTitle="taskDetail.description"
              :projectDetail="taskDetail.projectDetail"
              :peoples="dataPeoples"
              @editTitle="editTitle"
              @editDescription="editDescription"
            />
          </v-col>
          <v-col class="mt-1">
            <v-col cols="12">
              <v-tabs grow class="px-1">
                <v-tab key="Comments">Comments</v-tab>
                <v-tab key="Work Log">Work Log</v-tab>
                <v-tab key="Tags">Tags</v-tab>
                <v-tab key="Checklist">Checklist</v-tab>
                <v-tab key="SubTasks">SubTasks</v-tab>
                <v-tab key="Notes">Notes</v-tab>
                <v-tab key="Activities">Activities</v-tab>
                <v-tab key="attachment">Attachments</v-tab>
                <v-tab-item key="Comments">
                  <TicketComments
                    v-if="dataAvailableMentions.length"
                    :comments="dataTicketMessages"
                    :mentions="dataAvailableMentions"
                    @send="sendTicketComment"
                  />
                </v-tab-item>
                <v-tab-item key="Work Log">
                  <Worklog
                    v-for="item in dataWorkLog"
                    :key="item.id"
                    :user="item.user"
                    :createdDate="item.createdDate"
                    :comment="item.comment"
                    :timeSpent="item.timeSpent"
                  />
                </v-tab-item>
                <v-tab-item key="Tags">
                  <TabsTaskDetail
                    :dataCitation="dataCitation"
                    :isShowMessage="isShowMessage"
                    :message="message"
                    @addCitation="addCitations"
                    @updateCitation="updateCitations"
                    @deleteCitation="deleteCitations"
                    :members="dataPeoPleGroup"
                    :dataProjectGroup="dataProjectGroup"
                    @deleteMemberInGroup="deleteMemberInGroup"
                    @addGroup="addGroupProject"
                    @deleteCardGroup="deleteGroupPeople"
                    @toggleSelectMember="toggleSelectMember"
                    @addTagInGroup="addTagInGroup"
                    :dataTags="dataTag"
                    @addTagGroup="addTagGroup"
                    @deleteTagInGroup="deleteTagInGroup"
                    :items="dataTagGroup"
                  />
                </v-tab-item>
                <v-tab-item key="Checklist">
                  <ByzantineCheckList
                    nameButton="checklist"
                    :list="dataCheckbox"
                    @addGroup="addGroupChecklist"
                    @checkbox="checkbox"
                    @addItemInGroup="addItemInGroup"
                    @removeGroup="removeGroup"
                    @removeItem="removeItem"
                    @updateItem="updateItem"
                  />
                </v-tab-item>
                <v-tab-item key="SubTasks">
                  <SubTaskDetail :dataSubTask="dataSubTask"/>
                </v-tab-item>
                <v-tab-item key="Notes">
                  <ByzantineNote
                    :listNotes="dataListNotes"
                    @edit="editNote"
                    @create="createNote"
                    @remove="removeNote"
                  />
                </v-tab-item>
                <v-tab-item key="Activities">
                  <TaskUserActivities :items="dataActivities"/>
                </v-tab-item>
                <v-tab-item key="attachment">
                  <ProjectAttachment
                    :dataAttachment="dataFiles"
                    @addFilesAttachment="uploadFiles"
                    @removeAttachment="deleteFile"
                    @updateRateAttachment="updateRateFile"
                  />
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import CardSelectTask from "./CardSelectTask";
import ProjectAttachment from "./ProjectAttachment";
import TaskProjectDetailSelect from "../project/TaskProjectDetailSelect";
import CardDescriptionTask from "./CardDescriptionTask";
import TabsTaskDetail from "../task-detail/TabsTaskDetail";
import SubTaskDetail from "../task-detail/SubTaskDetail";
import TaskUserActivities from "../task-detail/TaskUserActivities";
import ByzantineCheckList from "./ByzantineCheckList";
import TicketComments from "../messages/TicketComments";
import ByzantineNote from "./ByzantineNote";
import Worklog from "./Worklog";
import data from "../../mock-data/task-detail.js";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isShowSnackbarSelect: false,
      isShowMessage: false,
      message: ""
    };
  },
  components: {
    CardDescriptionTask,
    TabsTaskDetail,
    SubTaskDetail,
    TaskUserActivities,
    ByzantineCheckList,
    TicketComments,
    ByzantineNote,
    Worklog,
    CardSelectTask,
    TaskProjectDetailSelect,
    ProjectAttachment
  },
  methods: {
    editTitle(val) {
      this.editTitle(val);
    },
    editDescription(val) {
      this.editDescription(val);
    },
    changeFavorables(val) {
      this.changeFavorable(val);
    },
    changeVulnerability(val) {
      this.changeVulnerability(val);
    },
    changeTreatment(val) {
      this.changeTreatment(val);
    },
    changeLimitation(val) {
      this.changeLimitation(val);
    },
    createNote(data) {
      this.addNotes(data);
    },
    editNote(id, data) {
      let value = {
        id: id,
        title: data.title,
        content: data.description
      };
      this.editNotes(value);
    },
    removeNote(id) {
      this.deleteNotes(id);
    },
    removeGroup(id) {
      this.deleteGroupChecklist(id);
    },
    removeItem(data) {
      this.deleteItemChecklist(data);
    },
    addItemInGroup(data) {
      this.addItemInGroupChecklist(data);
    },
    checkbox(data) {
      this.checkbox(data);
    },
    addGroupChecklist(groupName) {
      this.addGroupChecklist(groupName);
    },
    deleteFile(id) {
      this.deleteFile(id);
    },
    uploadFiles(files) {
      const data = files.map(x => ({
        id: Math.random(),
        coverPhoto: {
          imageUrl: x.dataURL
        },
        rate: false,
        name: x.name,
        createAt: new Date().toISOString()
      }));
      this.uploadFile(data);
    },
    updateRateFile(id) {
      this.updateRateFile(id);
    },
    closeDialog() {
      this.$emit("closeModal");
    },
    ...mapActions("ht_store/task/detail/description", ["getDataTaskDetailRequest"]),
    ...mapActions("ht_store/task/detail/worklog", ["getDataWorkLogRequest"]),
    ...mapActions("ht_store/task/detail/comment", [
      "getDataTicketMessagesRequest",
      "getDataAvailableMentionsRequest"
    ]),
    ...mapActions("ht_store/task/detail/tags", [
      "getDataMemberProjectRequest",
      "getDataProjectGroupRequest",
      "getDataTagGroupRequest",
      "getDataTagRequest",
      "getDataPeopleGroupRequest"
    ]),
    ...mapActions("ht_store/task/detail/tags/citation", [
      "getDataCitationRequest",
      "addDataCitationRequest",
      "updateDataCitationRequest"
    ]),
    ...mapActions("ht_store/task/detail", [
      "getDataFileRequest",
      "getDataActivitiesRequest",
      "getDataNotesRequest",
      "getDataSelectRequest",
      "getDataPeopleRequest",
      "getDataTagsRequest"
    ]),
    ...mapActions("ht_store/task/detail/activities", ["getDataActivitiesRequest"]),
    ...mapActions("ht_store/task/detail/notes", ["getDataNotesRequest"]),
    ...mapActions("ht_store/task/detail/checklist", ["getDataCheckboxRequest"]),
    ...mapActions("ht_store/task/detail/subtask", ["getDataSubTaskRequest"]),
    ...mapMutations("ht_store/task/detail/comment", ["sendComment"]),
    ...mapMutations("ht_store/task/detail/notes", [
      "addNotes",
      "deleteNotes",
      "editNotes"
    ]),
    ...mapMutations("ht_store/task/detail/tags", [
      "deleteMemberProject",
      "addGroupProject",
      "addMemberInGroup",
      "addTagsGroup",
      "deleteTagsInGroup",
      "addTagsInGroup",
      "getDeleteChip",
      "getAddChip",
      "deleteGroupPeople",
      "selectMember"
    ]),
    ...mapMutations("ht_store/task/detail/tags/citation", [
      "addCitation",
      "updateCitation",
      "removeCitation"
    ]),
    ...mapMutations("ht_store/task/detail", [
      "deleteFile",
      "uploadFile",
      "updateRateFile"
    ]),
    ...mapMutations("ht_store/task/detail/checklist", [
      "deleteGroupChecklist",
      "deleteItemChecklist",
      "addItemInGroupChecklist",
      "checkbox",
      "addGroupChecklist",
      "updateItemInGroupChecklist"
    ]),
    ...mapMutations("ht_store/task/detail/description", [
      "editTitle",
      "editDescription",
      "changeFavorable",
      "changeVulnerability",
      "changeLimitation",
      "changeTreatment"
    ]),
    async addCitations(data) {
      const result = await this.addDataCitationRequest(data.dataForm);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        data.closeModel();
      }, 500);
      if (result.status) {
        this.addCitation(data.dataForm);
      }
    },
    async updateCitations(data) {
      const result = await this.updateDataCitationRequest(data.dataForm);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        data.closeModel();
      }, 500);
      if (result.status) {
        this.updateCitation(data.dataForm);
      }
    },
    deleteCitations(id) {
      this.removeCitation(id);
    },
    deleteMemberInGroup(group, members) {
      const data = {
        members,
        group
      };
      this.selectMember(data);
    },
    addTagInGroup({ name, group }) {
      this.addTagsInGroup({ name: name, group: group });
    },
    deleteTagInGroup({ group, tag }) {
      this.deleteTagsInGroup({ group: group, tag: tag });
    },
    addTagGroup(data) {
      this.addTagsGroup({ name: data.name, tags: data.tags });
    },
    sendTicketComment(comment) {
      let newComment = { ...data.newComment };
      newComment.commentDate = new Date().toISOString();
      newComment.comment = comment;
      this.sendComment(newComment);
    },
    updateItem(data) {
      this.updateItemInGroupChecklist(data);
    },
    toggleSelectMember(group, members) {
      const dataSelect = {
        id: members.id,
        members,
        group
      };
      if (members.check === false) {
        this.addMemberInGroup(dataSelect);
      } else {
        this.selectMember(dataSelect);
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", ["taskDetail"]),
    ...mapGetters("ht_store/task/detail/comment", [
      "dataTicketMessages",
      "dataAvailableMentions"
    ]),
    ...mapGetters("ht_store/task/detail/tags", [
      "dataProjectGroup",
      "dataMemberProject",
      "dataTagGroup",
      "dataTag",
      "dataPeoPleGroup"
    ]),
    ...mapGetters("ht_store/task/detail/tags/citation", ["dataCitation"]),
    ...mapGetters("ht_store/task/detail/subtask", ["dataSubTask"]),
    ...mapGetters("ht_store/task/detail/activities", ["dataActivities"]),
    ...mapGetters("ht_store/task/detail/notes", ["dataListNotes"]),
    ...mapGetters("ht_store/task/detail/checklist", ["dataCheckbox"]),
    ...mapGetters("ht_store/task/detail", [
      "dataFiles",
      "dataSelect",
      "dataPeoples",
      "dataTags"
    ]),
    ...mapGetters("ht_store/task/detail/worklog", ["dataWorkLog"])
  },
  mounted() {
    this.getDataTaskDetailRequest();
    this.getDataCitationRequest();
    this.getDataProjectGroupRequest();
    this.getDataMemberProjectRequest();
    this.getDataTagGroupRequest();
    this.getDataTagRequest();
    this.getDataSubTaskRequest();
    this.getDataFileRequest();
    this.getDataActivitiesRequest();
    this.getDataCheckboxRequest();
    this.getDataTicketMessagesRequest();
    this.getDataAvailableMentionsRequest();
    this.getDataNotesRequest();
    this.getDataWorkLogRequest();
    this.getDataSelectRequest();
    this.getDataPeopleRequest();
    this.getDataTagsRequest();
    this.getDataPeopleGroupRequest();
  }
};
</script>
