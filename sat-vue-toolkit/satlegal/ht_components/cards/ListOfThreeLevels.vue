<template>
  <v-row no-gutters class="py-2">
    <v-col cols="12">
      <v-row>
        <v-icon color="black">mdi-format_list_numbered</v-icon>
        <span class="text-h5 font-weight-bold ml-1">{{ groupName }}</span>
      </v-row>
    </v-col>
    <v-col cols="12">
      <div v-for="(x, i1) in list" :key="i1" class="ml-2">
        <ListCaseBrief
          :items="x"
          :itemList="x"
          :countLength="`${i1 + 1}.`"
          :children="list"
          fontStyle="font-size: 18px; font-weight: 500"
          @updateItem="data => $emit('updateItem', data)"
          @removeItem="data => $emit('removeItem', data)"
        />
        <div class="ml-3" v-for="(m, i2) in x.children" :key="i2">
          <ListCaseBrief
            :items="m"
            :itemList="x"
            :countLength="`${i1 + 1}.${i2 + 1}`"
            :children="m.children"
            fontStyle="font-size: 16px; font-weight: 400"
            @updateItem="data => $emit('updateItem', data)"
            @removeItem="data => $emit('removeItem', data)"
          />
          <div v-if="m.children">
            <div class="ml-3" v-for="(r, i3) in m.children" :key="i3">
              <ListCaseBrief
                :items="r"
                :itemList="x"
                :countLength="`${i1 + 1}.${i2 + 1}.${i3 + 1}`"
                :children="r.children"
                fontStyle="font-size: 14px; font-weight: 300"
                @updateItem="data => $emit('updateItem', data)"
                @removeItem="data => $emit('removeItem', data)"
              />
            </div>
            <AddInlineAllLevel
              class="ml-3"
              color="orange"
              nameBtnAdd="Add something"
              hint="Enter to add something"
              @add="name => $emit('add', { item: m, name })"
            />
          </div>
        </div>
        <AddInlineAllLevel
          color="red"
          class="ml-3 mt-1"
          nameBtnAdd="Add something"
          hint="Enter to add something"
          @add="name => $emit('add', { item: x, name })"
        />
      </div>
      <AddInlineAllLevel
        class="ml-3 mt-1"
        color="primary"
        nameBtnAdd="Add something"
        hint="Enter to add something"
        @add="name => $emit('add', { item: this.item, name })"
      />
    </v-col>
  </v-row>
</template>
<script>
import ListCaseBrief from "../list/ListCaseBrief";
import AddInlineAllLevel from "../inputs/AddInlineAllLevel";
export default {
  components: {
    ListCaseBrief,
    AddInlineAllLevel
  },
  props: {
    groupName: String,
    list: Array,
    item: Object
  }
};
</script>
