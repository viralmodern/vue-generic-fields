<template>
  <div>
    <MenuUser
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      style="flex-wrap: unset;"
      :value="valueMap"
      :list="dataAllCharacter"
      :isSearchClient="true"
      :isShowAction="isShowAction"
      @onClickAdd="$emit('onClickAdd')"
      :isLoadingGet="isEmitOpenMenu ? isLoadingGet : isLoading"
      :single="single"
      title="List characters"
      @select="$emit('update', $event)"
      @onOpenMenu="getDataCharacter"
    >
      <template slot="searchNoResult">
        <p>No matching results</p>
      </template>
    </MenuUser>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuUser from "./MenuUser";
import { $$STORE_PREFIX } from '../../../utils'
export default {
  components: {
    MenuUser
  },
  props: {
    value: [Array, Object],
    isEmitOpenMenu: Boolean,
    isLoadingGet: Boolean,
    single: Boolean,
    isShowAction: Boolean,
  },
  data() {
    return {
      isCallApi: false,
      isLoading: false
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
    ...mapGetters("ht_store/matter/character2", ["dataAllCharacter"])
  },
  methods: {
    async getDataCharacter() {
      if (this.isEmitOpenMenu) {
        this.$emit("onOpenMenu");
      } else {
        if (!this.isCallApi) {
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          this.isCallApi = true;
          try {
            this.isLoading = true;
            await this.getAllDataCharacterRequest({ matterId });
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      }
    },
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"])
  }
};
</script>
