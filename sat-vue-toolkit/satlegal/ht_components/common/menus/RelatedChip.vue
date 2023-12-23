<template>
  <v-col cols="12">
    <v-row class="flex-nowrap label-item align-center" no-gutters>
      <v-chip
        v-for="(chip, index) in dataChip.slice(0, 3)"
        :key="index"
        small
        color="black"
        label
        class="white--text custom-chip mr-2"
      >
        <span>{{ chip.name }}</span>
      </v-chip>
      <v-chip
        v-if="value.length > 3"
        small
        color="primary"
        label
        class="white--text custom-chip mr-2"
      >
        <span>+ {{ value.length - 3 }}</span>
      </v-chip>
      <MenuRelated
        :dataList="
          (dataList || []).map(x => ({ name: x[keyName], id: x.pk || x.id }))
        "
        :label="`Search ${textTooltip}`"
        :textTooltip="textTooltip"
        @update="$emit('update', $event)"
        @search="$emit('search', $event)"
      />
    </v-row>
  </v-col>
</template>
<script>
import MenuRelated from "../../menus/MenuRelated";
export default {
  props: {
    textTooltip: String,
    dataList: Array,
    keyName: String,
    value: Array
  },
  components: {
    MenuRelated
  },
  computed: {
    dataChip() {
      return (this.dataList || []).filter(f => {
        return this.value.includes(f.pk);
      });
    }
  }
};
</script>
