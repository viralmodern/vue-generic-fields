<template>
  <td>
    <SelectInline :item="itemJoin" :items="dataMap" keyText="code" @select="onChange">
      <template slot="section" slot-scope="props">
        <span>{{props.item.code}}</span>
      </template>
      <template slot="menu" slot-scope="props">
        <span>{{props.item.display}}</span>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import SelectInline from "../../../../menus/SelectInline";
import { mapGetters } from "vuex";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  components: {
    SelectInline
  },
  data() {
    return {
      type: ""
    };
  },
  computed: {
    itemJoin() {
      return (this.appConfigs.expenseCode || []).find(
        x => x.code === this.dataRow.expense_code
      );
    },
    dataMap() {
      const a = (this.appConfigs.expenseCode || []).map(x => {
        return { ...x, display: x.code + " - " + x.title };
      });
      return a;
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onChange(value) {
      this.$emit("update", value.code);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
