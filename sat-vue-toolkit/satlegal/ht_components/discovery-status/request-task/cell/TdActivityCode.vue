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
import { mapGetters } from "vuex";
import SelectInline from "../../../menus/SelectInline";
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
      return (this.appConfigs.activitiesCode || []).find(x => x.code === this.dataRow.activities);
    },
    dataMap() {
      const a = (this.appConfigs.activitiesCode || []).map(x => {
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
