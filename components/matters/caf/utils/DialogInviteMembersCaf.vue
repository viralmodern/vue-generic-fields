<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <!--      <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>-->
      <v-btn class="text-capitalize ml-4" depressed color="primary" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        Add members
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="title">Invite member</span>
        <v-btn @click="dialog = false" icon absolute right>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>

        <v-row v-for="i in rows" :key="i">
          <v-col cols="12" sm="8">
            <autocomplete-list :items="workspaceMembers"
                               placeholder="@workspace_member"
                               text="name" :multiple="false"
                               @change="change"
                               :value="value"
                               val="userID"/>
            <!--<v-text-field label="Email"
                          solo
                          background-color="#f5f5fa"
                          single-line
                          flat dense
                          hide-details
                          required></v-text-field>-->
          </v-col>

          <v-col cols="12" sm="4">
            <v-select :items="['Owner', 'Admin', 'Staff']" flat
                      solo dense
                      background-color="#f5f5fa"
                      single-line
                      hide-details
                      label="Role"
                      required
            ></v-select>
          </v-col>
          <!--<v-col cols="12" sm="4">
            <v-autocomplete
              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>-->

        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-btn class="text-capitalize" color="#f5f5fa" depressed style="min-width: unset" small @click="addRow">
              <v-icon small>mdi-plus</v-icon>
              Add more
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-5">

        <v-btn color="primary" class="text-capitalize">Invite members</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AutocompleteList from "../../../utils/AutocompleteList";
import {mapGetters} from 'vuex'

export default {
  name: "DialogInviteMembersCaf",
  components: {AutocompleteList},
  data: () => ({
    dialog: false,
    rows: 1
  }),
  computed: {
    ...mapGetters({
      "workspaceMembers": "workspace/workspaceMembers"
    })
  },
  methods: {
    addRow() {
      this.rows = this.rows + 1
    },
    change() {

    }
  },

  watch: {
    dialog(open) {
      if (open) {
        this.rows = 1
      }
    }
  }
}
</script>

<style scoped>

</style>
