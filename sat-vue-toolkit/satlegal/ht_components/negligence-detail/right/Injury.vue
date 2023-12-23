<template>
  <div>
    <ProjectLabels
      :labels="dataInjurysJoin"
      :listLabels="injurys"
      keyText="name"
      keyColor="color"
      title="List Injury"
      nameAdd="Add new Injury"
      @addLabel="addInjury"
      @updateLabel="updateInjuryRequest"
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
    injury: Array
  },
  computed: {
    dataInjurysJoin() {
      const result = (this.injurys || []).filter(x =>
        (this.injury|| []).includes(x.id)
      );
      return result;
    },
    ...mapGetters("ht_store/matter/partient/injury", ["injurys"])
  },
  methods: {
    addInjury(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addInjuryRequest(data);
    },
    chooseInjury({ id: idSelect, check }) {
      let data;
      if (check) {
        data = {
          injury: this.injury.filter(id => id !== idSelect)
        };
      } else {
        data = {
          injury: [...this.injury, idSelect]
        };
      }
      this.updateNegligenceRequest(data);
    },
    async removeInjury(id) {
      await this.removeInjuryRequest(id);
      const data = {
        injury: this.injury.filter(x => x !== id)
      };
      this.updateNegligenceRequest(data);
    },
    ...mapActions("ht_store/matter/partient/negligence/detail", [
      "updateNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/partient/injury", [
      "addInjuryRequest",
      "updateInjuryRequest",
      "removeInjuryRequest"
    ])
  }
};
</script>
