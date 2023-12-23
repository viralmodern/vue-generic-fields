<template>
  <v-col>
    <v-expansion-panel :value="isOpen ? 0 : null">
      <v-expansion-panel-content>
        <v-col class="justify-space-between d-flex">
          <v-row no-gutters>
            <v-col cols="6">
              <v-textarea
                rows="3"
                solo
                placeholder="Description"
                hide-details
                v-model="description"
                class="ma-1"
              ></v-textarea>
            </v-col>
            <v-col cols="2">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="date"
                offset-y
                min-width="290px"
                transition="scale-transition"
                v-slot:activator="{ on }"
              >
                <v-btn v-on="on" color="primary" class="text-capitalize" large
                  >Deadline
                  <br />
                  {{ formatDateDeadline }}
                </v-btn>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3" justify-space-around d-flex>
              <v-col sm="4" justify-center align-center>
                <v-icon right size="30" class="mt-2">mdi-monetization_on</v-icon>
              </v-col>
              <v-col sm="8">
                <v-row  no-gutters>
                  <span class="text-h5 font-weight-bold text-xs-left">{{
                    formartNumberHours
                  }}</span>
                  <span class="text-caption text-xs-left"
                    >Estimated Burden Hours</span
                  >
                </v-row>
              </v-col>
            </v-col>
          </v-row>
        </v-col>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-col>
</template>

<script>
import moment from "moment";

export default {
  props: {
    projectDetail: String,
    isOpen: Boolean
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    description: "",
    numberHours: 2830
  }),
  computed: {
    formatDateDeadline() {
      return moment(this.date).format("MM/DD/YYYY");
    },
    formartNumberHours() {
      return this.numberHours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
