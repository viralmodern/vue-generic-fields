<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search proceeding" />
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="changeQueryRouter"
        />
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            :hideFieldIndex="['drag']"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <v-expansion-panels
      class="v-expansion-panels--custom"
      multiple
      v-model="panel"
    >
      <v-expansion-panel
        style="width:100vh"
        v-for="(groupItem, i) in groupBy.list"
        :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">
              {{ groupItem.text }}
            </div>
            <div class="flex-grow-1"></div>
            <v-chip
              class="ml-2 text-body-2 badge"
              small
              style="position:sticky; right: 40px;"
            >
              <span class="font-weight-bold mr-2"
                >{{
                  dataQuestionStatus[groupItem.groupID]
                    ? dataQuestionStatus[groupItem.groupID].results.length
                    : 0
                }}
                Proceedings</span
              >
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGrid
            hide-default-header
            hide-default-footer
            :headers="headersFilter"
            :desserts="
              dataQuestionStatus[groupItem.groupID]
                ? dataQuestionStatus[groupItem.groupID].results
                : []
            "
          >
            <template v-slot:item.question="{ props: { item } }">
              <TextArea :value="item.question" />
            </template>
            <template v-slot:item.answer="{ props: { item } }">
              <TextArea :value="item.answer" />
            </template>
            <template v-slot:item.follow_up="{ props: { item } }">
              <Disputed
                :value="item.follow_up"
              />
            </template>
            <template v-slot:item.follow_up="{ props: { item } }">
              <Disputed
                :value="item.follow_up"
              />
            </template>
            <template v-slot:item.alert="{ props: { item } }">
              alert
            </template>
            <template v-slot:item.attorney_objection="{ props: { item } }">
              <Disputed
                :value="item.attorney_objection"
              />
            </template>
            <template v-slot:item.objection_context="{ props: { item } }">
              <TextArea :value="item.objection_context" />
            </template>
            <template v-slot:item.prior_statement="{ props: { item } }">
              <TextArea :value="item.prior_statement" />
            </template>
            <template v-slot:item.prior_statement_made_on="{ props: { item } }">
              <Date :value="item.prior_statement_made_on"/>
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <Action :item="item"/>
            </template>
          </TableGrid>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";

// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Date from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Date";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";

export default {
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Disputed,
    Date,
    Action
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "", value: "drag", active: true },
        { text: "Question", value: "question", active: true },
        { text: "Answer", value: "answer", active: true },
        { text: "Follow up?", value: "follow_up", active: true },
        { text: "Alert?", value: "alert", active: true },
        {
          text: "Attorney Objection",
          value: "attorney_objection",
          active: true
        },
        { text: "Objection Reason", value: "objection_reason", active: true },
        { text: "Objection Context", value: "objection_context", active: true },
        { text: "Deponent Emotion", value: "deponent_emotion", active: true },
        { text: "Related Exhibit", value: "related_exhibit", active: true },
        { text: "Prior Statement", value: "prior_statement", active: true },
        {
          text: "Prior Statement Made on ",
          value: "prior_statement_made_on",
          active: true
        },
        {
          text: "Prior Statement Source",
          value: "prior_statement_source",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
        {
          id: 2,
          field: "objection",
          title: "Objection",
          list: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/questionStatus", [
      "dataQuestionStatus"
    ]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    }
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/questionStatus", [
      "getDataQuestionStatusRequest",
      "addQuestionStatusRequest",
      "updateQuestionStatusRequest",
      "removeQuestionStatusRequest"
    ]),
    changeQueryRouter(item) {
      this.$router.push({
        path: this.$route.path,
        query: { group: item.field }
      });
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    select() {},
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      // const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        default:
          groupByCurrent.list.push({ id: 1, groupID: "all", text: "" });
          return groupByCurrent;
      }
    },
    async getDataProceesdingFromApi(group) {
      this.groupBy = await this.getGroupByCurrent(group);
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all"
      };
      this.updatePagination(searchObject);
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      const searchObject = {
        page,
        group_by,
        ungroup,
        group_items
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.getDataQuestionStatusRequest({ idParams, searchObject });
    }
  },
  mounted() {
    // const matterId = this.$route.params.matter || this.$route.params.projectId;
    const group = this.$route.query.group;
    this.getDataProceesdingFromApi(group);
  },
  watch: {
    "$route.query"(query) {
      this.getDataProceesdingFromApi(query.group);
    }
  }
};
</script>

<style scoped></style>
