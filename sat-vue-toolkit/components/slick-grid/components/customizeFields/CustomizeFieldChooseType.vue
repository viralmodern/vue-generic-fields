<template>
  <v-autocomplete :label="label"
            small-chips
            @change="data => $emit('change', {data, k: 'field_type'})"
            :value="value"
            :items="items"
            :item-value="itemValue"
            :menu-props="{ offsetY: true }"
            :item-text="itemText">
    <template v-slot:selection="data">
      <v-chip v-bind="data.attrs"
              small
              pill
              @click="data.select"
              :input-value="data.selected">
        <v-icon left small>
          {{data.item.ICON}}
        </v-icon>
        {{ data.item.LABEL }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-icon class="mr-2">
          <v-icon small>{{data.item.ICON}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="caption" v-html="data.item.LABEL"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
  export default {
    name: "CustomizeFieldChooseType",
    props: {
      value: {
        type: [String, Number, Object],
        default: () => ""
      },
      label: {
        type: [String, Number],
        default: () => "Field Type"
      },
      items: {
        type: [Array],
        default: () => []
      },
      itemValue: {
        type: String,
        default: () => "TYPE"
      },
      itemText: {
        type: String,
        default: () => "LABEL"
      }

    }
  }
</script>

<style scoped>

</style>
