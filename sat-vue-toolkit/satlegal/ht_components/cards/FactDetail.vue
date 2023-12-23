<template>
  <v-list style="height:100%">
    <v-row no-gutters>
      <v-col cols="9">
        <v-col cols="12">
          <FactDetailTitle
            :title="dataFactsDetail.name"
            :date="dataFactsDetail.time"
            :characters="dataFactsDetail.characters.map(x => x.character.pk)"
            :members="character"
            @clickScore="mode = !mode"
            @updateFactsDetail="updateFactsDetail"
            :mode="mode"
          />
        </v-col>
        <div>
          <div v-show="mode" class="pa-3">
            <FactDetailScore :items="dataFactsDetail" />
          </div>
          <v-tabs v-show="!mode" grow class="px-1">
            <v-tab key="Fact">Fact</v-tab>
            <v-tab key="Linked">Linked</v-tab>
            <v-tab key="Comment">Comment</v-tab>
            <v-tab key="Worklog">Worklog</v-tab>
            <v-tab key="Checklist">Checklist</v-tab>
            <v-tab key="Notes">Notes</v-tab>
            <v-tab key="Attachment">Attachment</v-tab>
            <v-tab-item class="pa-3" key="Fact">
              <FactDetail
                :items="dataFactsDetail"
                :dataFactsSupport="dataFactsSupport"
                :total_support="total_support"
                @removeSupport="
                  supportId = $event;
                  isRemoveSupport = true;
                "
              />
            </v-tab-item>
            <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
            <v-tab-item class="pa-3" key="Comment">
              <FactDetailComment />
            </v-tab-item>
            <v-tab-item class="pa-3" key="Worklog">
              <FactDetailWorklog :items="[]" />
            </v-tab-item>
            <v-tab-item class="pa-3" key="Checklist">
              <FactDetailCheckList :items="[]" />
            </v-tab-item>
            <v-tab-item class="pa-3" key="Notes">
              <FactDetailNotes />
            </v-tab-item>
            <v-tab-item class="pa-3" key="Attachment">
              <FactDetailAttachment />
            </v-tab-item>
          </v-tabs>
        </div>
      </v-col>
      <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
        <FactDetailRight
          :items="dataFactsDetail"
          @updateFactsDetail="updateFactsDetail"
        />
      </v-col>
    </v-row>
    <ConfirmItem
      :isShowPopup="isRemoveSupport"
      messageConfirm="Are you sure you want to delete this items?"
      @cancel="isRemoveSupport = false"
      @remove="
        removeSupportFacts({
          matterId:$route.params.matter || $route.params.projectId,
          factId: $route.params.factId,
          supportId
        });
        isRemoveSupport = false;
      "
    />
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import FactDetailTitle from "../research/facts/detail/FactDetailTitle";
// import FactDetail from "../research/facts/detail/FactDetail";
// import FactDetailRight from "../research/facts/detail/FactDetailRight";
// import FactDetailWorklog from "../research/facts/detail/FactDetailWorklog";
// import FactDetailCheckList from "../research/facts/detail/FactDetailCheckList";
// import FactDetailNotes from "../research/facts/detail/FactDetailNotes";
// import FactDetailComment from "../research/facts/detail/FactDetailComment";
// import FactDetailAttachment from "../research/facts/detail/FactDetailAttachment";
// import FactDetailScore from "../research/facts/detail/FactDetailScore";
import ConfirmItem from "../dialogs/ConfirmItem";

export default {
  components: {
    // FactDetailTitle,
    // FactDetail,
    // FactDetailRight,
    // FactDetailWorklog,
    // FactDetailCheckList,
    // FactDetailNotes,
    // FactDetailComment,
    // FactDetailAttachment,
    // FactDetailScore,
    ConfirmItem
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", [
      "dataFactsDetail",
      "dataFactsSupport",
      "total_support"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  data() {
    return {
      mode: false,
      isRemoveSupport: false,
      supportId: null
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", [
      "getDataFactsDetail",
      "updateFactsDetail",

      "getSupportFacts",
      "removeSupportFacts"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"])
  },
  mounted() {
    const { factId, projectId } = this.$route.params;
    this.getDataFactsDetail({ matterId: projectId, factId });
    this.getDataTagsRequest({
      matterId: projectId,
      type: "tag"
    });
    this.getDataTagsRequest({
      matterId: projectId,
      type: "issue"
    });
    this.getSupportFacts({
      matterId: projectId,
      factId,
      page: 1
    });
  }
};
</script>
