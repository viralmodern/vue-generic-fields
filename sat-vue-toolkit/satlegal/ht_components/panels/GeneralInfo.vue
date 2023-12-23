<template>
  <div class="ma-2">
    <MaterialPanel panelTitle="General Infomation" @edit="openModal">
      <v-row no-gutters class="px-4 py-2" v-if="dataGeneralInfo">
        <div class="py-1">
          <h3>Gender</h3>
          <span>{{ dataGeneralInfo.gender || "" }}</span>
        </div>
        <div class="py-1">
          <h3>Birthday</h3>
          <span>{{ dataGeneralInfo.birthday | formatShortDate }}</span>
        </div>
        <div class="py-1">
          <h3>Location</h3>
          <div v-for="(item, index) in dataGeneralInfo.locations" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="py-1">
          <h3>About Me</h3>
          <div v-html="aboutMeHtml" style="word-break: break-all"></div>
        </div>
      </v-row>
      <EditGeneralInfo
        title="Update general infomation"
        :isShow="isShow"
        :itemEdit="itemEdit"
        @closeModal="closeModal"
        @edit="edit"
      />
    </MaterialPanel>
  </div>
</template>

<script>
import MaterialPanel from "./MaterialPanel";
import EditGeneralInfo from "../dialogs/EditGeneralInfo";

export default {
  components: {
    MaterialPanel,
    EditGeneralInfo
  },
  props: {
    dataGeneralInfo: Object
  },
  computed: {
    aboutMeHtml() {
      if (!this.dataGeneralInfo.aboutMe) return "";
      let text = this.dataGeneralInfo.aboutMe.replace(/ /g, "&nbsp;");
      return text.replace(/\n/g, "<br/>");
    }
  },
  data() {
    return {
      isShow: false,
      itemEdit: {}
    };
  },
  methods: {
    openModal() {
      this.isShow = true;
      this.itemEdit = this.dataGeneralInfo;
    },
    closeModal() {
      this.isShow = false;
      this.itemEdit = {};
    },
    edit(data) {
      this.$emit("updateGeneralInfo", data);
    }
  }
};
</script>
