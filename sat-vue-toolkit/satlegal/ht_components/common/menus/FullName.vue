<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center text-no-wrap" v-on="on">
        <UserAvatar
          :imageUrl="avatar"
          :name="fullName"
          :avatarSize="25"
          class="mr-1"
        />
        <span>{{ fullName }}</span>
      </div>
    </template>
    <v-list class="px-4">
      <v-form ref="form" v-model="valid">
        <div>
          <UploadFileSingle
            type="round"
            accept="image/*"
            :isAvatarCenter="true"
            :imageUrl="avatar_field.dataImg"
            :name="avatar_field.name"
            textButtonRemove="remove"
            textButtonAdd="Update Avatar"
            @remove="avatar_field = {}"
            @change="addAttachment"
          />
        </div>
        <div>
          <v-text-field
            label="First name"
            :value="first_name"
            @change="first_name = $event"
            :rules="[v => !!v || 'This field is required']"
          />
        </div>
        <div class="mb-1">
          <v-text-field
            label="Last name"
            :value="last_name"
            @change="last_name = $event"
            :rules="[v => !!v || 'This field is required']"
          />
        </div>
        <div class="text-right">
          <v-btn color="primary" small @click="add" :loading="isLoading">Save</v-btn>
        </div>
      </v-form>
    </v-list>
  </v-menu>
</template>

<script>
import UserAvatar from "../../avatars/UserAvatar";
import UploadFileSingle from "../../inputs/UploadFileSingle";

export default {
  components: {
    UserAvatar,
    UploadFileSingle
  },
  props: {
    avatar: String,
    firstName: String,
    lastName: String,
    isLoading: Boolean,
  },
  data() {
    return {
      valid: false,
      menu: false,
      avatar_field: {},
      first_name: "",
      last_name: ""
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  methods: {
    addAttachment(file) {
      this.avatar_field = {
        dataImg: file.fileReader.result,
        name: file.file.name,
        file: file.file
      };
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          first_name: this.first_name,
          last_name: this.last_name
        };
        if (this.avatar_field.name !== this.avatar) {
          data.avatar = this.avatar_field.file || null;
        }
        this.$emit("update", data);
      }
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        this.avatar_field = {
          dataImg: this.avatar,
          name: this.avatar
        };
        this.first_name = this.firstName;
        this.last_name = this.lastName;
      }
    }
  }
};
</script>
