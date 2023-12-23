<template>
  <div>
    <ProjectLabels
      :labels="dataDamageJoin"
      :listLabels="labels"
      keyText="name"
      keyColor="color"
      title="List Injury"
      nameAdd="Add new Injury"
      @addLabel="addDamageLabel"
      @updateLabel="updateDamageLabelRequest"
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
    damageLabel: Array
  },
  computed: {
    dataDamageJoin() {
      const result = (this.labels || []).filter(x =>
        (this.damageLabel || []).includes(x.id)
      );
      return result;
    },
    ...mapGetters("ht_store/matter/partient/damage/label", ["labels"])
  },
  methods: {
    addDamageLabel(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addDamageLabelRequest(data);
    },
    chooseInjury({ id: idSelect, check }) {
      let data;
      if (check) {
        data = {
          damageLabel: this.damageLabel.filter(id => id !== idSelect)
        };
      } else {
        data = {
          damageLabel: [...this.damageLabel, idSelect]
        };
      }
      this.updateInjuryRequest(data);
    },
    async removeInjury(id) {
      await this.removeLabelDamagesRequest(id);
      const data = {
        damageLabel: this.damageLabel.filter(x => x !== id)
      };
      this.updateInjuryRequest(data);
    },
    ...mapActions("ht_store/matter/partient/injury/detail", [
      "updateInjuryRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage/label", [
      "addDamageLabelRequest",
      "updateDamageLabelRequest",
      "removeLabelDamagesRequest"
    ])
  }
};
</script>
