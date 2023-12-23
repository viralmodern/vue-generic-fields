<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="130"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined color="primary">
        <v-icon>mdi-add_circle</v-icon>
        <span class="ml-1">Highlight</span>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row  no-gutters>
              <v-col>
                <v-text-field
                  mask="##:##"
                  :rules="[v => !!v || 'This field is required']"
                  v-model="timeNow"
                  label="Time"
                  placeholder="00:00"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="transcript"
                  label="Transcript"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :rules="[v => !!v || 'This field is required']"
                  label="Favorable"
                  :items="favorables"
                  item-text="name"
                  v-model="favorable"
                  return-object
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="objection"
                  :rules="[v => !!v || 'This field is required']"
                  label="Objection"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { favorables } from "../../config.js";
export default {
  props: {
    members: Array
  },
  data() {
    return {
      favorables,
      isShow: false,
      timeNow: "",
      objection: "",
      transcript: "",
      favorable: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          timeNow: this.timeNow,
          objection: this.objection,
          transcript: this.transcript,
          favorable: this.favorable
        };
        this.$emit("addTaskHightLight", data);
        this.$refs.form.reset();
        this.isShow = false;
      }
    }
  }
};
</script>
