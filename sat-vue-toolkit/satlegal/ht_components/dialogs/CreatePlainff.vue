<template>
  <v-dialog persistent v-model="dialogs" width="500">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on">
        Add new
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">
            Create new plaintiff
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="dialogs = false">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row class="px-3 py-2" no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="firstName"
              label="First name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="lastName"
              label="Last name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch v-model="kycStatus"></v-switch>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="acquireSource"
              :items="statusDigital"
              label="Caused by"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ acquireSource.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="plaintiffGroup"
              :items="statusDigital"
              label="Caused by"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ plaintiffGroup.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              type="number"
              label="Bought at"
              name="input-7-1"
              v-model="boughtAt"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              type="number"
              label="Quantity"
              name="input-7-1"
              v-model="quantity"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
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
import { mapActions } from "vuex";
import { statusDigital } from "../../config";

export default {
  data() {
    return {
      valid: false,
      dialogs: false,
      plaintiffGroup: "",
      acquireSource: "",
      firstName: "",
      lastName: "",
      boughtAt: "",
      quantity: "",
      kycStatus: "",
      statusDigital
    };
  },
  methods: {
    ...mapActions("ht_store/matter/plaintiff", ["createPlaintiffRequest"]),
    closeDialog() {
      this.dialogs = false;
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          plaintiffGroup: [2, 1],
          acquireSource: [1, 2],
          firstName: this.firstName,
          lastName: this.lastName,
          boughtAt: this.boughtAt,
          quantity: this.quantity,
          kycStatus: this.kycStatus
        };
        this.createPlaintiffRequest(data);
        this.dialogs = false;
        this.clear();
      }
    },
    clear() {
      this.plaintiffGroup = "";
      this.acquireSource = "";
      this.firstName = "";
      this.lastName = "";
      this.boughtAt = "";
      this.quantity = "";
      this.kycStatus = "";
    }
  }
};
</script>
