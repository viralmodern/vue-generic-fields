<template>
  <SignIn v-if="!$store.getters['auth/isLoggedIn']"/>
</template>

<script>
  import SignIn from "./auth/SignIn";
  import {$$STORE_PREFIX, getSubdomain, isValidSubdomain} from "../../utils";

  export default {
    name: "Index",
    components: {SignIn},
    created() {
      let subdomain = getSubdomain(location.hostname);
      if(isValidSubdomain(subdomain) && this.$store.getters["ht_store/auth/isLoggedIn"]){
        this.$router.replace({name: "HomeProject"});
      }else {
        this.$router.replace({name: "signin"});
      }
    }
  };
</script>
