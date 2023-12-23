<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <v-row no-gutters>
        <v-text-field
          hide-details
          :value="item.text"
          @change="update({id: item.id, value: $event})"
          class="ma-0 pa-0 custom-text-field"
        ></v-text-field>
        <v-btn icon class="ma-0" @click="remove(item.id)">
          <v-icon color="grey">delete_outline</v-icon>
        </v-btn>
      </v-row>
    </div>
    <AddInlineEnter
      style="width:300px"
      requireName="Text is required"
      :label="label"
      :hint="hint"
      prepend-inner-icon="mdi-plus"
      @add="add"
    />
  </div>
</template>

<script>
export default {};
</script>

<script>
import { mapActions, mapGetters } from "vuex";
import AddInlineEnter from "../../inputs/AddInlineEnter";
export default {
  components: {
    AddInlineEnter
  },
  props: {
    list: Array,
    label: String,
    hint: String
  },
  methods: {
    add(text) {
      const data = [...this.list, { id: Math.random(), text }];
      this.$emit("add", data);
    },
    update({ id, value }) {
      const data = this.list.map(x => {
        if (x.id === id) {
          return { ...x, text: value };
        }
        return x;
      });
      this.$emit("update", data);
    },
    remove(id) {
      const data = this.list.filter(x => x.id !== id);
      this.$emit("remove", data);
    },
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
