<template>
  <div>
    <v-row no-gutters class="align-center">
      <v-col cols="8" class="pr-3">
        <v-row no-gutters class="align-center">
          <v-col cols="6">
            <span class="subheading font-weight-bold">
              {{
              getMatter.title
              }}
            </span>
            <span class="text--secondary ml-4">{{ timespan }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" class="d-flex justify-space-around">
        <v-btn color="primary" target="_blank" :href="information.pacerLink">View on pacer</v-btn>
        <v-btn
          color="primary"
          target="_blank"
          :href="information.courlistenerLink"
        >View on courtlister</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3 align-center justify-center">
      <v-col cols="2">
        <v-row class="my-1 align-center">
          <v-icon class="mr-2">mdi-equalizer</v-icon>
          <JurisdictionComponent
            :item="information.jusridictionType"
            @updateJusridictionType="changeDataRequest"
          />
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row no-gutters class="my-1 align-center">
          <v-icon class="mr-2">mdi-equalizer</v-icon>
          <NatureComponent :item="information.natureOfSuit" @updateNature="changeDataRequest" />
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row no-gutters class="my-1 align-center">
          <v-icon class="mr-2">mdi-location_on</v-icon>
          <CardLocation :item="information.location" @updateLocation="changeDataRequest" />
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row no-gutters class="my-1 align-center">
          <v-icon class="mr-2">mdi-calendar_today</v-icon>
          <Date :item="information.date" @updateDate="changeDataRequest" />
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row no-gutters class="my-1 align-center">
          <v-icon class="mr-2">mdi-person</v-icon>
          <Judge :item="getCharacter" @updateJudge="changeDataRequest" />
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row no-gutters class="my-1 align-center">
          <v-icon class="mr-2">mdi-category</v-icon>
          <Demand :item="getDemand" @updateDemand="changeDataRequest" />
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="my-2">
      <span class="subheading font-weight-bold">Cause:</span>
      <v-col class="px-3">
        <span class="text--secondary">{{ information.cause }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="my-2">
      <span class="subheading font-weight-bold">Nature of suit:</span>
      <v-col class="px-3">
        <span class="text--secondary">{{ information.natureOfSuit }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="my-2">
      <span class="subheading font-weight-bold">Jurisdiction: </span>
      <v-col class="px-3">
        <span class="text--secondary">{{ information.jusridictionType }}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { listDemand } from "../../config";
import CardLocation from "./CardLocation";
import Date from "../docket-infomation/Date";
import Judge from "../docket-infomation/Judge";
import Demand from "../docket-infomation/Demand";
import moment from "moment";
import JurisdictionComponent from "../docket-infomation/Jurisdiction";
import NatureComponent from "../docket-infomation/NatureComponent";
export default {
  data() {
    return {
      listDemand
    };
  },
  components: {
    CardLocation,
    Date,
    Judge,
    Demand,
    JurisdictionComponent,
    NatureComponent
  },
  methods: {
    ...mapActions("ht_store/matter/briefcase/docket", ["changeDataRequest"])
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/matter/briefcase/docket", ["information"]),
    ...mapGetters("ht_store/matter/location", ["locations"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    getMatter() {
      let item =
        this.dataMatter.find(x => x.id === this.information.matter) || {};
      return item;
    },
    getLocation() {
      let item =
        this.locations.find(x => x.id === this.information.location) || {};
      return item;
    },
    getCharacter() {
      let item =
        this.character.find(x => x.id === this.information.judge) || {};
      return item;
    },
    getDemand() {
      let item =
        this.listDemand.find(x => x.id === this.information.juryDemand) || {};
      return item;
    },
    timespan() {
      return moment(this.information.lastUpdate).fromNow();
    }
  }
};
</script>
