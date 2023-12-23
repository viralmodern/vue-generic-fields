<template>
  <div class="pa-2">
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on }">
        <v-btn outlined color="primary" v-on="on">
          <v-icon class="mr-2">mdi-add_circle_outline</v-icon>Add New Goal
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="text-h6 font-weight-regular white--text">
              Add New Goal
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="py-1"
            v-model="title"
            :rules="[v => !!v || 'First name is required']"
            label="Title"
            required
            append-icon="radio_button_checked"
          ></v-text-field>
          <v-select
            item-text="name"
            item-value="id"
            v-model="label"
            :items="labels"
            label="Select Item"
            multiple
            :rules="[v => !!v || 'Labels is required']"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption"
                >(+{{ label.length - 1 }} others)</span
              >
            </template>
          </v-select>
          <span>Labels:</span>
          <v-btn small fab @click="isShowAddLabel = true" v-if="!color">
            <v-icon size="25">mdi-add_circle_outline</v-icon>
          </v-btn>
          <v-chip
            v-else
            :color="color"
            class="ml-3 mx-3"
            label
            small
            @click="isShowAddLabel = true"
            >&nbsp; &nbsp; &nbsp;</v-chip
          >
          <CreateTextColor
            :isShow="isShowAddLabel"
            @submit="submit"
            @closeModal="cancel"
            btnAdd="Add Labels"
            labelTitle="Add Labels"
            labelColor="Labels name"
          />
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="postAddGold">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CreateTextColor from "./CreateTextColor";
export default {
  data() {
    return {
      dialog: false,
      title: "",
      label: "",
      valid: false,
      color: "",
      isShowAddLabel: false,
      labelArr: []
    };
  },
  components: {
    CreateTextColor
  },
  props: {
    labels: Array
  },
  methods: {
    postAddGold() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          title: this.title,
          labels: this.label,
          keyResults: [],
          color: this.color
        };
        this.$emit("addNewGoal", data);
        this.$refs.form.reset();
        this.dialog = false;
      }
    },
    cancel() {
      this.isShowAddLabel = false;
    },
    submit(data) {
      this.color = data.colorValue ? data.colorValue : "default";
    }
  }
};
</script>
