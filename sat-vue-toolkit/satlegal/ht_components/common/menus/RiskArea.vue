<template>
  <MenuListLabel
    textTooltip="Add Risk Area"
    :tag="value"
    :tags="dataRiskArea"
    keyId="pk"
    keyText="name"
    keyColor="color"
    title="List issues"
    nameAdd="Add new issues"
    :lengthDisplay="lengthDisplay"
    :valid="valid"
    :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    @add="add"
    @update="update"
    @remove="
      removeRiskAreaRequest({ matterId:$route.params.matter || $route.params.projectId, id: $event })
    "
    @chose="$emit('update', $event)"
    @onOpenMenu="getDataRiskArea"
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
    lengthDisplay: {
      type: String,
      default: () => '3'
    }
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
    ...mapGetters("ht_store/matter/issues", ["dataRiskArea"])
  },
  methods: {
    async getDataRiskArea() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataRiskAreaRequest({ matterId });
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
        await this.addRiskAreaRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({dataForm, closeUpdate}) {
      try {
        this.isLoadingUpdate = true;
        await this.updateRiskAreaRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingUpdate = false;
        closeUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/issues", [
      "getDataRiskAreaRequest",
      "addRiskAreaRequest",
      "updateRiskAreaRequest",
      "removeRiskAreaRequest"
    ])
  }
};
</script>
