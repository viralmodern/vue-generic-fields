<template>
  <v-row no-gutters>
    <a v-if="!isShowAddNewItem" @click="startEditting">
      <v-icon color="primary">add</v-icon>
      Add {{ parentLevel === 2 ? "nested checklist item" : "checklist item" }}
    </a>
    <v-form ref="form" v-else>
      <v-row no-gutters>
        <v-text-field
          @click.native.stop
          autofocus
          class="ma-0 pa-0"
          v-model="edittingName"
          :rules="[v => !!v || 'This field is required']"
        />
        <v-btn @click="save" class="ma-0 custom" icon color="primary">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn @click="cancel" class="ma-0 custom" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-form>
  </v-row>
</template>
<script>
export default {
  props: {
    parentLevel: Number,
    isShowAddNewItem: Boolean
  },
  data() {
    return {
      edittingName: ""
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = { name: this.edittingName };
        this.$emit("add", data);
        this.cancel();
      }
    },
    cancel() {
      this.$emit("toggleAddNewItem", false);
    },
    startEditting() {
      this.$emit("toggleAddNewItem", true);
    }
  },
  watch: {
    isShowAddNewItem(isOpen) {
      if (!isOpen) {
        this.edittingName = "";
      }
    }
  }
};
</script>
