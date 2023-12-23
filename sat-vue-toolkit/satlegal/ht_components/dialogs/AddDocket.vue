<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new docket</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-textarea
              name="input-7-1"
              label="Description..."
              v-model="description"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="tag"
              :items="tags"
              label="Select Item"
              multiple
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color">
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ tag.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="date"
                  readonly
                  label="Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      valid: true,
      description: "",
      menuDate: false,
      date: "",
      tag: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          description: this.description,
          date: this.date,
          tags: this.tag,
          attachment: [1, 2]
        };
        this.$emit("addDocket", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/briefcase/docket/tag", ["tags"])
  }
};
</script>
