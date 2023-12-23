<template>
  <td>
    <ProgressMultiColor
      :isStrike="dataRow.isStrike"
      :list="dataRow.totalResult"
      keyProgress="progress"
      keyColor="color"
    />
  </td>
</template>
<script>
import ProgressMultiColor from "../../progress-bars/ProgressMultiColor";
export default {
  components: {
    ProgressMultiColor
  },
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
