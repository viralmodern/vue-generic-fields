<template>
  <v-menu v-model="menu" transition="scale-transition" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on: onMenu }">
      <div class="d-flex align-center text-no-wrap">
        <span class="mr-2">{{ showEmailFirst }}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon :on="{ ...onMenu, ...onTooltip }" icon="mdi-pencil-box-outline" />
          </template>
          <span>Edit {{name}}</span>
        </v-tooltip>
      </div>
    </template>
    <v-list class="px-4">
      <v-form ref="form" v-model="valid">
        <div class="d-flex align-center">
          <v-text-field
            v-if="name === 'email'"
            class="mr-2"
            ref="emailInput"
            label="Email"
            v-model="dataMap"
            :rules="[
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail mut be valid'
              ]"
          />
          <v-text-field
            v-if="name==='phone_number'"
            class="mr-2"
            ref="phoneInput"
            label="Phone"
            v-model="dataMap"
            :rules="[
                v => !!v || 'Phone is required',
                v => /(0[8,9])+([0-9]{8})\b/g.test(v) || 'Phone must be valid'
              ]"
          />
        </div>
        <div class="text-right">
          <v-btn color="primary" small @click="add" :loading="isLoading">Save</v-btn>
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
    value: String,
    isLoading: Boolean,
    name: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      valid: false,
      menu: false,
      dataMap: ""
    };
  },
  computed: {
    showEmailFirst() {
      return this.value || "(No data)";
    }
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          [this.name]:
            this.name === "phone_number"
              ? `+84${this.dataMap.slice(1)}`
              : this.dataMap
        };
        this.$emit("update", data);
        this.menu = false
      }
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        if (this.name === "phone_number") {
          const phoneReplace = this.value.replace("+", "");
          this.dataMap = phoneReplace.replace(/84|81/, "0");
        } else {
          this.dataMap = this.value;
        }
      }
    }
  }
};
</script>
