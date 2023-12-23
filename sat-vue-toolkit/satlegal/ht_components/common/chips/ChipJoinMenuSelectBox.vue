<template>
  <div class="d-flex align-center chip">
    <div class="mr-2">
      <v-btn
        ref="refFlag"
        icon
        :color="itemComputed.color"
        v-if="flag"
      >
        <v-icon>mdi-flag</v-icon>
      </v-btn>
      <span class="text-no-wrap text-caption" v-else-if="text">
        <span v-if="itemComputed[keyText]">
          {{itemComputed[keyText]}}
        </span>
        <span v-else class="text-caption" style="color:rgba(0,0,0,.6)">
          {{textNoData}}
        </span>
      </span>
      <v-chip
        ref="refChip"
        style="cursor: pointer;"
        small
        v-else
        :color="itemComputed.color || 'primary'"
        label
      >
        <span class="white--text">{{ itemComputed[keyText] }}</span>
      </v-chip>
    </div>
    <div v-if="isShowDropDown" class="wrap-add-icon">
      <AddIcon
        class="add-icon"
        ref="refAddIcon"
        @onClickIcon="onClickChip"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script>
import findItemInListSelectBox from "../menus/checkbox/mixins/findItemInListSelectBox";
import AddIcon from "../buttons/AddIcon";

export default {
  mixins: [findItemInListSelectBox],
  components: {
    AddIcon
  },
  props: {
    flag: Boolean,
    text: Boolean,
    icon: {
      type: String,
      default: () => 'mdi-arrow-down'
    },
    textNoData: String,
    isShowDropDown: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    onClickChip() {
      const data = {
        positionX: this.$refs.refAddIcon.$el.getBoundingClientRect().left,
        positionY: this.$refs.refAddIcon.$el.getBoundingClientRect().top
      };
      this.$emit("onClickChip", data);
    }
  }
};
</script>

<style scoped>
.chip:hover .wrap-add-icon {
  visibility: visible;
}
.wrap-add-icon {
  width: 28px;
  height: 28px;
  visibility: hidden;
}

.chip:hover .add-icon {
  display: block;
}
.add-icon {
  display: none;
}
</style>
