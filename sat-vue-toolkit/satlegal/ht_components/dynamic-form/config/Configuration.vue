<template>
  <v-dialog v-model="showConfig" persistent max-width="500">
    <v-list-item v-slot:activator="{ on }">
      <v-list-item-title v-on="on">
        <v-icon class="mr-1">settings</v-icon>Config
      </v-list-item-title>
    </v-list-item>
    <v-card>
      <v-card-title class="subheading">
        <v-icon class="mr-1">settings</v-icon>Field configuration
      </v-card-title>
      <v-divider />
      <v-form ref="form">
        <v-card-text>
          <v-select
            v-model="configEditting.type"
            :items="types"
            :rules="[v => !!v || 'Type is required']"
            label="Field type"
            required
          ></v-select>
          <v-text-field
            v-if="needLabel"
            v-model="configEditting.label"
            :rules="[v => !!v || 'Field label is required']"
            label="Label"
          />
          <v-text-field
            v-if="needPlaceholder"
            v-model="configEditting.placeholder"
            label="Placeholder"
          />
          <v-combobox
            v-if="needOptions"
            v-model="configEditting.options"
            label="Create options"
            multiple
            small-chips
          >
            <template slot="no-data">
              <v-list-item>
                <strong>Enter</strong>&nbsp;to&nbsp;
                <strong>create</strong>&nbsp;new option
              </v-list-item>
            </template>
          </v-combobox>
          <v-checkbox
            v-if="needOptions"
            v-model="configEditting.multiple"
            label="Multi select?"
          />
        </v-card-text>
      </v-form>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Close</v-btn>
        <v-btn color="primary" @click="saveConfig">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      showConfig: false,
      configEditting: {},
      types: [
        { value: "textfield", text: "Text Field" },
        { value: "select", text: "Select" },
        { value: "textarea", text: "Text Area" }
      ]
    };
  },
  mounted() {
    this.configEditting = _.cloneDeep(this.config);
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        type: "textfield",
        placeholder: "Type value...",
        options: []
      })
    }
  },
  watch: {
    config: {
      deep: true,
      handler(config) {
        this.configEditting = _.cloneDeep(config);
      }
    }
  },
  computed: {
    needPlaceholder() {
      return true;
    },
    needOptions() {
      return ["select"].some(x => x === this.configEditting.type);
    },
    needLabel() {
      return true;
    }
  },
  methods: {
    saveConfig() {
      if (this.$refs.form.validate()) {
        this.$emit("changeConfig", this.configEditting);
        this.showConfig = false;
      }
    },
    close() {
      this.showConfig = false;
      this.$refs.form.resetValidation();
    }
  }
};
</script>
