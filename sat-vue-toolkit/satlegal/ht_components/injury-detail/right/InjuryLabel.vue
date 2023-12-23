<template>
  <div>
    <ProjectLabels
      :labels="dataInjurysLabelJoin"
      :listLabels="label"
      keyText="name"
      keyColor="color"
      title="List Injury"
      nameAdd="Add new Injury"
      @addLabel="addInjury"
      @updateLabel="updateInjuryLabelRequest"
      @removeLabel="removeInjury"
      @choseLabel="chooseInjury"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectLabels from "../../cards/ProjectLabels";
export default {
  components: {
    ProjectLabels
  },
  props: {
    injuryLabel: Array
  },
  computed: {
    dataInjurysLabelJoin() {
      const result = (this.label || []).filter(x =>
        (this.injuryLabel || []).includes(x.id)
      );
      return result;
    },
    ...mapGetters("ht_store/matter/partient/injury/label", ["label"])
  },
  methods: {
    addInjury(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addInjuryLabelRequest(data);
    },
    chooseInjury({ id: idSelect, check }) {
      let data;
      if (check) {
        data = {
          injuryLabel: this.injuryLabel.filter(id => id !== idSelect)
        };
      } else {
        data = {
          injuryLabel: [...this.injuryLabel, idSelect]
        };
      }
      this.updateInjuryRequest(data);
    },
    async removeInjury(id) {
      await this.removeLabelInjurysRequest(id);
      const data = {
        injuryLabel: this.injuryLabel.filter(x => x !== id)
      };
      this.updateInjuryRequest(data);
    },
    ...mapActions("ht_store/matter/partient/injury/detail", [
      "updateInjuryRequest"
    ]),
    ...mapActions("ht_store/matter/partient/label", [
      "addInjuryLabelRequest",
      "updateInjuryLabelRequest",
      "removeLabelInjurysRequest"
    ])
  }
};
</script>
