<template>
  <div class="pa-2">
    <v-dialog persistent v-model="dialog" width="650">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" outlined v-on="on">
          <v-icon class="mr-2">add</v-icon>Add new contact
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters="" class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">New Contact</div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
          <v-col class="text-xs-center pb-3">
            <label class="btn-default">
              <UserAvatar
                class="avatar-custom"
                :imageUrl="this.urlAvatar || null"
                :name="name || ''"
              />
              <input type="file" @change="updateImage" hidden class="hidden" />
            </label>
          </v-col>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            append-icon="person_outline"
            :rules="[v => !!v || 'This field is required']"
            label="Name"
            v-model="name"
          ></v-text-field>

          <v-text-field
            append-icon="person_outline"
            :rules="[v => !!v || 'This field is required']"
            label="Nick name"
            v-model="nickName"
          ></v-text-field>

          <v-text-field
            :rules="[
              v => !!v || 'This field is required',
              v =>
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                  v
                ) || 'Phone number must be valid'
            ]"
            append-icon="phone"
            v-model="phone"
            label="Phone"
            mask="(###) ### - ####"
          ></v-text-field>

          <v-text-field
            append-icon="email"
            :rules="[
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]"
            label="Email"
            v-model="email"
          ></v-text-field>

          <v-text-field
            append-icon="business_center"
            :rules="[v => !!v || 'This field is required']"
            label="Company"
            v-model="company"
          ></v-text-field>

          <v-text-field
            append-icon="place"
            label="Address"
            v-model="address"
          ></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="add">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      dialog: false,
      valid: false,
      name: "",
      nickName: "",
      phone: "",
      email: "",
      company: "",
      address: "",
      urlAvatar: "https://image.ibb.co/jw55Ex/def_face.jpg"
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          user: {
            imageUrl: this.urlAvatar,
            email: this.email,
            first_name: "",
            last_name: "",
            name: this.name,
            nickName: this.nickName,
            company: this.company,
            address: this.address,
            relationShip: 1,
            phone: this.phone
          },
          role: 1,
          uuid: `65a6eb21-67b5-45c3-9af7-${Math.random()}`,
          name: this.name,
          email: this.email,
          username: this.username,
          jobTitle: "",
          phone: this.phone,
          avatar: this.urlAvatar,
          address: null
        };
        this.$emit("add", data);
        this.closeModal();
      }
    },
    closeModal() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    updateImage() {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.urlAvatar = (window.URL || window.webkitURL).createObjectURL(
        input.files[0]
      );
    }
  }
};
</script>
<style scoped>
.btn-default {
  cursor: pointer;
}
.avatar-custom {
  margin: auto;
  width: -webkit-fill-available;
  width: 150px;
  height: 150px;
}
.hidden {
  display: none !important;
}
</style>
