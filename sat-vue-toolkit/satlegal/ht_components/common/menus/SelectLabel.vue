<template>
  <v-row class="flex-nowrap label-item align-center" no-gutters>
    <LabelColor
      v-for="item in labelChipComputed.slice(0, countShow)"
      :key="item.id"
      :color="item.color"
      :text="item.name"
    />
    <v-chip
      v-if="valueComputed.length > lengthDisplay"
      label
      small
      class="white--text custom-chip1 count-tag primary"
    >
      <span>+ {{ valueComputed.length - lengthDisplay }}</span>
    </v-chip>
    &nbsp;
    <MenuShingeLabel
      keyText="name"
      keyColor="color"
      :textTooltip="textTooltip"
      :labels="labels"
      :title="title"
      :value="valueComputed"
      @onClickIcon="$emit('onOpenMenu')"
      @chooseLabel="chooseLabel"
    />
  </v-row>
</template>
<script>
import LabelColor from "../../chips/LabelColor";
import MenuShingeLabel from "../../menus/MenuShingeLabel";
export default {
  components: {
    MenuShingeLabel,
    LabelColor
  },
  props: {
    textTooltip: String,
    title: String,
    labels: Array,
    single: Boolean,
    multiple: Boolean,
    value: [String, Number, Array],
    lengthDisplay: {
      type: [String, Number],
      default: () => 3
    }
  },
  computed: {
    valueComputed() {
      if (this.value) {
        return this.single ? [this.value] : this.value;
      }   
      return []   
    },
    countShow() {
      return this.lengthDisplay;
    },
    labelChipComputed() {
      if (this.single) {
        return [(this.labels || []).find(f => f.id === this.value) || {}];
      }
      if (this.multiple) {
        const result = [];
        (this.value || []).forEach(id => {
          const findLabel = this.labels.find(t => t.id === id);
          if (findLabel) {
            result.push(findLabel);
          }
        });
        return result;
      }
      return [];
    }
  },
  methods: {
    chooseLabel({ check, id: idSelect }) {
      let data;
      if (this.single) {
        data = this.selectSingle(check, idSelect);
      } else {
        data = this.selectMultiple(check, idSelect);
      }
      this.$emit("chooseLabel", data);
    },
    selectMultiple(check, idSelect) {
      let data;
      if (check) {
        data = (this.valueComputed || []).filter(id => id !== idSelect);
      } else {
        data = [...this.valueComputed, idSelect];
      }
      return data;
    },
    selectSingle(check, idSelect) {
      let data;
      if (check) {
        data = null;
      } else {
        data = idSelect;
      }
      return data;
    }
  }
};
</script>
