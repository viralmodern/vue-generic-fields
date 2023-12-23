<template>
  <div :class="`cell ${valueJoin.color}`">
    <SelectInline
      v-if="!$scopedSlots.default"
      :item="valueJoin"
      :items="appConfigs.symptomType"
      keyText="name"
      keyColor="color"
      @select="$emit('update', $event.value)"
    >
      <template slot="section">
        <div class="cell"></div>
      </template>
    </SelectInline>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../../../menus/SelectInline";
export default {
  components: {
    SelectInline
  },
  props: {
    value: [String, Number]
  },
  computed: {
    valueJoin() {
      return (
        (this.appConfigs.symptomType || []).find(x => x.value === this.value) ||
        {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  }
};
</script>
<style scoped>
.cell {
  width: 40px;
  height: 40px;
}
</style>
