<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="400"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters="" class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row class="px-3 py-2" no-gutters="">
            <v-col cols="12">
              <v-text-field
                label="Side Effect"
                :rules="[v => !!v || 'This field is required']"
                v-model="sideEffect"
                append-icon="sms_failed"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-textarea
                :rules="[v => !!v || 'This field is required']"
                v-model="description"
                label="Description"
                auto-grow
                rows="1"
                append-icon="subtitles"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row class="align-center" no-gutters="">
                <span class="text--secondary subheading"
                  >Does patient have this side effect</span
                >
                &nbsp;&nbsp;
                <v-switch hide-details class="ma-0" v-model="status"></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
              <DateMonthPicker
                :rules="[v => !!v || 'This field is required']"
                label="Date discovered"
                :value="dateDiscovered"
                @change="dateDiscovered = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <span class="text--secondary subheading">Proximate cause</span>
              <SelectMultiple
                :value="proximateCause"
                :list="proximate"
                title="List Proximate Cause"
                labelSearch="Search"
                name="proximate"
                keySearch="name"
                @select="select"
              >
                <template slot-scope="{ items }" slot="section">
                  <v-chip
                    class="pa-0 ml-0"
                    v-for="item in items"
                    :key="item.id"
                    label
                    >{{ item.name }}</v-chip
                  >
                </template>
                <template slot-scope="{ item }" slot="item">
                  <v-list-item-avatar class="border">
                    <v-icon v-if="item.check">done</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content class="ml-2">
                    <v-row
                      no-gutters=""
                      class="align-center"
                      style="width:100%"
                    >
                      <v-col cols="10">{{ item.name }}</v-col>
                    </v-row>
                  </v-list-item-content>
                </template>
              </SelectMultiple>
            </v-col>
            <v-col cols="12">
              <span class="text--secondary subheading">Severity</span>
              <v-slider
                class="mt-4"
                v-model="severity"
                :thumb-size="24"
                thumb-label="always"
              ></v-slider>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import DateMonthPicker from "../menus/DateMonthPicker";
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    DateMonthPicker,
    SelectMultiple
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      sideEffect: "",
      description: "",
      dateDiscovered: "",
      status: false,
      severity: 0,
      proximateCause: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury/detail/proximate", ["proximate"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          sideEffect: this.sideEffect,
          description: this.description,
          dateDiscovered: this.dateDiscovered,
          status: this.status,
          severity: this.severity,
          proximateCause: this.proximateCause
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.sideEffect = "";
      this.description = "";
      this.dateDiscovered = "";
      this.status = false;
      this.severity = 0;
      this.proximateCause = [];
    },
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = this.proximateCause.filter(id => id !== idSelect);
      } else {
        data = [...this.proximateCause, idSelect];
      }
      this.proximateCause = data;
    }
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
