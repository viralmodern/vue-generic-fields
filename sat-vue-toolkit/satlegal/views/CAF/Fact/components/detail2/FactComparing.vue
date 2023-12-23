<template>
  <div>
    <h3>Differences</h3>
    <div class="pl-2 pt-2">
      <div v-for="item in dataDifferences" :key="item.pk">
        <v-row no-gutters>
          <v-text-field
            hide-details
            :value="item.desc"
            @change="
              updateFactsDifferences({
                matterId:$route.params.matter || $route.params.projectId,
                factId: $route.params.factId,
                desc: $event,
                diffsId: item.pk
              })
            "
            class="ma-0 pa-0 custom-text-field"
          ></v-text-field>
          <v-btn
            icon
            class="ma-0"
            @click="
              removeFactsDifferences({
                matterId:$route.params.matter || $route.params.projectId,
                factId: $route.params.factId,
                diffsId: item.pk
              })
            "
          >
            <v-icon color="grey">mdi-delete_outline</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-row no-gutters class="justify-space-between">
        <AddInlineEnter
          style="width:300px"
          requireName="Text is required"
          label="Add a difference"
          hint="Enter to add a difference"
          prepend-inner-icon="mdi-plus"
          @add="
            addFactsDifferences({
              matterId:$route.params.matter || $route.params.projectId,
              factId: $route.params.factId,
              desc: $event
            })
          "
        />
        <v-pagination
          v-model="page_differences"
          :total-visible="7"
          :length="differences_totals"
        ></v-pagination>
      </v-row>
    </div>
    <h3>Similarities</h3>
    <div class="pl-2 pt-2">
      <div v-for="item in dataSimilarities" :key="item.pk">
        <v-row no-gutters>
          <v-text-field
            hide-details
            :value="item.desc"
            class="ma-0 pa-0 custom-text-field"
          ></v-text-field>
          <v-btn icon class="ma-0">
            <v-icon color="grey">mdi-delete_outline</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-row no-gutters class="justify-space-between">
        <AddInlineEnter
          style="width:300px"
          requireName="Text is required"
          label="Add a similarty"
          hint="Enter to add a similarty"
          prepend-inner-icon="mdi-plus"
        />
        <v-pagination
          v-model="page_similarities"
          :total-visible="7"
          :length="similarities_totals"
        ></v-pagination>
      </v-row>
    </div>
  </div>
</template>

<script>
const pageSize = 20;
import { mapActions, mapGetters } from "vuex";
import AddInlineEnter from "@/sat-vue-toolkit/satlegal/ht_components/inputs/AddInlineEnter";
export default {
  components: {
    AddInlineEnter
  },
  data() {
    return {
      page_differences: 1,
      page_similarities: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts/comparing", [
      "dataDifferences",
      "totals_differences",
      "dataSimilarities",
      "totals_Similarities"
    ]),
    differences_totals() {
      return Math.ceil((this.totals_differences / pageSize).toFixed(1)) || 1;
    },
    similarities_totals() {
      return Math.ceil((this.totals_Similarities / pageSize).toFixed(1)) || 1;
    }
  },
  methods: {
    ...mapActions("ht_store/project/research/facts/comparing", [
      "addFactsDifferences",
      "removeFactsDifferences",
      "updateFactsDifferences",
      "getFactsDifferences",

      "getFactsSimilarities",
      "addFactsSimilarities",
      "updateFactsSimilarities",
      "removeFactsSimilarities"
    ])
  },
  watch: {
    page_differences: {
      handler(page) {
        const { projectId, factId } = this.$route.params;
        this.getFactsDifferences({ matterId: projectId, factId, page });
      }
    },
    page_similarities: {
      handler(page) {
        const { projectId, factId } = this.$route.params;
        this.getFactsSimilarities({ matterId: projectId, factId, page });
      }
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
