<template>
  <v-row no-gutters>
    <v-col cols="12" v-if="this.$route.params.type === 'character'">
      <div v-for="item in character" :key="item.id" class="mb-3">
        <div class="mb-1">
          <span class="font-weight-bold subheading">{{ item.name }}</span>
        </div>
        <SlickTable :items="get[item.id]" :headers="headers">
          <template slot="cell" slot-scope="props">
            <component
              :is="getDisplayComponent(props.column.name)"
              :column="props.column"
              :dataRow="props.dataRow"
              :index="parseInt(props.index) + 1"
              @onChange="editService($event)"
              @deleteService="deleteServiceRequest"
            />
          </template>
        </SlickTable>
      </div>
    </v-col>
    <v-col cols="12" v-if="this.$route.params.type === 'type'">
      <div v-for="item in serviceType" :key="item.id" class="mb-3">
        <div class="my-2">
          <span class="font-weight-bold subheading">{{ item.name }}</span>
        </div>
        <SlickTable :items="get[item.id]" :headers="headers">
          <template slot="cell" slot-scope="props">
            <component
              :is="getDisplayComponent(props.column.name)"
              :column="props.column"
              :dataRow="props.dataRow"
              :index="parseInt(props.index) + 1"
              @onChange="editService($event)"
              @deleteService="deleteServiceRequest"
            />
          </template>
        </SlickTable>
      </div>
    </v-col>
    <v-col cols="12" v-if="this.$route.params.type === 'status'">
      <div v-for="item in serviceStatus" :key="item.id" class="mb-3">
        <div class="my-2">
          <span class="font-weight-bold subheading">{{ item.name }}</span>
        </div>
        <SlickTable :items="get[item.id]" :headers="headers">
          <template slot="cell" slot-scope="props">
            <component
              :is="getDisplayComponent(props.column.name)"
              :column="props.column"
              :dataRow="props.dataRow"
              :index="parseInt(props.index) + 1"
              @onChange="editService($event)"
              @deleteService="deleteServiceRequest"
              @addAtachment="addAtachmentRequest"
              @deleteAttachment="deleteAtachmentRequest"
            />
          </template>
        </SlickTable>
      </div>
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
import { serviceType, serviceStatus } from "../../config";
export default {
  data() {
    return {
      isShowCreate: false,
      serviceType,
      serviceStatus
    };
  },
  components: {
    SlickTable
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    editService(data) {
      const result = { ...data, matterId: this.$route.params.matter || this.$route.params.projectId };
      this.editServiceRequest(result);
    },
    ...mapActions("ht_store/matter/service", [
      "editServiceRequest",
      "deleteServiceRequest",
      "addAtachmentRequest",
      "deleteAtachmentRequest"
    ]),
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
    ...mapGetters("ht_store/matter/service", ["services"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    },
    get() {
      let type = this.$route.params.type;
      const list = {};
      (this.services || []).forEach(x => {
        (list[x[type]] = list[x[type]] || []).push(x);
      });
      return list;
    }
  },
  mounted() {
    this.getDataCharacterRequest();
  }
};
</script>
