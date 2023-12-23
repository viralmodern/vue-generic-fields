<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500">
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Add new rendered note
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="rendered_note"
              :rules="[v => !!v || 'This field is required']"
              label="Rendered notes"
              required
              append-icon="format_align_left"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
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
                  append-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-textarea
              label="Description"
              v-model="description"
              class="ma-0 custom-text-field fieldDes"
              rows="3"
            ></v-textarea>
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
export default {
  props: {
    isShow: Boolean,
    dataInvoice: Array
  },
  data() {
    return {
      valid: true,
      menuDate: false,
      rendered_note: "",
      date: "",
      description: ""
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
          rendered_note: this.rendered_note,
          date: this.date,
          description: this.description,
          attachment: 0,
          notes: 0
        };
        this.$emit("addRendered", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  }
};
</script>
