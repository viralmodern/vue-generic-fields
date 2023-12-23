<template>
  <div>
    <ProjectLabels
      :labels="dataJoinDamage"
      :listLabels="damages"
      keyText="name"
      keyColor="color"
      title="List Damage"
      nameAdd="Add new Damage"
      @addLabel="addDamage"
      @updateLabel="updateDamagesRequest"
      @removeLabel="removeDamage"
      @choseLabel="chooseDamage"
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
    damage: Array
  },
  computed: {
    dataJoinDamage() {
      const result = (this.damages || []).filter(x =>
        (this.damage || []).includes(x.id)
      );
      return result;
    },
    ...mapGetters("ht_store/matter/partient/damage", ["damages"])
  },
  methods: {
    addDamage(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addDamagesRequest(data);
    },
    chooseDamage({ id: idSelect, check }) {
      let data;
      if (check) {
        data = {
          damage: this.damage.filter(id => id !== idSelect)
        };
      } else {
        data = {
          damage: [...this.damage, idSelect]
        };
      }
      this.updateNegligenceRequest(data);
    },
    async removeDamage(id) {
      await this.removeDamagesRequest(id);
      const data = {
        damages: this.damages.filter(x => x !== id)
      };
      this.updateNegligenceRequest(data);
    },
    ...mapActions("ht_store/matter/partient/negligence/detail", [
      "updateNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage", [
      "addDamagesRequest",
      "updateDamagesRequest",
      "removeDamagesRequest"
    ])
  }
};
</script>
