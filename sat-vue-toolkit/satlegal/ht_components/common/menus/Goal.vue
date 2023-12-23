<template>
  <MenuListLabel
    textTooltip="Add goal"
    :tag="value"
    :tags="dataGoals"
    keyId="pk"
    keyText="name"
    keyColor="color"
    title="List goals"
    nameAdd="Add new goals"
    lengthDisplay="3"
    :valid="valid"
    :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    @add="add"
    @update="update"
    @remove="
      removeGoalsRequest({ matterId:$route.params.matter || $route.params.projectId, id: $event })
    "
    @chose="$emit('update', $event)"
    @onOpenMenu="getDataGoals"
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
    ...mapGetters("ht_store/matter/goals", ["dataGoals"])
  },
  methods: {
    async getDataGoals() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataGoalsRequest({ matterId });
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
        await this.addGoalsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({dataForm, closeUpdate}) {
      try {
        this.isLoadingUpdate = true;
        await this.updateGoalsRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, ...dataForm });
        this.isLoadingUpdate = false;
        closeUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/goals", [
      "getDataGoalsRequest",
      "addGoalsRequest",
      "updateGoalsRequest",
      "removeGoalsRequest"
    ])
  }
};
</script>
