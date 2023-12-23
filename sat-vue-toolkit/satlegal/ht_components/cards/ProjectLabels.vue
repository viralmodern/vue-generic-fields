<template>
  <div>
    <v-row class="flex-nowrap label-item align-center" no-gutters>
      <LabelColor
        v-for="item in labels.slice(0, countShow)"
        :key="item.id"
        :color="item[keyColor]"
        :text="item[keyText]"
      />
      <v-chip
        v-if="labels.length > lengthDisplay"
        label
        small
        class="white--text custom-chip1 count-tag primary"
      >
        <span>+ {{ labels.length - lengthDisplay }}</span>
      </v-chip>
      &nbsp;
      <MenuLabel
        :textTooltip="textTooltip"
        :icon="icon"
        :listLabels="listLabels"
        :labels="labels"
        :title="title"
        :keyText="keyText"
        :keyColor="keyColor"
        :nameAdd="nameAdd"
        :descForm="descForm"
        :description="description"
        :isLoadingGet="isLoadingGet"
        @updateLabel="$emit('updateLabel', $event)"
        @addLabel="$emit('addLabel', $event)"
        @choseLabel="$emit('choseLabel', $event)"
        @removeLabel="$emit('removeLabel', $event)"
        @onOpenMenu="$emit('onOpenMenu')"
        @changeDesc="$emit('changeDesc', $event)"
      />
    </v-row>
  </div>
</template>

<script>
import LabelColor from "../chips/LabelColor2";
import MenuLabel from "../menus/MenuLabel";
export default {
  components: {
    LabelColor,
    MenuLabel
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyText: String,
    keyColor: String,
    nameAdd: String,
    lengthDisplay: String,
    icon: String,
    textTooltip: String,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String
  },
  computed: {
    countShow() {
      // return this.lengthDisplay > 2 ? this.lengthDisplay : 2;
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
</style>
