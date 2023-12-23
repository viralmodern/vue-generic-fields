<template>
  <v-row no-gutters>
    <v-col>
      <h1>Citation</h1>
      <ProjectCitation
        :items="dataCitation"
        :message="message"
        :isShowMessage="isShowMessage"
        @add="add"
        @update="update"
        @remove="removeCitation"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ProjectCitation from "../projects/ProjectCitation";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ProjectCitation
  },
  computed: {
    ...mapGetters("ht_store/task/detail/citation", ["dataCitation"])
  },
  data() {
    return {
      isShowMessage: false,
      message: ""
    };
  },
  methods: {
    async add(data) {
      const result = await this.addDataCitationRequest(data.dataForm);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        data.closeModel();
      }, 500);
      if (result.status) {
        this.addCitation(data.dataForm);
      }
    },
    async update(data) {
      const result = await this.updateDataCitationRequest(data.dataForm);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        data.closeModel();
      }, 500);
      if (result.status) {
        this.updateCitation(data.dataForm);
      }
    },
    ...mapActions("ht_store/task/detail/citation", [
      "getDataCitationRequest",
      "addDataCitationRequest",
      "updateDataCitationRequest"
    ]),
    ...mapMutations("ht_store/task/detail/citation", [
      "addCitation",
      "updateCitation",
      "removeCitation"
    ])
  },
  mounted() {
    this.getDataCitationRequest();
  }
};
</script>

