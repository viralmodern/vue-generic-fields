<template>
  <div>
    <v-row class="flex-nowrap label-item align-center" no-gutters>
      <LabelColor
        v-for="item in labels.slice(0, countShow)"
        :key="item[keyId]"
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
        :keyId="keyId"
        :keyText="keyText"
        :keyColor="keyColor"
        :nameAdd="nameAdd"
        :valid="valid"
        :descForm="descForm"
        :description="description"
        :isLoadingGet="isLoadingGet"
        :isLoadingAdd="isLoadingAdd"
        :isLoadingUpdate="isLoadingUpdate"
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
import LabelColor from "../../chips/LabelColor";
import MenuLabel from "./MenuLabel";
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
    keyId: String,
    keyColor: String,
    nameAdd: String,
    lengthDisplay: String,
    icon: String,
    textTooltip: String,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String,
    valid: Boolean,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
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
