<template>
  <v-card class="my-2 pa-2">
    <v-row no-gutters class="align-center">
      <span class="title">Phones</span>
      <v-btn small fab @click="addRow">
        <v-icon size="25">mdi-add_circle_outline</v-icon>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <div v-if="!phones.length" class="pa-1">
      Click Add Rows button to start adding email
    </div>
    <div v-for="(item, index) in phones" :key="index" class="pa-1">
      <v-row no-gutters class="align-center">
        <v-text-field
          mask="phone"
          return-masked-value
          v-model="phones[index]"
          label="Tel"
          :rules="[v => !!v || 'Phone is required']"
        ></v-text-field>
        <v-btn class="ma-0" icon @click="deleteRow(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    phoneList: Array
  },
  data() {
    return {
      phones: []
    };
  },
  methods: {
    addRow() {
      this.phones = [...this.phones, ""];
    },
    deleteRow(item) {
      const index = this.phones.indexOf(item);
      this.phones.splice(index, 1);
    }
  },
  watch: {
    phoneList(val) {
      if (val) {
        this.phones = JSON.parse(JSON.stringify(val));
      }
    },
    phones(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>
