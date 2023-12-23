<template>
  <v-row no-gutters>
    <v-col cols="12">
      <SlickTable
        :items="services"
        :headers="headers"
        :totals="totals"
        @update:pagination="
          getDataServiceRequest({
            page: $event.page,
            matterId:$route.params.matter || $route.params.projectId
          })
        "
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :index="parseInt(props.index) + 1"
            @onChange="editService($event)"
            @deleteService="removeService"
            @addAtachment="addAtachmentRequest"
            @deleteAttachment="deleteAtachmentRequest"
          />
        </template>
      </SlickTable>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TdCharacter from "../../ht_components/service-all/TdCharacter";
import TdType from "../../ht_components/service-all/TdType";
import TdMember from "../../ht_components/service-all/TdMember";
import TdStatus from "../../ht_components/service-all/TdStatus";
import TdDeadline from "../../ht_components/service-all/TdDeadline";
import TdAttachment from "../../ht_components/service-all/TdAttachment";
import TdLinked from "../../ht_components/service-all/TdLinked";
import TdAction from "../../ht_components/service-all/TdAction";
import TdName from "../../ht_components/service-all/TdName";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  data() {
    return {
      isShowCreate: false
    };
  },
  components: {
    SlickTable
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/service", [
      "editServiceRequest",
      "deleteServiceRequest",
      "addAtachmentRequest",
      "deleteAtachmentRequest",
      "getDataServiceRequest"
    ]),
    editService(data) {
      const result = { ...data, matterId: this.$route.params.matter || this.$route.params.projectId };
      this.editServiceRequest(result);
    },
    removeService(id) {
      const data = {
        id: id,
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.deleteServiceRequest(data);
    },
    getDisplayComponent(columnName) {
      if (columnName === "character") {
        return TdCharacter;
      }
      if (columnName === "type") {
        return TdType;
      }
      if (columnName === "member") {
        return TdMember;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "deadline") {
        return TdDeadline;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      if (columnName === "linked") {
        return TdLinked;
      }
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "name") {
        return TdName;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    ...mapGetters("ht_store/matter/service", ["services", "totals"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    }
  },
  mounted() {
    this.getDataCharacterRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
  }
};
</script>
