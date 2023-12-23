<template>
  <vue-google-autocomplete
    v-if="ready"
    :placeholder="placeholder"
    v-bind="$props"
    :id="id"
    @placechanged="placechanged"
    @input="inputChange"
    @change="inputChange"
    :rules="rules"
  />
</template>

<script>
import VueGoogleAutocomplete from "./VueGoogleAutocomplete";

let props = Object.assign({
  placeholder: String,
  rules: Array,
}, VueGoogleAutocomplete.props);
delete props["id"];

export default {
  name: "Location",
  components: { VueGoogleAutocomplete },
  props,
  created() {
    let scriptID = "map-script";
    if (!document.querySelector(`#${scriptID}`)) {
      let googleAddressScript = document.createElement("script");
      googleAddressScript.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=${
          process.env.VUE_APP_GOOGLE_API_KEY
        }&libraries=places`
      );
      googleAddressScript.setAttribute("id", scriptID);
      googleAddressScript.onload = () => {
        this.ready = true;
      };
      document.head.appendChild(googleAddressScript);
    } else {
      this.ready = true;
    }
  },
  data() {
    return {
      id: Math.random()
        .toString(36)
        .substring(7),
      ready: false
    };
  },
  methods: {
    placechanged(addressData, placeResultData, id) {
      this.$emit("placechanged", addressData, placeResultData, id);
    },
    inputChange(event) {
      this.$emit("input", event);
    }
  }
};
</script>

<style>
.pac-container {
  z-index: 5555;
}
</style>
