<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on: onMenu }">
      <div class="d-flex align-center text-no-wrap">
        <span class="mr-2">{{ showEmailFirst }}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon :on="{ ...onMenu, ...onTooltip }" icon="mdi-more" />
          </template>
          <span>View more</span>
        </v-tooltip>
      </div>
    </template>
    <v-list class="px-4">
      <v-form ref="form" v-model="valid">
        <div v-for="(item, index) in emails" :key="index">
          <div class="d-flex align-center">
            <v-text-field
              class="mr-2"
              ref="emailInput"
              label="Email"
              v-model="emails[index]"
              :rules="[
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
              ]"
            />
            <AddIcon
              v-if="index"
              @onClickIcon="removeRow(index)"
              icon="remove"
              colorButton="error"
            />
          </div>
        </div>
        <div>
          <v-btn
            class="pa-0 primary--text text-caption"
            style="text-transform: unset;"
            text
            @click="addRow"
            >New email</v-btn
          >
        </div>
        <div class="text-right">
          <v-btn color="primary" small @click="add" :loading="isLoading"
            >Save</v-btn
          >
        </div>
      </v-form>
    </v-list>
  </v-menu>
</template>

<script>
import AddIcon from "../buttons/AddIcon";

export default {
  components: {
    AddIcon
  },
  props: {
    listEmail: Array,
    isLoading: Boolean
  },
  data() {
    return {
      valid: false,
      menu: false,
      emails: []
    };
  },
  computed: {
    showEmailFirst() {
      return this.listEmail[0] ? this.listEmail[0] : "(No email)";
    }
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          emails: this.emails
        };
        this.$emit("update", data);
      }
    },
    addRow() {
      this.emails.push("");
      this.$nextTick(() => {
        this.$refs.emailInput[this.emails.length - 1].focus();
      });
    },
    removeRow(index) {
      this.emails = this.emails.filter((x, i) => i !== index);
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        this.emails = [...this.listEmail];
      }
    }
  }
};
</script>
