<template>
  <div class="all-wrapper menu-side with-pattern">
    <SetSubdomainToken :token="token" :subdomain="subdomain" :load="iframeLoaded" />
  </div>
</template>

<script>
import SetSubdomainToken from "../../components/auth/SetSubdomainToken";
import { getSubdomainURL } from "../../../utils";

export default {
  name: "JoinInvite",
  components: { SetSubdomainToken },
  metaInfo: {
    title: "Create account"
  },
  created() {
    this.$http
      .post(`/api/users/auth/invitations/join/${this.$route.params.key}/`)
      .then(response => {
        this.token = response.data.token;
        this.subdomain = response.data.workspace;
      })
      .catch(error => {
        this.error = true;

        if (error.response.status === 400) {
          this.error = "This invitation was already accepted.";
          this.$eventHub.$emit(this.$eventTypes.snackNotify, this.error);
        } else if (error.response.status === 404) {
          this.error =
            "It looks like you’re trying to accept an invitation, but the URL you followed was invalid. Try copying and pasting the entire URL from your email.";
          this.$eventHub.$emit(this.$eventTypes.snackNotify, this.error);
        } else {
          this.error = "Something went wrong. Please try again";
          this.$eventHub.$emit(this.$eventTypes.snackNotify, this.error);
        }
      });
  },
  data() {
    return {
      error: "",
      token: "",
      subdomain: ""
    };
  },
  methods: {
    iframeLoaded() {
      let subdomainURL = getSubdomainURL(this.subdomain);
      location.href = `${subdomainURL}/project`;
    }
  }
};
</script>

<style scoped></style>
