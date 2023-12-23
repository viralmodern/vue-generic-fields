<template>
  <div>
    <MenuLabel
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      :listLabels="dataEvidenceDeviceType"
      :labels="labels"
      title="List Device Type"
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

import baseEvidenceDeviceTypeMixin from "./mixins/baseEvidenceDeviceTypeMixin";

export default {
  mixins: [baseEvidenceDeviceTypeMixin],
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
        await this.addEvidenceDeviceTypeRequest({
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
        await this.updateEvidenceDeviceTypeRequest({
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

      this.removeEvidenceDeviceTypeRequest({ matterId: this.$route.params.matter || this.$route.params.projectId, id })
    }
  }
};
</script>
