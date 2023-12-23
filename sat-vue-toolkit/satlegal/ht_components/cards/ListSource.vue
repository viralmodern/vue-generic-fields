<template>
  <div>
    <v-row class="flex-nowrap label-item align-center" no-gutters>
      <v-chip
        v-for="item in labels.slice(0, countShow)"
        :key="item.id"
        label
        class="custom-chip"
      >
        <span>{{ item[keyText] }}</span>
      </v-chip>
      <v-chip v-if="labels.length > lengthDisplay" label class="count-tag">
        <span>+ {{ labels.length - lengthDisplay }}</span>
      </v-chip>
      <MenuSource
        :listLabels="listLabels"
        :labels="labels"
        :title="title"
        :keyText="keyText"
        :keyColor="keyColor"
        :nameAdd="nameAdd"
        @updateLabel="$emit('updateLabel', $event)"
        @addLabel="$emit('addLabel', $event)"
        @choseLabel="$emit('choseLabel', $event)"
        @removeLabel="$emit('removeLabel', $event)"
        @onOpenMenu="$emit('onOpenMenu')"
      />
    </v-row>
  </div>
</template>

<script>
import MenuSource from "../menus/MenuSource";
export default {
  components: {
    MenuSource
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyText: String,
    keyColor: String,
    nameAdd: String,
    lengthDisplay: String
  },
  computed: {
    countShow() {
      return this.lengthDisplay ? this.lengthDisplay : this.labels.length;
    }
  }
};
</script>
<style scoped>
.count-tag {
  border-radius: 10px;
  background-color: #339966;
}
.custom-chip {
  height: 25px !important;
  border-radius: 4px;
  margin: 0px 2px;
}
</style>
