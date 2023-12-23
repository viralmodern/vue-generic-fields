<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" class="pr-2">
        <v-text-field
          :value="caseName"
          @input="onChange('caseName', $event)"
          :rules="[v => !!v || 'This is required']"
          label="Case name"
          required
          append-icon="person_outline"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              :value="datePublished"
              label="Date published"
              append-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            :value="datePublished"
            @input="
              menu = false;
              onChange('datePublished', $event);
            "
            no-title
            scrollable
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="4" class="pl-2">
        <v-text-field
          :value="court"
          @input="onChange('court', $event)"
          label="Court"
          required
          append-icon="gavel"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-radio-group
      :value="slipOpinion"
      @change="onChange('slipOpinion', $event)"
      row
      label="Slip onpinion :"
    >
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>
    <v-radio-group
      :value="electronicDatabase"
      @change="onChange('electronicDatabase', $event)"
      row
      class="ma-0"
      label="Electronic Database :"
    >
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    caseName: String,
    court: String,
    datePublished: String,
    slipOpinion: {
      type: Boolean,
      default: false
    },
    electronicDatabase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    onChange(name, value) {
      const data = {
        name,
        value
      };
      if (name === "pages") data.value = parseInt(data.value);
      this.$emit("onChange", data);
    }
  }
};
</script>
