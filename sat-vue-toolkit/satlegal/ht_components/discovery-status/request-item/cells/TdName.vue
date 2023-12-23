<template>
  <td>
    <SelectInline
      :item="dataJoin"
      :items="dataCAFDiscovery"
      keyText="name"
      @select="$emit('update', $event.pk)"
    >
      <template slot="section" slot-scope="{item}">
        <span style="color: rgba(0,0,0,0.87); white-space: nowrap">{{item.name}}</span>
      </template>
      <template slot="menu" slot-scope="{item}">
        <span>{{item.name}}</span>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    dataJoin() {
      return (
        this.dataCAFDiscovery.find(x => x.pk === this.dataRow.request_set) || {}
      );
    },
    ...mapGetters("ht_store/matter/discovery/status/requestSets", ["dataCAFDiscovery"])
  }
};
</script>
