<template>
  <v-edit-dialog ref="editDialog" @open="number = value">
    {{ value }}
    <template v-slot:input>
      <v-form ref="form" v-model="valid" @submit.prevent="save">
        <v-row no-gutters class="pa-3">
          <InputNumber
            :value="number"
            @onChange="number = +$event"
            :min="min"
            :max="max"
            class="mr-2"
          />
          <v-btn small color="primary" @click="save">Save</v-btn>
        </v-row>
      </v-form>
    </template>
  </v-edit-dialog>
</template>

<script>
import InputNumber from "../inputs/InputNumber";
export default {
  components: {
    InputNumber
  },
  props: {
    value: Number,
    min: Number,
    max: Number
  },
  data() {
    return {
      valid: false,
      number: 0
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("update", this.number);
        this.$refs["editDialog"].isActive = false;
      }
    }
  },
  mounted() {
    this.number = this.value;
  }
};
</script>
