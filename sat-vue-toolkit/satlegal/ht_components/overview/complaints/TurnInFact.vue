<template>
  <td>
    <v-row no-gutters class="justify-center align-center">
      <v-col cols="6">
        <v-switch
          class="pt-4"
          v-model="turnIntoFact"
          :value="dataRow.turn"
        ></v-switch>
      </v-col>
      <v-col cols="6" class="pl-2">
        <v-dialog v-if="turnIntoFact" v-model="isModalCreate" max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab>
              <v-icon size="25">mdi-add_circle_outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              1
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="default darken-1" @click="isModalCreate = false"
                >Cancel</v-btn
              >
              <v-btn color="primary darken-1" @click="add">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object
  },
  data() {
    return {
      turnIntoFact: false,
      isModalCreate: false,
      name: ""
    };
  },
  methods: {
    add() {
      this.isModalCreate = false;
    }
  },
  mounted() {
    this.turnIntoFact = this.dataRow.turn;
  }
};
</script>
