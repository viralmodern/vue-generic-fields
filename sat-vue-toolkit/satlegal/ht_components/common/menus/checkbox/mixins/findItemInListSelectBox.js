import { NA } from "@/sat-vue-toolkit/satlegal/config";

export default {
  props: {
    value: [Number, String, Boolean],
    dataList: Array,
    keyValue: {
      type: String,
      default: () => "id"
    },
    keyText: {
      type: String,
      default: () => "name"
    }
  },
  computed: {
    itemComputed() {
      return (
        (this.dataList || []).find(f => f[this.keyValue] === this.value) || NA
      );
    }
  }
};
