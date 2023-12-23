<template>
  <v-form ref="form">
    <v-divider></v-divider>
    <strong class="py-3">Online publication info</strong>
    <v-text-field
      :value="websiteTitle"
      @input="onChange('websiteTitle', $event)"
      label="Website title"
      required
    ></v-text-field>
    <v-text-field
      :value="publisher"
      @input="onChange('publisher', $event)"
      label="Publisher / sponsor"
      required
    ></v-text-field>
    <v-text-field
      :value="url"
      @input="onChange('url', $event)"
      label="Url"
      required
    ></v-text-field>
    <v-row no-gutters>
      <v-col cols="6" class="pr-2">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              :value="electronicallyPublished"
              label="Electronically published"
              append-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            :value="electronicallyPublished"
            @input="
              menu1 = false;
              onChange('electronicallyPublished', $event);
            "
            no-title
            scrollable
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" class="pl-2">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }"
            ><v-text-field
              v-on="on"
              :value="dateAccessedOnline"
              label="Date accessed"
              append-icon="mdi-calendar"
              readonly
            ></v-text-field
          ></template>
          <v-date-picker
            :value="dateAccessedOnline"
            @input="
              menu2 = false;
              onChange('dateAccessedOnline', $event);
            "
            no-title
            scrollable
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    websiteTitle: String,
    publisher: String,
    url: String,
    electronicallyPublished: String,
    dateAccessedOnline: String
  },
  data() {
    return {
      menu1: false,
      menu2: false
    };
  },
  methods: {
    onChange(name, value) {
      const data = {
        name,
        value
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
