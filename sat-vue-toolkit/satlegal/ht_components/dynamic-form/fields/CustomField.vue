<template>
  <v-row no-gutters>
    <div class="dnd-handle pr-2 d-flex" style="cursor: move">
      <v-icon>mdi-drag_indicator</v-icon>
    </div>
    <v-col>
      <div>
        <strong>{{ currentField.config.label }}</strong>
      </div>
      <div>
        <component
          :is="theComponent"
          v-if="!!currentField.config"
          :config="currentField.config"
          :value="currentField.value"
          @change="change"
        />
      </div>
    </v-col>
    <div>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <Configuration
            :config="currentField.config"
            @changeConfig="changeConfig"
          />
          <v-list-item @click="deleteField">
            <v-list-item-title>
              <v-icon class="mr-1">delete</v-icon>Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-row>
</template>

<script>
import _ from "lodash";
import Configuration from "../config/Configuration";
import TextField from "./TextField";
import TextArea from "./TextArea";
import SelectField from "./SelectField";
const defaultField = () => ({
  config: {
    type: "textfield",
    placeholder: "Type value...",
    label: "Untitled field",
    multiple: false,
    options: []
  },
  value: ""
});
export default {
  components: {
    TextField,
    SelectField,
    Configuration,
    TextArea
  },
  data() {
    return { showConfig: false, currentField: defaultField() };
  },
  props: {
    field: {
      type: Object,
      default: defaultField
    }
  },
  watch: {
    field: {
      deep: true,
      handler(value) {
        this.currentField = _.cloneDeep(value);
      }
    }
  },
  mounted() {
    this.currentField = _.cloneDeep(this.field);
  },
  methods: {
    changeConfig(config) {
      this.currentField.config = config;
      if (["select"].some(r => r === config.type) && config.multiple) {
        if (!Array.isArray(this.currentField.value)) {
          this.currentField.value = null;
        }
      }
      this.$emit("update:field", this.currentField);
    },
    change(value) {
      this.currentField.value = value;
      this.$emit("update:field", this.currentField);
    },
    deleteField() {
      this.$emit("delete");
    }
  },
  computed: {
    isTextField() {
      return (
        this.currentField.config &&
        this.currentField.config.type === "textfield"
      );
    },
    theComponent() {
      switch (this.currentField.config.type) {
        case "textfield":
          return TextField;
        case "textarea":
          return TextArea;
        case "select":
          return SelectField;
        default:
          return TextField;
      }
    }
  }
};
</script>
