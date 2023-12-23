<template>
  <td v-bind:style="{backgroundColor: showClassColor(type.name)}">
    <span class="white--text">{{type.name}}</span>
  </td>
</template>
<script>
import { typeIndex } from "../../../config";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      typeIndex
    };
  },
  computed: {
    type() {
      return this.typeIndex.filter(x => x.id === this.dataRow.type)[0];
    }
  },
  methods: {
    showClassColor(name) {
      if (name === "Document") {
        return "#E53935";
      } else if (name === "Photograph") {
        return "#673AB7";
      } else {
        return "#00E676";
      }
    }
  }
};
</script>
