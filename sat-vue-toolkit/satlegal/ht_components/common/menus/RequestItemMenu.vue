<template>
  <div>
    <MenuUser
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      style="flex-wrap: unset;"
      :value="valueMap"
      :list="dataRequestItemNoGroup"
      :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
      :isLoadingSearch="isLoadingSearch"
      :single="single"
      :timeDelaySearch="500"
      title="List request items"
      @select="$emit('update', $event)"
      @onOpenMenu="getDataRequestItem"
      @search="search"
      @onStartSearch="isLoadingSearch = true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuUser from "./MenuUser";

export default {
  components: {
    MenuUser
  },
  props: {
    value: [Array, Object],
    isEmitOpenMenu: Boolean,
    isLoadingGet: Boolean,
    single: Boolean
  },
  data() {
    return {
      isCallApi: false,
      isLoading: false,
      isLoadingSearch: false
    };
  },
  computed: {
    valueMap() {
      if (!this.value) return [];
      if (Array.isArray(this.value)) {
        return this.value;
      } else {
        return [this.value];
      }
    },
    ...mapGetters("ht_store/matter/requestStatus/requestItem", [
      "dataRequestItemNoGroup"
    ])
  },
  methods: {
    async search(text) {
      try {
        this.isLoadingSearch = true;
        await this.getDataFromApi();
        this.isLoadingSearch = false;
      } catch (error) {
        this.isLoadingSearch = false;
      }
    },
    async getDataRequestItem() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getDataFromApi();
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      }
    },
    async getDataFromApi(searchObject = {}) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject
      };
      return this.getAllDataRequestItemNoGroupByRequest(query);
    },
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "getAllDataRequestItemNoGroupByRequest"
    ])
  }
};
</script>
