<template>
  <v-row no-gutters class="py-2">
    <v-row no-gutters class="align-center">
      <span class="title">{{ groupName }}</span>
      <v-spacer></v-spacer>
      <ByzantineRemoveList @remove="$emit('removeGroup')" />
    </v-row>
    <v-col cols="12">
      <div class="px-1 caption">
        <ProgessCheckList :done="done" :totals="totals" />
      </div>
    </v-col>
    <v-col cols="12">
      <div>
        <v-row no-gutters v-for="item in list" :key="item.id" class="caption align-center">
          <ByzantineItemCheckBox
            :status="item.status"
            @checkbox="$emit('checkbox', { id: item.id, status: $event })"
          />
          <v-text-field
            hide-details
            :value="item.name"
            @change="change($event, item.id)"
            class="ma-0 pa-0 custom-text-field"
          ></v-text-field>
          <v-btn icon class="ma-0" @click="$emit('removeItem', item.id)">
            <v-icon color="grey">mdi-delete_outline</v-icon>
          </v-btn>
        </v-row>
        <div class="pl-1">
          <v-btn
            v-if="!isShowAddItem"
            color="primary"
            class="ma-0"
            @click="isShowAddItem = true"
          >Add item</v-btn>
          <AddInline
            v-else
            style="width:300px"
            @add="$emit('addItemInGroup', $event)"
            @close="isShowAddItem = false"
            hint="Enter to add new item"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ByzantineRemoveList from "../menus/ByzantineRemoveList";
import AddInline from "../inputs/AddInline";
import ByzantineItemCheckBox from "../inputs/ByzantineItemCheckBox";
import ProgessCheckList from "../progress-bars/ProgessCheckList";
export default {
  components: {
    ByzantineItemCheckBox,
    ByzantineRemoveList,
    ProgessCheckList,
    AddInline
  },
  props: {
    groupName: String,
    list: Array
  },
  data() {
    return {
      isShowAddItem: false
    };
  },
  computed: {
    totals() {
      return this.list.length;
    },
    done() {
      if (!this.list.length) return 0;
      return this.list.filter(e => e.status).length;
    }
  },
  methods: {
    change(name, id) {
      const data = {
        id,
        name
      };
      this.$emit("updateItem", data);
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
