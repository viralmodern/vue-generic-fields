<template>
  <form @submit.prevent="submit" class="layout column justify-space-between fill-height">
    <div>
      <v-avatar :size="avatarSize"
                color="grey lighten-4" @click="pickFile" class="mb-3 c-p">
        <img v-if="getAvatar" :src="getAvatar"/>
        <v-icon v-else dark>photo_camera</v-icon>
      </v-avatar>
      <p class="title">{{getFirstName + ' ' + getLastName}}</p>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked" required>

      <label class="subheading d-block text-xs-left mb-2">First name: </label>
      <v-text-field
        :value="getFirstName"
        @input="onChangeField($event, 'first_name')"
        v-validate="'required|max:10'"
        :error-messages="errors.collect('first_name')"
        solo
        data-vv-name="first_name"
        light
        required
      ></v-text-field>
      <label class="subheading d-block text-xs-left mb-2">Last name: </label>
      <v-text-field
        :value="getLastName"
        @input="onChangeField($event, 'last_name')"
        v-validate="'required|max:10'"
        :error-messages="errors.collect('last_name')"
        solo
        data-vv-name="last_name"
        required
      ></v-text-field>
      <label class="subheading d-block text-xs-left mb-2">User name: </label>
      <v-text-field
        :value="getUsername"
        @input="onChangeField($event, 'username')"
        v-validate="'required|max:10'"
        :error-messages="errors.collect('username')"
        data-vv-name="last_name"
        solo
        required
      ></v-text-field>

    </div>
    <div>
      <v-card-actions class="px-0 pt-3">
        <v-btn @click="submit" color="primary" :loading="submitting">submit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </div>
  </form>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {getFormData} from '../../../utils'
  import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
  export default {
    name: "FormProfileUser",
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      // avatar
      avatarSize: 100,
      submitting: false,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          first_name: {
            required: () => 'First name can not be empty',
            max: 'The first name field may not be greater than 10 characters'
            // custom messages
          },
          last_name: {
            required: () => 'Last name can not be empty',
            max: 'The last name field may not be greater than 10 characters'
            // custom messages
          },
          username: {
            required: () => 'Last name can not be empty',
            max: 'The last name field may not be greater than 10 characters'
            // custom messages
          },
        }
      }
    }),
    computed: {
      ...mapGetters("ht_store/user", ["currentUser", "getFirstName", "getLastName", "getUsername", "getAvatar", "getAvatarFile"]),


    },
    mounted() {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      ...mapMutations("ht_store/user", ["setCurrentUser"]),
      ...mapActions("ht_store/user", ["updateCurrentUser"]),
      onChangeField(val, _key) {
        this.setCurrentUser({[_key]: val});
      },
      submit() {
        // getFormData
        this.$validator.validateAll().then(() => {
          let _data = {
            first_name: this.currentUser.first_name,
            last_name: this.currentUser.last_name,
            username: this.currentUser.username,
          };
          if(this.getAvatarFile) {
            _data['avatar'] = this.currentUser.avatarFile;
          }
          let formData = getFormData(_data);
          this.submitting = true;
          this.updateCurrentUser(formData).then(() => {

          }).catch(() => {

          }).finally(() => {
            this.submitting = false;
          });
        })
      },
      clear() {
        this.first_name = '';
        this.last_name = '';
        this.$validator.reset();
      },
      pickFile() {
        this.$refs.image.click()
      },

      onFilePicked(e) {
        const files = e.target.files;
        let imageFile, imageUrl, imageName;
        if (files[0] !== undefined) {
          imageName = files[0].name;
          if (imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener('load', () => {
            imageUrl = fr.result;
            imageFile = files[0]; // this is an image file that can be sent to server...
            this.setCurrentUser({avatar: imageUrl, avatarFile: imageFile});
          })
        } else {
          imageName = '';
          imageFile = '';
          imageUrl = '';
        }
      }
    }
  }
</script>

<style>
  .c-p {
    cursor: pointer;
  }
</style>
