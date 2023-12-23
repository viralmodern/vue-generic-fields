<template>
  <v-row no-gutters class="mx-3 mb-3">
    <div :class="`border-highlight ${lineColorCard}`"></div>
    <v-col>
      <v-card>
        <v-card-text class="pa-0">
          <v-row no-gutters>
            <v-row no-gutters>
              <v-col cols="12">
                <v-row no-gutters>
                  <NotebookEditor
                    class="px-3 pb-3"
                    :item="sectionContent"
                    @change="updateSectionContent"
                  >
                    <template v-slot:editorBar>
                      <MenuFilingRoom
                        @emitDataComment="
                          newComment => $emit('emitDataComment', newComment)
                        "
                        :dataProjectMembers="dataProjectMembers"
                        :dataLabelProject="dataLabelProject"
                        :availableMentions="availableMentions"
                        :ticketMessages="ticketMessages"
                        class="mx-0"
                      />
                    </template>
                  </NotebookEditor>
                </v-row>
              </v-col>
            </v-row>
            <v-col class="pl-3">
              <ButtonSections
                @showHideSectionHeadline="showHideSectionHeadline"
                :isShow="isShow"
              />
            </v-col>
            <v-col class="pl-3" v-if="isShow">
              <CardCreateChip />
              <ListDocuments
                :dataDocument="dataDocument"
                @emitAddReference="data => $emit('emitAddReference', data)"
              />

              <v-row no-gutters>
                <span class="ml-2 mt-2 text-h5">Approvals</span>
                <v-row no-gutters>
                  <v-col cols="4" class="pa-1">
                    <v-select
                      :v-model="approverL1"
                      item-text="name"
                      return-object
                      item-value="name"
                      :items="dataApproverL1"
                      label="Add L1 Approver"
                      @change="receiveChangeSelect"
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="pa-1">
                    <v-select
                      :v-model="approverL2"
                      item-text="name"
                      return-object
                      item-value="name"
                      :items="dataApproverL1"
                      label="Add L2 Approver"
                      @change="receiveChangeSelect"
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="pa-1">
                    <v-select
                      :v-model="approverL3"
                      item-text="name"
                      return-object
                      item-value="name"
                      :items="dataApproverL3"
                      label="Add L3 Approver"
                      @change="receiveChangeSelect"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-row>

              <v-row no-gutters>
                <CreateFilingRealation
                  title="Add Relations"
                  :rules="[v => !!v || 'Relations name is required']"
                  label="Relations name"
                  class="ml-2"
                  :items="dataRelation"
                  @addRelation="data => $emit('addRelation', data)"
                />

                <ListRelationFiling
                  @emitDeleteRelation="emitDeleteRelation"
                  :dataRelation="dataRelation"
                />
              </v-row>
              <v-row no-gutters>
                <CreateFilingRealation
                  title="Transations"
                  :rules="[v => !!v || 'Transations name is required']"
                  label="Transations name"
                  class="ml-2"
                  :items="dataTransations"
                  @addRelation="data => $emit('addTransations', data)"
                />
                <ListRelationFiling
                  @emitDeleteRelation="emitDeleteTransations"
                  :dataRelation="dataTransations"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ListRelationFiling from "./ListRelationFiling";
import ListDocuments from "./ListDocuments";
import CardCreateChip from "../cards/CardCreateChip";
import CreateFilingRealation from "../menus/CreateFilingRealation";
import ButtonSections from "../buttons/ButtonSections";
import NotebookEditor from "../editor/NotebookEditor";
import MenuFilingRoom from "../menus/MenuFilingRoom";
export default {
  components: {
    ListRelationFiling,
    CardCreateChip,
    NotebookEditor,
    ListDocuments,
    CreateFilingRealation,
    ButtonSections,
    MenuFilingRoom
  },
  props: {
    label: String,
    dataDocument: Array,
    dataRelation: Array,
    dataTransations: Array,
    lineColorCard: String,
    sectionContent: String,
    dataProjectMembers: Array,
    dataLabelProject: Array,
    availableMentions: Array,
    ticketMessages: Array
  },
  data() {
    return {
      approverL1: null,
      approverL2: null,
      approverL3: null,
      isShow: false
    };
  },
  methods: {
    emitDeleteRelation(items, object) {
      const data = {
        relationArray: items,
        relationObject: object
      };
      this.$emit("emitDeleteRelation", data);
    },
    updateSectionContent(html) {
      this.$emit("emitUpdateSectionContent", html);
    },
    emitDeleteTransations(items, object) {
      const data = {
        transationsArray: items,
        transationsObject: object
      };
      this.$emit("emitDeleteTransations", data);
    },
    receiveChangeSelect(object) {
      return object;
    },
    showHideSectionHeadline() {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    dataApproverL1() {
      return this.dataRelation.map(e => e.text);
    },
    dataApproverL2() {
      return this.dataRelation.map(e => e.text);
    },
    dataApproverL3() {
      return this.dataRelation.map(e => e.text);
    }
  }
};
</script>
<style scoped>
.border-highlight {
  width: 5px;
}
</style>
