<template>
  <div>
    <!--    <keep-alive>-->
    <div class="row_filter">
      <div class="row_filter--item predicate">
        <template v-if="isAttributeStarts">
          <span class="pl-3 d-flex align-center fill-height">Where</span>
        </template>
        <template v-else-if="disabledPredicate">
        <span class="pl-3 d-flex align-center fill-height">
          {{ predicate | lb }}
        </span>
        </template>
        <template v-else>
          <v-autocomplete v-model="item.predicate"
                          @change="changePredicate"
                          :items="PREDICATE"
                          v-bind="vBind"
                          style="font-size: 12px;"
                          item-text="label"
                          item-value="value"
                          return-object
                          placeholder="Predicate"></v-autocomplete>
        </template>
      </div>
      <div class="row_filter--item">
        <v-autocomplete v-model="item.attribute"
                        label="Attributes"
                        item-text="label"
                        item-value="name"
                        v-bind="vBind"
                        style="font-size: 12px;"
                        return-object
                        outlined
                        dense
                        :items="attributes">
          <template v-slot:item="data">
            <v-list-item-icon>
              <v-icon small>{{ data.item.type | getIconAttribute }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="caption text-capitalize"
                                 v-text="data.item.label"></v-list-item-content>
          </template>
        </v-autocomplete>
      </div>
      <template v-if="item.attribute">
        <div class="row_filter--item">
          <v-autocomplete v-model="item.operator"
                          v-bind="vBind"
                          label="Operators"
                          item-text="label"
                          item-value="value"
                          style="font-size: 12px;"
                          return-object
                          outlined
                          :items="operators"></v-autocomplete>
        </div>
      </template>
      <div class="row_filter--item value-operator">
        <template v-if="item.operator">
          <ValueFilterOptions :item="item"
                              v-model="item.value"
                              outlined
                              :sources="attributeSource"
                              :item-text="itemText"
                              :item-value="itemValue"
                              :attribute-type="attributeType"
                              :operator-type="operatorType"/>
        </template>
      </div>
      <div class="row_filter--item flex-grow-1">
        <div class="d-flex align-center justify-end fill-height box_clear">
          <ClearFilterItemButton :item="item"/>
        </div>
      </div>
    </div>
    <!--    </keep-alive>-->
  </div>
</template>

<script>
import ClearFilterItemButton from "./ClearFilterItemButton"
import ValueFilterOptions from "./ValueFilterOptions"
import {PREDICATE} from "@/sat-vue-toolkit/components/slick-grid/configs/operations"
import {getIconAttribute, getOperatorsAttribute} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import {vBindField} from "@/sat-vue-toolkit/components/FilterBuilder/configs"

export default {
  name: "FilterBuilderItem",
  components: {
    ValueFilterOptions,
    ClearFilterItemButton
  },
  filters: {
    getIconAttribute,
    getOperatorsAttribute,
    lb(v) {
      try {
        return v["label"]
      } catch (e) {
        return ""
      }
    }
  },
  props: {
    vBind: {
      ...vBindField
    },
    item: {
      type: Object
    },
    attributes: {
      type: Array
    },
    disabledPredicate: {
      type: Boolean,
      default: () => true
    },
    predicate: {},
    isAttributeStarts: {
      type: Boolean,
      default: () => false
    },

    value: {}
  },
  data() {
    return {
      attribute: null,
      operator: null,
      PREDICATE
    }
  },
  computed: {
    operators() {
      try {
        return getOperatorsAttribute(this.item.attribute["type"])
      } catch (e) {
        return []
      }
    },
    attributeType() {
      try {
        return this.item.attribute["type"]
      } catch (e) {
        return null
      }
    },
    attributeSource() {
      try {
        return this.item.attribute["list"]
      } catch (e) {
        return []
      }
    },
    operatorType() {
      try {
        return this.item.operator["type"]
      } catch (e) {
        return null
      }
    },
    itemValue() {
      try {
        return this.item.attribute["itemValue"]
      } catch (e) {
        return ''
      }
    },
    itemText() {
      try {
        return this.item.attribute["itemText"]
      } catch (e) {
        return ''
      }
    },

  },
  watch: {
    item() {
      this.$emit('input', this.item);
    },
  },
  methods: {
    changePredicate(predicate) {
      this.$emit("changePredicate", predicate)
    }
  }
}
</script>

<style>
.v-select:not(.v-text-field--single-line):not(.v-text-field--outlined)
.v-select__slot
> input {
  font-size: 13px;
}
</style>
<style scoped
       lang="scss">
.row_filter {
  display: flex;

  .box_clear {
    opacity: 0;
    pointer-events: none;
  }

  &--item {
    /*border: solid 1px red;*/
    padding: 5px;

    &.predicate {
      width: 120px;
    }

    &.value-operator {
      width: 250px;
    }
  }

  &:hover {
    .box_clear {
      opacity: 1;
      pointer-events: visible;
    }
  }
}
</style>
