<template>
  <MenuListLabel
    :descForm="descForm"
    :description="description"
    textTooltip="Add prior statement source"
    :tag="value"
    :tags="dataSource"
    keyText="name"
    keyId="pk"
    keyColor="color"
    title="List source"
    nameAdd="Add new source"
    :lengthDisplay="lengthDisplay"
    :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
    @changeDesc="$emit('changeDesc', $event)"
    :valid="valid"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    @add="add"
    @update="update"
    @remove="
      removeSourceRequest({ matterId: $route.params.projectId, id: $event })
    "
    @chose="$emit('update', $event)"
    @onOpenMenu="getDataSource"
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
    descForm: Boolean,
    description: String,
    valid: Boolean,
    lengthDisplay: {
      type: String,
      default: () => "3"
    }
  },
  data() {
    return {
      isCallApi: false,
      isLoading: false,
      isLoadingAdd: false,
      isLoadingUpdate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/proceeding", ["dataSource"])
  },
  methods: {
    async getDataSource() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataSourceRequest({ matterId });
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      }
    },
    async add({ dataForm, closeAdd }) {
      try {
        this.isLoadingAdd = true;
        await this.addSourceRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          ...dataForm
        });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({ dataForm, closeUpdate }) {
      try {
        this.isLoadingUpdate = true;
        await this.updateSourceRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          ...dataForm
        });
        this.isLoadingUpdate = false;
        closeUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/deposition/proceeding", [
      "getDataSourceRequest",
      "addSourceRequest",
      "updateSourceRequest",
      "removeSourceRequest"
    ])
  }
};
</script>
