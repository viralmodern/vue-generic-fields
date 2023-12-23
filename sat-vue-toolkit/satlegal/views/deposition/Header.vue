<template>
  <div>
    <v-toolbar class="custom" height="50">
      <v-toolbar-title class="text-body-1"
        >Deposition name: {{ dataDepositionDetail.name }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-for="item in listMenu">
          <v-btn
            v-if="item.typePath === 'single'"
            :key="item.id"
            text
            :to="item.to"
            small
            class="text-capitalize"
            >{{ item.name }}</v-btn
          >
          <v-menu
            v-if="item.typePath === 'multiple'"
            :key="item.id"
            open-on-hover
            bottom
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn small text class="text-capitalize" v-on="on">
                {{ item.name }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="isLoadingGetDepositionDetail" style="font-size:13px">
                Loading...
              </v-list-item>
              <v-list-item v-else-if="!deponentType" style="font-size:13px">
                No preparation...
              </v-list-item>
              <v-list-item
                v-else
                v-for="(childMenu, index) in item.listPath.filter(x => x.type === deponentType)"
                :key="index"
                :to="childMenu.to"
                exact
              >
                <v-list-item-title  style="font-size:13px">{{ childMenu.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      listMenu: [
        {
          id: 1,
          name: "Overview",
          typePath: "single",
          to: {
            name: "depositionOverview"
          }
        },
        {
          id: 2,
          name: "Checklist",
          typePath: "single",
          to: {
            name: "depositionChecklist"
          }
        },
        {
          id: 3,
          name: "Preparation",
          typePath: "multiple",
          listPath: [
            {
              name: "Key Pleading",
              to: {
                name: "DepositionKeyPleading"
              },
              type: 1,
            },
            {
              name: "Fact Chronology",
              to: {
                name: "DepositionFactChronology"
              },
              type: 1,
            },
            {
              name: "Request for Production",
              to: {
                name: "DepositionRFP"
              },
              type: 1,
            },
            {
              name: "Exhibit",
              to: {
                name: "DepositionExhibit"
              },
              type: 1,
            },
            {
              name: "Affidavit Statement",
              to: {
                name: "AffidavitStatement"
              },
              type: 1,
            },
            {
              name: "Prior Experience",
              to: {
                name: "DepositionPriorExperience"
              },
              type: 2,
            },
            {
              name: "Prior Employment as Expert Witness",
              to: {
                name: "DepositionPriorEmployment"
              },
              type: 2,
            },
            {
              name: "Written Article",
              to: {
                name: "WrittenArticle"
              },
              type: 2,
            },
            {
              name: "Given Deposition ",
              to: {
                name: "GivenDeposition"
              },
              type: 2,
            },
            {
              name: "Authoritative",
              to: {
                name: "authoritative"
              },
              type: 2,
            },
            {
              name: "Information and Document Expert Witness has received ",
              to: {
                name: "Information"
              },
              type: 2,
            },
            {
              name: "Published literature or textbook relied upon or consulted by the expert",
              to: {
                name: "Published"
              },
              type: 2,
            },
            {
              name: "Correspondence between the expert and counsel for the opposing party",
              to: {
                name: "Correspondence"
              },
              type: 2,
            },
            {
              name: "Drafts prepared by the expert",
              to: {
                name: "DraftsPrepared"
              },
              type: 2,
            },
            {
              name: "Daubert Test",
              to: {
                name: "DaubertTest"
              },
              type: 2,
            },
          ]
        },
        {
          id: 2222,
          name: "PreparationOld",
          typePath: "single",
          to: {
            name: "depositionPreparationOld"
          }
        },
        {
          id: 4,
          name: "Proceeding",
          typePath: "single",
          to: {
            name: "proceeding"
          }
        },
        {
          id: 5,
          name: "Deposition",
          typePath: "single",
          to: {
            name: "depositionDeposition"
          }
        },
        {
          id: 6,
          name: "Post Deposition",
          typePath: "single",
          to: {
            name: "depositionPostDeposition"
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail",
      "deponentType",
      "isLoadingGetDepositionDetail"
    ])
  }
};
</script>

<style scoped>
.custom {
  -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
