<template>
  <MenuListLabel
    textTooltip="Add labels"
    :tag="value"
    :tags="dataLabels"
    keyText="name"
    keyId="pk"
    keyColor="color"
    title="List labels"
    nameAdd="Add new labels"
    lengthDisplay="3"
    :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    :valid="valid"
    @add="add"
    @update="update"
    @remove="
      removeLabelsRequest({ matterId:$route.params.matter || $route.params.projectId, id: $event })
    "
    @chose="$emit('update', $event)"
    @onOpenMenu="getDataLabels"
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
    ...mapGetters("ht_store/matter/labels", ["dataLabels"])
  },
  methods: {
    async getDataLabels() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataLabelsRequest({ matterId });
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
        await this.addLabelsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({dataForm, closeUpdate}) {
      try {
        this.isLoadingUpdate = true;
        await this.updateLabelsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingUpdate = false;
        closeUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/labels", [
      "getDataLabelsRequest",
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ])
  }
};
</script>
