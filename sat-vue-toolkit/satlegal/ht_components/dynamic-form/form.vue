<template>
  <v-card>
    <v-card-text>
      <draggable
        handle=".dnd-handle"
        class="list-group"
        v-model="listFieldIds"
        v-bind="dragOptions"
      >
        <transition-group type="transition" name="flip-list">
          <CustomField
            v-for="(field, index) in fieldList"
            :field.sync="fieldList[index]"
            :key="field.id"
            label="my field"
            class="py-2"
            @delete="deleteField(field.id)"
          />
        </transition-group>
      </draggable>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addNewField" outlined color="primary">
        <v-icon>mdi-add</v-icon>Add new field
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import draggable from "vuedraggable";
import CustomField from "./fields/CustomField";
export default {
  components: {
    CustomField,
    draggable
  },
  props: {
    fieldList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    fieldList: {
      deep: true,
      handler(value) {
        this.$emit("update:fieldList", value);
      }
    }
  },
  methods: {
    addNewField() {
      const lastField = this.fieldList.slice().sort((a, b) => b.id - a.id)[0];
      let lastId = 0;
      if (lastField) lastId = lastField.id;
      this.$emit(
        "update:fieldList",
        this.fieldList.concat([
          {
            id: lastId + 1,
            config: {
              type: "textfield",
              placeholder: "Type value...",
              label: "Untitled field",
              multiple: false,
              options: []
            },
            value: ""
          }
        ])
      );
    },
    deleteField(id) {
      this.$emit("update:fieldList", this.fieldList.filter(x => x.id !== id));
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "agenda",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    listFieldIds: {
      get() {
        return this.fieldList.map(x => x.id);
      },
      set(value) {
        this.$emit(
          "update:fieldList",
          this.fieldList
            .slice()
            .sort((a, b) => value.indexOf(a.id) - value.indexOf(b.id))
        );
      }
    }
  }
};
</script>
