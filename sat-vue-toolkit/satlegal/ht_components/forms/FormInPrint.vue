<template>
  <v-form ref="form">
    <v-divider></v-divider>
    <strong class="py-3">In print publication info</strong>
    <v-text-field
      :value="advancedInfo"
      @input="onChange('advancedInfo', $event)"
      label="Advanced info"
      required
      append-icon="settings"
    ></v-text-field>
    <v-text-field
      :value="publicationInfo"
      @input="onChange('publicationInfo', $event)"
      label="Publication Info"
      required
      append-icon="group"
    ></v-text-field>
    <v-text-field
      :value="pages"
      @input="onChange('pages', $event)"
      mask="############"
      label="Pages"
      required
      append-icon="filter_none"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    advancedInfo: String,
    publicationInfo: String,
    pages: Number
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