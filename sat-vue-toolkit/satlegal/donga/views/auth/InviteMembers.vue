<template>
  <div class="full-screen">
    <div class="all-wrapper solid-bg-all parent__alignflex pt-5 row">
      <div class="col-md-4">
        <div class="middle-block-text">
          <h4 class="auth-header mb-4 text-primary text-h5">Invite members</h4>
          <v-form v-model="valid" lazy-validation @submit.prevent="submit">
            <v-row
              class="align-center"
              v-for="(_, index) in emails"
              :key="index"
            >
              <v-text-field
                v-model="emails[index]"
                label="Email"
                placeholder="name@example.com"
                required
                type="email"
                :rules="emailRules"
              ></v-text-field>
              <v-btn icon color="primary" small @click.stop="remove(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
            <div class="mt-3">
              <div>
                <v-btn
                  :disabled="submitting"
                  @click.stop="add"
                  color="green"
                  class="ma-0 px-0"
                >
                  <v-icon left>mdi-add_circle</v-icon>Add another
                </v-btn>
              </div>
              <div class="mt-3">
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  :loading="submitting"
                  @click.stop="submit"
                  class="ma-0"
                  >Send Invitations</v-btn
                >
              </div>
              <p class="mt-2">
                Or,
                <router-link to="/project">skip for now</router-link>
              </p>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getSubdomain } from "../../../utils";
export default {
  name: "InviteMembers",

  metaInfo: {
    title: "Invite Members"
  },
  data() {
    return {
      emails: ["", "", ""],
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      submitting: false
    };
  },
  created() {},
  mounted() {
    document.querySelector("input[type='email']").focus();
  },
  methods: {
    submit() {
      let workspace = getSubdomain(location.hostname);
      let emails = this.emails.filter(email => email);
      if (!emails) return false;
      this.submitting = true;
      this.$http
        .post("/api/users/auth/invitations/send", { workspace, emails })
        .then(() => this.$router.push({ path: "/project" }))
        .catch(() => {
          this.$eventHub.$emit(
            this.$eventTypes.snackNotify,
            "Email information invalid"
          );
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    add() {
      this.emails.push("");
      this.$nextTick(() => {
        let inputs = document.querySelectorAll("input[type='email']");
        let newAdded = inputs[inputs.length - 1];
        if (newAdded) {
          newAdded.focus();
        }
      });
    },
    remove(index) {
      this.emails.splice(index, 1);
    }
  }
};
</script>
