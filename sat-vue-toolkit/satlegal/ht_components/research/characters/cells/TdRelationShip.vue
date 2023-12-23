<template>
  <div class="cell">
    <div v-if="dataRow.id === column.id" class="cell__not-relation"></div>
    <div
      class="cell__relation"
      ref="refRelationType"
      @click="select"
      v-else
      :style="{
        background: joinRelationShipType.color || '#8080807a'
      }"
    ></div>
  </div>
</template>

<script>
import { relationShipType } from "../../../../config.js";
export default {
  props: {
    column: Object,
    dataRow: Object,
    listRelationShipMap: Array
  },
  data() {
    return {
      relationShipType
    };
  },
  computed: {
    mapRelationShip() {
      const { id: from_id } = this.dataRow;
      const { id: to_id } = this.column;
      return (
        this.listRelationShipMap.find(
          x => x.from_id === from_id && x.to_id === to_id
        ) || { value: 0 }
      );
    },
    joinRelationShipType() {
      return (
        this.relationShipType.find(x => x.id === this.mapRelationShip.value) ||
        {}
      );
    }
  },
  methods: {
    select() {
      const data = {
        positionX: this.$refs.refRelationType.getBoundingClientRect().left,
        positionY: this.$refs.refRelationType.getBoundingClientRect().top,
        value: this.mapRelationShip.value,
        id: this.mapRelationShip.id,
      };

      this.$emit("onChange", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  height: 100%;

  &__not-relation {
    background: black;
    width: 100%;
    height: 100%;
  }

  &__relation {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
