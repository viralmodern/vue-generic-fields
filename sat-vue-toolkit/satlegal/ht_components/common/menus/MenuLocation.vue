<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <div class="text-caption" :style="`width: ${widthSection}; cursor: pointer;`" v-on="on">{{
        value.extra ? value.extra : "(No location)"
      }}</div>
    </template>
    <v-card class="mx-auto">
      <v-card-title>Update location</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="save">
          <Location
            style="font-size:13px"
            :value="location.extra"
            placeholder="Location"
            @input="onInputLocation"
            :rules="[v => !!v || 'This field is required']"
          />
          <div class="text-right">
            <v-btn small class="primary" @click="save" :loading="isLoadingSave"
              >Save</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import Location from "../inputs/Location";

export default {
  components: {
    Location
  },
  props: {
    value: {
      extra: String
    },
    widthSection: String,
    isLoadingSave: Boolean
  },
  data() {
    return {
      location: {},
      menu: false,
      valid: false
    };
  },
  methods: {
    onInputLocation(value) {
      value.extra
        ? (this.location = value)
        : (this.location = { extra: value });
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("update", {
          extra: this.location.extra,
          locality: this.location.locality,
          state: this.location.state,
          country: this.location.country
        });
        this.menu = false;
      }
    },
    open() {
      this.location = { ...this.value };
    }
  },
  watch: {
    menu(val) {
      if(val) {
        this.open();
      }
    }
  },
};
</script>
