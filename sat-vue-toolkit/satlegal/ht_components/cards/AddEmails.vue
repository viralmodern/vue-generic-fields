<template>
  <v-card class="my-2 pa-2">
    <v-row no-gutters class="align-center">
      <span class="title">Emails</span>
      <v-btn small fab @click="addRow('emails')">
        <v-icon size="25">mdi-add_circle_outline</v-icon>
      </v-btn>
    </v-row>
    <div v-if="!emails.length" class="pa-1">
      Click Add Rows button to start adding email
    </div>
    <div v-for="(item, index) in emails" :key="index" class="pa-1">
      <v-row class="align-center">
        <v-text-field
          v-model="emails[index]"
          :rules="[
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ]"
          label="E-mail"
          required
        ></v-text-field>
        <v-btn class="ma-0" icon @click="deleteRow('emails', item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    emailList: Array
  },
  data() {
    return {
      emails: []
    };
  },
  methods: {
    addRow() {
      this.emails = [...this.emails, ""];
    },
    deleteRow(item) {
      const index = this.emails.indexOf(item);
      this.emails.splice(index, 1);
    }
  },
  watch: {
    emailList(val) {
      if (val) {
        this.emails = JSON.parse(JSON.stringify(val));
      }
    },
    emails(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>
