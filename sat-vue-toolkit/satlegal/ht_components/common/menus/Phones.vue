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
        <div v-for="(item, index) in phone" :key="index">
          <div class="d-flex align-center">
            <v-text-field
              class="mr-2"
              ref="phoneInput"
              label="Phone"
              v-model="phone[index]"
              :rules="[
                v => !!v || 'Phone is required',
                v => /(0[8,9])+([0-9]{8})\b/g.test(v) || 'Phone must be valid'
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
            >New phone</v-btn
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
    listPhone: [Array, String],
    isLoading: Boolean
  },
  data() {
    return {
      valid: false,
      menu: false,
      phone: []
    };
  },
  computed: {
    showEmailFirst() {
      return this.listPhone[0] ? this.listPhone[0] : "(No phone)";
    }
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          phone: this.phone.map(x => `+84${x.slice(1)}`)
        };
        this.$emit("update", data);
      }
    },
    addRow() {
      this.phone.push("");
      this.$nextTick(() => {
        this.$refs.phoneInput[this.phone.length - 1].focus();
      });
    },
    removeRow(index) {
      this.phone = this.phone.filter((x, i) => i !== index);
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        this.phone = this.listPhone.map(phone => {
          const phoneReplace1 = phone.replace("+", "");
          return phoneReplace1.replace(/84|81/, "0");
        });
      }
    }
  }
};
</script>
