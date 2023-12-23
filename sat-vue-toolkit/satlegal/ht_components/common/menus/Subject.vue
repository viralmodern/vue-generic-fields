<template>
  <MenuListLabel
    textTooltip="Add subject"
    :icon="icon"
    :tag="value"
    :tags="dataSubjects"
    keyId="pk"
    keyText="name"
    keyColor="color"
    title="List subject"
    nameAdd="Add new subject"
    lengthDisplay="3"
    :valid="valid"
    :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    @add="add"
    @update="update"
    @remove="
      removeSubjectsRequest({ matterId:$route.params.matter || $route.params.projectId, id: $event })
    "
    @chose="$emit('update', $event)"
    @onOpenMenu="getDataSubjects"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListLabel from "./label/MenuListLabel";

export default {
  components: {
    MenuListLabel
  },
  props: {
    value: Array,
    isEmitOpenMenu: Boolean,
    icon: String,
    isLoadingGet: Boolean,
    valid: Boolean,
  },
  data() {
    return {
      isCallApi: false,
      isLoading: false,
      isLoadingAdd: false,
      isLoadingUpdate: false,
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"])
  },
  methods: {
    async getDataSubjects() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataSubjectsRequest({ matterId });
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      }
    },
    async add({dataForm, closeAdd}) {
      try {
        this.isLoadingAdd = true;
        await this.addSubjectsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({dataForm, closeUpdate}) {
      try {
        this.isLoadingUpdate = true;
        await this.updateSubjectsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingUpdate = false;
        closeUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/subjects", [
      "getDataSubjectsRequest",
      "addSubjectsRequest",
      "updateSubjectsRequest",
      "removeSubjectsRequest"
    ])
  }
};
</script>
