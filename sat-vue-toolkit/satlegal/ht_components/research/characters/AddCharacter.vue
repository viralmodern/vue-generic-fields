<template>
  <div>
    <v-dialog :value="isShow" @input="cancel" width="350" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="title font-weight-regular white--text">{{title}}</div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="py-1"
            v-model="first_name"
            :rules="[v => !!v || 'First name is required']"
            label="First name"
            required
            append-icon="account_circle"
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="last_name"
            :rules="[v => !!v || 'Last name is required']"
            label="Last name"
            required
            append-icon="account_circle"
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="email"
            :rules="[ v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid']"
            label="E-mail"
            required
            append-icon="mail_outline"
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="phone"
            mask="+1 (###) ###-####"
            return-masked-value
            :rules="[v => !!v || 'Phone number is required']"
            label="Phone number"
            required
            append-icon="phone"
          ></v-text-field>
          <v-select
            class="py-1"
            v-model="type"
            :items="characterType"
            item-text="name"
            item-value="id"
            :rules="[v => !!v || 'Type is required']"
            chips
            label="Type"
          >
            <template slot="selection" slot-scope="props">
              <v-chip
                class="white--text pa-0 ma-0"
                rounded
                :color="props.item.color"
                small
              >{{props.item.name}}</v-chip>
            </template>
            <template slot="item" slot-scope="props">
              <v-chip
                class="white--text pa-0 ma-0"
                rounded
                :color="props.item.color"
                small
              >{{props.item.name}}</v-chip>
            </template>
          </v-select>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { characterType } from "../../../config.js";

export default {
  props: {
    title: String,
    isShow: Boolean
  },
  data() {
    return {
      valid: true,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      type: "",
      characterType
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          type: this.type
        };
        this.$emit("submit", data);
        this.cancel();
      }
    }
  }
};
</script>
