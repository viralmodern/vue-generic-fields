<template>
  <v-dialog :value="isShow" width="1250" @input="cancel">
    <v-list style="height:100%" class="pa-3">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <ReferenceTitle
              :title="dataReferencesDetail.name"
              :date="dataReferencesDetail.date"
              :by="dataReferencesDetail.by"
              @update="update"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Detail">Detail</v-tab>
              <v-tab key="Highlight">Highlight</v-tab>
              <v-tab-item class="pa-3" key="Detail">
                <NotebookEditor
                  placeholder="Type your note here..."
                  :item="dataReferencesDetail.content"
                  @change="update('content', $event)"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Highlight">
                <HighLight />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <ReferencesRight :items="dataReferencesDetail" @update="update" />
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ReferenceTitle from "../../ht_components/cards/ReferenceTitle";
import ReferencesRight from "../../ht_components/references/ReferencesRight";
import NotebookEditor from "../../ht_components/editor/NotebookEditor";
import HighLight from "../../ht_components/references/HighLight";
export default {
  components: {
    ReferenceTitle,
    ReferencesRight,
    NotebookEditor,
    HighLight
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "references",
        params: {
          ...this.$route.params
        }
      });
    },
    update(column, value) {
      const data = {
        column: column,
        value: value
      };
      this.updateReferencesRequest(data);
    },
    ...mapActions("ht_store/matter/references/detail", [ // eslint-disable-line
      "getDataReferencesDetailRequest",
      "updateReferencesRequest"
    ]),
    ...mapActions("ht_store/matter/subjects", ["getDataSubjectsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]) // eslint-disable-line
  },
  computed: {
    ...mapGetters("ht_store/matter/references/detail", ["dataReferencesDetail"]) // eslint-disable-line
  },
  mounted() {
    this.getDataReferencesDetailRequest(this.$route.params.id);
    this.getDataSubjectsRequest(this.$route.params.matter || this.$route.params.projectId);
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "tag"
    });
  }
};
</script>
