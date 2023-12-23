<template>
  <div>
    <MenuLabel
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      :listLabels="dataLabelsWorkSpace"
      :labels="labels"
      title="List labels"
      keyText="name"
      keyId="pk"
      keyColor="color"
      nameAdd="Add new labels"
      :valid="valid"
      :isLoadingGet="isLoadingGet || isLoadingDelete"
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

import baseIssueMixin from "./mixins/baseIssueMixin";

export default {
  mixins: [baseIssueMixin],
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
      isLoadingUpdate: false,
      isLoadingDelete: false
    };
  },
  methods: {
    async add({ dataForm, closeAdd }) {
      const dataFormMap = {
        name: dataForm.labelName,
        color: dataForm.colorValue,
        type: 1
      };
      try {
        this.isLoadingAdd = true;
        await this.addLableWorkSpaceRequest(dataFormMap);
        this.isLoadingAdd = false;
        closeAdd();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async update({ dataForm, closeUpdate }) {
      const dataFormMap = {
        name: dataForm.labelName,
        color: dataForm.colorValue,
        id: dataForm.id
      };

      try {
        this.isLoadingUpdate = true;
        await this.updateLableWorkSpaceRequest(dataFormMap);
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
    async removeLabel(id) {
      const labelFilter = this.labels.filter(labelId => labelId !== id);
      this.$emit("resetValueCheck", labelFilter);
      try {
        this.isLoadingDelete = true;
        await this.removeLableWorkSpaceRequest(id);
        this.isLoadingDelete = false;
      } catch (error) {
        this.isLoadingDelete = false;
      }
    }
  }
};
</script>
