<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="350">
      <v-card class="px-2">
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="py-1"
            v-model="firstName"
            :rules="[v => !!v || 'First name is required']"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="lastName"
            :rules="[v => !!v || 'Last name is required']"
            label="Last name"
            required
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="email"
            :rules="[
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            class="py-1"
            v-model="phone"
            mask="phone"
            return-masked-value
            :rules="[v => !!v || 'Phone number is required']"
            label="Phone number"
            required
          ></v-text-field>
          <v-select
            v-if="projectDetailType === 'byzantine'"
            :items="roleContacts"
            v-model="role"
            item-text="name"
            return-object
            label="Role"
          >
            <template slot="selection" slot-scope="data">
              <Roles :role="data.item.name" />
            </template>
          </v-select>
          <v-select
            v-if="projectDetailType === 'byzantine'"
            :items="types"
            v-model="type"
            :rules="[v => !!v || 'Types is required']"
            item-text="type"
            label="Types"
          >
            <template slot="selection" slot-scope="data">
              <Types :type="data.item.type" />
            </template>
          </v-select>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn v-if="dataContact" color="primary" @click="edit">Edit</v-btn>
          <v-btn v-else color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Types from "../chips/ContactsType";
import Roles from "../chips/ContactsRole";
import { roleContacts } from "../../config.js";

export default {
  components: {
    Types,
    Roles
  },
  props: {
    isShow: Boolean,
    title: String,
    types: Array,
    projectDetailType: String,
    dataContact: Object
  },
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      type: "",
      roleContacts
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          type: this.type,
          role: this.role,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR6EX4EVbmOM4D5aQsZQ0eUhnoZXKWNSwPAOTGqi_d1viIgVwUg",
          rate: true
        };
        this.$emit("addContact", data);
        this.cancel();
      }
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          id: this.dataContact.id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          type: this.type,
          role: this.role,
          avatar: "https://randomuser.me/api/portraits/men/35.jpg",
          rate: true
        };
        this.$emit("updateContact", data);
        this.cancel();
      }
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        if (this.dataContact) {
          this.firstName = this.dataContact.firstName;
          this.lastName = this.dataContact.lastName;
          this.email = this.dataContact.email;
          this.phone = this.dataContact.phone;
          this.role = this.dataContact.role;
          this.type = this.dataContact.type;
        }
      }
    }
  }
};
</script>
