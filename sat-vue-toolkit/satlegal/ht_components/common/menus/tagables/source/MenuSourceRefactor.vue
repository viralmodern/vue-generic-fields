<template>
  <div>
    <MenuLabel
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      :listLabels="dataSource"
      :labels="labels"
      :title="title"
      keyText="name"
      keyId="pk"
      keyColor="color"
      :nameAdd="nameAdd"
      :valid="valid"
      :descForm="descForm"
      :description="description"
      :isLoadingGet="isLoadingGet"
      :isLoadingAdd="isLoadingAdd"
      :isLoadingUpdate="isLoadingUpdate"
      @closeMenu="$emit('closeMenu')"
      @updateLabel="update"
      @addLabel="add"
      @choseLabel="chooseLabel"
      @removeLabel="removeSourceRequest({ matterId:$route.params.matter || $route.params.projectId, id: $event })"
      @onOpenMenu="getDataSource"
      @changeDesc="$emit('changeDesc', $event)"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuLabel from "../../label-refactor/MenuLabel";
import { $$STORE_PREFIX } from '../../../../../utils'
export default {
  components: {
    MenuLabel
  },
  props: {
    labels: Array,
    isEmitOpenMenu: Boolean,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String,
    valid: Boolean,
    isShowMenu: Boolean,
    positionX: Number,
    positionY: Number,
    title: String,
    nameAdd: String,
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
    ...mapGetters("ht_store/matter/source", ["dataSource"])
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
      const dataFormMap = {
        name: dataForm.labelName,
        color: dataForm.colorValue,
      }
      try {
        this.isLoadingAdd = true;
        await this.addSourceRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          ...dataFormMap
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
    chooseLabel({ pk: idSelect, check }) {
      let data = [];
      if (check) {
        data = this.labels.filter(labelId => labelId !== idSelect)
      } else {
        data = [...this.labels, idSelect];
      }
      this.$emit("update", data);
    },
    ...mapActions("ht_store/matter/source", [
      "getDataSourceRequest",
      "addSourceRequest",
      "updateSourceRequest",
      "removeSourceRequest"
    ])
  },
};
</script>
