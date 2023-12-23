<template>
  <div>
    <v-row class="label-item align-center" no-gutters>
      <LabelColor
        v-for="item in labels"
        :key="item.id"
        :color="item[keyColor]"
        :text="item[keyText]"
      />
      <MenuLabelOnlySelect
        :listLabels="listLabels"
        :placeholder="placeholder"
        :labels="labels"
        :title="title"
        :keyText="keyText"
        :keyColor="keyColor"
        @choseLabel="$emit('choseLabel', $event)"
      />
    </v-row>
  </div>
</template>

<script>
import LabelColor from "../chips/LabelColor2";
import MenuLabelOnlySelect from "../menus/MenuLabelOnlySelect";
export default {
  components: {
    LabelColor,
    MenuLabelOnlySelect
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyText: String,
    keyColor: String,
    placeholder: String
  }
};
</script>
