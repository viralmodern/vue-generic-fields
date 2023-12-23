<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                :rules="[(v) => !!v || 'This field is required']"
                v-model="password"
                type="password"
                label="Password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :rules="[(v) => !!v || 'This field is required']"
                v-model="passwordNew"
                type="password"
                label="New password "
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :rules="[
                  (v) => !!v || 'Password confirm is required',
                  (v) => passwordNew === v || 'Password must match',
                ]"
                v-model="passwordConfirm"
                type="password"
                label="Confirm new password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify-end>
            <v-btn color="primary" @click="update">Update</v-btn>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-row no-gutters class="ml-5 mt-4 justify-center">
          <v-container>
            <v-card width="400" color="default">
              <v-row no-gutters class="pa-4 text-caption justify-center">
                <v-col cols="12">
                  <h4>Password requirements</h4>
                </v-col>
                <v-col cols="12" class="py-1"
                  >To create a new password, you have to meet all of the
                  following requirements:</v-col
                >
                <v-col cols="12" class="py-1">
                  <v-icon
                    size="14"
                    color="success"
                    class="mr-1"
                    v-if="checkLengthPassword"
                    >check</v-icon
                  >
                  <v-icon size="14" class="mr-1" v-else>lens</v-icon>Minimum 8
                  charater
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-icon
                    size="14"
                    color="success"
                    class="mr-1"
                    v-if="checkCharacters"
                    >check</v-icon
                  >
                  <v-icon size="14" class="mr-1" v-else>lens</v-icon>At least
                  one special charater
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-icon
                    size="14"
                    color="success"
                    class="mr-1"
                    v-if="checkNumberPassword"
                    >check</v-icon
                  >
                  <v-icon size="14" class="mr-1" v-else>lens</v-icon>At least
                  one number
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-row>
      </v-col>
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :right="true"
        :bottom="true"
        >Update password success</v-snackbar
      >
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      password: '',
      passwordNew: '',
      passwordConfirm: '',
      snackbar: false,
      checkLengthPassword: false,
      checkNumberPassword: false,
      checkCharacters: false,
      checkValidateFormNewPassworld: false,
    }
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        if (this.checkValidateFormNewPassworld) {
          this.snackbar = true
        }
      }
    },
  },
  watch: {
    passwordNew(val) {
      this.checkLengthPassword = val.length >= 8
      this.checkNumberPassword = /\d/.test(val)
      this.checkCharacters = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(val)
      this.checkValidateFormNewPassworld =
        this.checkCharacters &&
        this.checkNumberPassword &&
        this.checkLengthPassword
    },
  },
}
</script>
