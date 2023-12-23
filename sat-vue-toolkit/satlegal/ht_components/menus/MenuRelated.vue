<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" offset-x>
      <template v-slot:activator="{ on: onMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon
              :on="{ ...onMenu, ...onTooltip }"
              @onClickIcon="$emit('onOpenMenu')"
              :icon="icon"
            />
          </template>
          <span>{{ textTooltip }}</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-combobox
          v-model="select"
          :items="dataList"
          :label="label"
          multiple
          small-chips
          solo
          item-text="name"
          item-value="id"
          :search-input.sync="searchText"
          @change="
            $emit(
              'update',
              select.map(x => x.id)
            )
          "
        >
          <template v-slot:item="{ index, item }">
            <span>{{ item.name }}</span>
          </template>
          <template v-slot:selection="{ item, index }">
            <v-chip small v-if="index === 0 || index === 1 || index === 2">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 3" class="grey--text caption"
              >(+{{ select.length - 3 }} others)</span
            >
          </template>
        </v-combobox>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import AddIcon from "../common/buttons/AddIcon";

export default {
  components: {
    AddIcon
  },
  props: {
    icon: String,
    textTooltip: String,
    label: String,
    dataList: Array
  },
  data() {
    return {
      searchText: "",
      menu: false,
      select: []
    };
  },
  watch: {
    searchText(val) {
      if (val) {
        this.$emit("search", val);
      }
    }
  }
};
</script>
