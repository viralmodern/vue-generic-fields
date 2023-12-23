<template>
  <div>
    <MenuLabel
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      :listLabels="dataTag"
      :labels="labels"
      title="List Privilege Label"
      keyText="name"
      keyId="pk"
      keyColor="color"
      nameAdd="Add new"
      :valid="valid"
      :isLoadingGet="isLoadingGet"
      :isLoadingAdd="isLoadingAdd"
      :isLoadingUpdate="isLoadingUpdate"
      @closeMenu="$emit('closeMenu')"
      @updateLabel="update"
      @addLabel="add"
      @choseLabel="chooseLabel"
      @removeLabel="removeLabel"
    />
  </div>
</template>
<script>
import MenuLabel from "../../label-refactor/MenuLabel";

import baseTagMixin from "./mixins/baseTagMixin";

export default {
  mixins: [baseTagMixin],
  components: {
    MenuLabel
  },
  props: {
    labels: Array,
    isEmitOpenMenu: Boolean,
    isLoadingGet: Boolean,
    valid: Boolean,
    isShowMenu: Boolean,
    positionX: Number,
    positionY: Number
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingUpdate: false
    };
  },
  methods: {
    async add({ dataForm, closeAdd }) {
      const dataFormMap = {
        name: dataForm.labelName,
        color: dataForm.colorValue
      };
      try {
        this.isLoadingAdd = true;
        await this.addTagRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          ...dataFormMap
        });
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
       this.isLoadingAdd = false;
       throw error;
      }
    },
    async update({ dataForm, closeUpdate }) {
      try {
        this.isLoadingUpdate = true;
        await this.updateTagRequest({
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
        data = this.labels.filter(labelId => labelId !== idSelect);
      } else {
        data = [...this.labels, idSelect];
      }
      this.$emit("update", data);
    },
    removeLabel(id) {
      const labelFilter = this.labels.filter(labelId => labelId !== id);
      this.$emit('resetValueCheck', labelFilter)

      this.removeTagRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, id })
    }
  }
};
</script>
