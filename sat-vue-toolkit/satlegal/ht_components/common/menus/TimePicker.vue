<template>
  <v-row no-gutters>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <div class="d-flex text-no-wrap align-center">
          <span class="mr-2 text-caption">{{value ? value : '(No time)'}}</span>
          <AddIcon :on="on" icon="mdi-calendar" />
        </div>
      </template>
      <v-time-picker v-if="menu" v-model="time">
        <v-spacer></v-spacer>
        <v-btn color="primary" small @click="onChange">Save</v-btn>
      </v-time-picker>
    </v-menu>
  </v-row>
</template>
<script>
import AddIcon from "../buttons/AddIcon";

export default {
  components: {
    AddIcon
  },
  data() {
    return {
      menu: false,
      time: ""
    };
  },
  props: {
    value: String,
    format: {
      type: String,
      default: () => "HH:mm"
    }
  },
  methods: {
    onChange() {
      this.$emit("update", this.time);
      this.cancel();
    },
    cancel() {
      this.menu = false;
    }
  },
  watch: {
    menu(val) {
      if(val) {
        this.time = this.value;
      }
    }
  }
};
</script>
