<template>
  <div>
    <v-dialog
      :value="isShow"
      @input="$emit('closeModel')"
      persistent
      scrollable
      width="600"
    >
      <v-card class="py-1">
        <div>
          <v-row no-gutters class="align-center">
            <v-btn
              :color="mode === 'inprint' ? 'primary' : 'default'"
              @click="mode = 'inprint'"
              >In print</v-btn
            >
            <v-btn
              class="mx-0"
              :color="mode === 'online' ? 'primary' : 'default'"
              @click="mode = 'online'"
              >Online</v-btn
            >
            <v-btn
              :color="mode === 'onlineDatabase' ? 'primary' : 'default'"
              @click="mode = 'onlineDatabase'"
              >Online database</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="ma-0" @click="$emit('closeModel')" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-text style="height: 500px;">
          <v-form ref="form">
            <FormCitationGenaral
              @onChange="onChange"
              :caseName="caseName"
              :court="court"
              :datePublished="datePublished"
              :slipOpinion="slipOpinion"
              :electronicDatabase="electronicDatabase"
            />
            <FormInPrint
              @onChange="onChange"
              :advancedInfo="advancedInfo"
              :publicationInfo="publicationInfo"
              :pages="pages"
            />
            <FormOnline
              v-show="mode === 'online'"
              @onChange="onChange"
              :websiteTitle="websiteTitle"
              :publisher="publisher"
              :url="url"
              :electronicallyPublished="electronicallyPublished"
              :dateAccessedOnline="dateAccessedOnline"
            />
            <FormOnlineDataBase
              v-show="mode === 'onlineDatabase'"
              @onChange="onChange"
              :location="location"
              :locations="locations"
              :database="database"
              :dateAccessedOnlineDatabase="dateAccessedOnlineDatabase"
              :searchType="searchType"
              :searchTextOrUrl="searchTextOrUrl"
            />
            <v-textarea
              v-model="annotation"
              label="Add annotation"
              rows="2"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row class="justify-end align-center">
            <v-btn @click="$emit('closeModel')">close</v-btn>
            <v-btn class="v-btn theme--light primary" @click="submit">{{
              nameAction
            }}</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FormCitationGenaral from "../forms/FormCitationGenaral";
import FormInPrint from "../forms/FormInPrint";
import FormOnline from "../forms/FormOnline";
import FormOnlineDataBase from "../forms/FormOnlineDataBase";
export default {
  components: {
    FormCitationGenaral,
    FormInPrint,
    FormOnline,
    FormOnlineDataBase
  },
  props: {
    isShow: Boolean,
    citationGenaral: Object,
    inPrint: Object,
    online: Object,
    onlineDatabase: Object,
    nameAction: String
  },
  data() {
    return {
      mode: "inprint",
      caseName: "",
      court: "",
      datePublished: "",
      slipOpinion: true,
      electronicDatabase: false,
      advancedInfo: "",
      publicationInfo: "",
      pages: 0,
      annotation: "",
      websiteTitle: "",
      publisher: "",
      url: "",
      electronicallyPublished: "",
      dateAccessedOnline: "",
      location: "",
      locations: ["New York", "Los Angeles"],
      database: "",
      dateAccessedOnlineDatabase: "",
      searchType: "",
      searchTextOrUrl: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = {
          caseName: this.caseName,
          court: this.court,
          datePublished: this.datePublished,
          slipOpinion: this.slipOpinion,
          electronicDatabase: this.electronicDatabase,
          advancedInfo: this.advancedInfo,
          publicationInfo: this.publicationInfo,
          pages: this.pages,
          annotation: this.annotation,
          websiteTitle: this.websiteTitle,
          publisher: this.publisher,
          url: this.url,
          electronicallyPublished: this.electronicallyPublished,
          dateAccessedOnline: this.dateAccessedOnline,
          location: this.location,
          database: this.database,
          dateAccessedOnlineDatabase: this.dateAccessedOnlineDatabase,
          searchType: this.searchType,
          searchTextOrUrl: this.searchTextOrUrl
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.mode = "inprint";
      this.caseName = "";
      this.court = "";
      this.datePublished = "";
      this.slipOpinion = true;
      this.electronicDatabase = false;
      this.advancedInfo = "";
      this.publicationInfo = "";
      this.pages = 0;
      this.annotation = "";
      this.websiteTitle = "";
      this.publisher = "";
      this.url = "";
      this.electronicallyPublished = "";
      this.dateAccessedOnline = "";
      this.location = "";
      this.database = "";
      this.dateAccessedOnlineDatabase = "";
      this.searchType = "";
      this.searchTextOrUrl = "";
    },
    getDataCitationGenaral() {
      this.caseName = this.citationGenaral.caseName || "";
      this.court = this.citationGenaral.court || "";
      this.datePublished = this.citationGenaral.datePublished || "";
      this.slipOpinion = this.citationGenaral.slipOpinion;
      this.electronicDatabase = this.citationGenaral.electronicDatabase;
      this.annotation = this.citationGenaral.annotation || "";
    },
    getDataInPrint() {
      this.advancedInfo = this.inPrint.advancedInfo || "";
      this.publicationInfo = this.inPrint.publicationInfo || "";
      this.pages = this.inPrint.pages || 0;
    },
    getDataOnline() {
      this.websiteTitle = this.online.websiteTitle || "";
      this.publisher = this.online.publisher || "";
      this.url = this.online.url || "";
      this.electronicallyPublished = this.online.electronicallyPublished || "";
      this.dateAccessedOnline = this.online.dateAccessedOnline || "";
    },
    getDataOnlineDatabase() {
      this.location = this.onlineDatabase.location || "";
      this.database = this.onlineDatabase.database || "";
      this.dateAccessedOnlineDatabase =
        this.onlineDatabase.dateAccessedOnlineDatabase || "";
      this.searchType = this.onlineDatabase.searchType || "Keyword";
      this.searchTextOrUrl = this.onlineDatabase.searchTextOrUrl || "";
    },
    onChange({ name, value }) {
      this[name] = value;
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.getDataCitationGenaral();
        this.getDataInPrint();
        this.getDataOnline();
        this.getDataOnlineDatabase();
      }
    }
  }
};
</script>
