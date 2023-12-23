<template>
  <div class="fill-height py-2 px-3" style="background: white;">
    <div>
      <ToolboxTitle
        :title="dataToolboxDetail.name"
        :date="dataToolboxDetail.date"
        :dataMembers="dataToolboxDetail.members"
        @updateToolboxRequest="updateToolboxRequest({matterId: dataToolboxDetail.matter, toolboxId: dataToolboxDetail.id,  ...$event})"
      />
    </div>
    <div class="my-2">
      <v-textarea
        hide-details
        auto-grow
        :value="dataToolboxDetail.description"
        class="ma-0 pa-2 custom-text-field fieldDes"
        rows="1"
        @change="updateToolboxRequest({matterId: dataToolboxDetail.matter, toolboxId: dataToolboxDetail.id,  description: $event})"
      ></v-textarea>
    </div>
    <div v-if="checkType">
      <Definition/>
    </div>
    <div>
      <Instruction v-if="checkType"/>
    </div>
    <div>
      <component :is="getDisplayComponent(dataToolboxDetail.type)"/>
    </div>
    <div>
      <GeneralObjection v-if="checkType"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ToolboxTitle from "../../ht_components/toolbox/detail/ToolboxTitle";
import WishList from "../../ht_components/toolbox/detail/WishList";
import RequestOfProduction from "../../ht_components/toolbox/detail/RequestOfProduction";
import RequestOfAdmission from "../../ht_components/toolbox/detail/RequestOfAdmission";
import SetOfInterrogatory from "../../ht_components/toolbox/detail/SetOfInterrogatory";
import Deposition from "../../ht_components/toolbox/detail/Deposition";
import Definition from "../../ht_components/toolbox/detail/Definition";
import Instruction from "../../ht_components/toolbox/detail/Instruction";
import GeneralObjection from "../../ht_components/toolbox/detail/GeneralObjection";

export default {
  components: {
    ToolboxTitle,
    WishList,
    RequestOfProduction,
    RequestOfAdmission,
    SetOfInterrogatory,
    Deposition,
    Definition,
    Instruction,
    GeneralObjection
  },
  computed: {
    checkType() {
      return [2, 3, 5].includes(this.dataToolboxDetail.type);
    },
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(type) {
      switch (type) {
        case 1:
          // type : "Wishlist"
          return WishList;
        case 2:
          // type : "Request of Production"
          return RequestOfProduction;
        case 3:
          // type : "Request of Admission"
          return RequestOfAdmission;
        case 4:
          // type : "Deposition"
          return Deposition;
        case 5:
          // type : "Set of Interrogatory"
          return SetOfInterrogatory;
        default:
          break;
      }
    },
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/matter/discovery/toolbox/detail", [
      "getDataToolboxRequest",
      "updateToolboxRequest"
    ])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const toolboxId = this.$route.params.toolBoxId;
    this.getDataCharacterRequest({matterId});
    this.getDataMembersRequest({matterId});
    this.getDataTagsRequest({matterId, type: "tag"});
    this.getDataToolboxRequest({matterId, toolboxId});
  }
};
</script>

<style scoped>
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
