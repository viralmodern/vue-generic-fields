<template>
  <v-row no-gutters>
    <v-col cols="3">
      <MenuLeft />
    </v-col>
    <v-col cols="9">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters class="justify-end ma-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn primary v-on="on" icon @click="isShow = true">
                  <v-icon>mdi-device_hub</v-icon>
                </v-btn>
              </template>
              <span>Category</span>
            </v-tooltip>
            <FilterHelpDesk @filterHelpDesk="getDataHelpDesk" :hasFilters="hasFilters" />
            <HelpDeskType />
          </v-row>
        </v-col>

        <v-col cols="12">
          <TabTable
            v-if="$route.params.type === 'table'"
            :itemsTickets="itemsTickets"
            :isLoading="isLoading"
            @updateTickets="updateTickets"
            @removeTickets="removeTickets"
            @getTickets="getTickets"
          />

          <TabGroup :itemsTickets="itemsTickets">
            <template slot="group" slot-scope="{ dataGroup, keyGroup }">
              <KanbanHelpDesk
                :keyGroup="keyGroup"
                :dataGroup="dataGroup"
                v-if="$route.params.type === 'kanban'"
              />
              <div v-if="$route.params.type === 'group'">
                <TableCommon
                  v-for="list in dataGroup"
                  :key="list.id"
                  :itemsTickets="list.tasks"
                  :isLoading="isLoading"
                  :name="list.name"
                  :keyGroup="keyGroup"
                  keyName="all_tickets"
                  @updateTickets="updateTickets"
                  @removeTickets="removeTickets"
                  @getTickets="getTickets"
                />
              </div>
            </template>
          </TabGroup>
        </v-col>
      </v-row>
    </v-col>
    <DialogCategory :isShow="isShow" @cancel="isShow = false" />
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HelpDeskType from "./HelpDeskType";
import MenuLeft from "../../../ht_components/helpdesk/MenuLeft";
import TabTable from "../../../ht_components/helpdesk/tab/TabTable";
import TabGroup from "../../../ht_components/helpdesk/tab/TabGroup";
import TableCommon from "../../../ht_components/helpdesk/tab/TableCommon";
import DialogCategory from "../../../ht_components/dialogs/DialogCategory";
import FilterHelpDesk from "../../../ht_components/helpdesk/FilterHelpDesk";
import KanbanHelpDesk from "../../../ht_components/helpdesk/KanbanHelpDesk";

export default {
  components: {
    MenuLeft,
    TabTable,
    DialogCategory,
    FilterHelpDesk,
    HelpDeskType,
    TabGroup,
    KanbanHelpDesk,
    TableCommon
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/helpDesk/view", [
      "getDataHelpDesk",
      "updateTickets",
      "removeTickets"
    ]),
    ...mapActions("ht_store/matter/helpDesk/category", ["getDataCategory"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    getTickets(params) {
      const { projectId } = this.$route.params;
      this.getDataHelpDesk({
        matterId: projectId,
        type: params.type,
        value: params.value
      });
    },
    redirectRoute() {
      if (!this.$route.params.listType) {
        const type = this.$route.params.type || "table";
        this.$router.push({
          name: "Helpdesk",
          params: {
            ...this.$route.params,
            type
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/helpDesk/view", [
      "itemsTickets",
      "isLoading",
      "hasFilters"
    ])
  },
  mounted() {
    this.redirectRoute();
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getDataCategory();
    this.getTickets({ type: "all_tickets", value: "" });
  },
  watch: {
    $route() {
      this.getTickets({ type: "all_tickets", value: "" });
    }
  }
};
</script>
