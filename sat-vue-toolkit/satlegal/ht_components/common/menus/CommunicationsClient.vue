<template>
  <v-menu v-model="menu" transition="scale-transition" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on: onMenu }">
      <div class="d-flex align-center text-no-wrap">
        <span class="mr-2">{{ primaryValue || showEmailPrimary }}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon :on="{ ...onMenu, ...onTooltip }" icon="more" />
          </template>
          <span>View more</span>
        </v-tooltip>
      </div>
    </template>
    <v-list class="px-4">
      <v-form ref="form" v-model="valid">
        <div class="d-flex align-center">
          <v-text-field
            v-if="name==='emails'"
            class="mr-2"
            label="Default email"
            @change="defaultValue= $event"
            :value="primaryValue"
            :rules="[
               v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
              ]"
            :readonly="!isDefaultValue"
          />
          <v-icon color="primary">{{name ==="emails" && 'mdi-email-outline'}}</v-icon>
        </div>
        <div v-for="(item, index) in listValue" :key="index">
          <div class="d-flex align-center">
            <v-text-field
              v-if="name==='emails'"
              class="mr-2"
              ref="valueInput"
              label="Email"
              :value="item[keyValue]"
              @change="item[keyValue] = $event"
              :rules="[
                v => !!v || `${keyValue} is required`,
                v => /.+@.+\..+/.test(v) || `${keyValue} must be valid`
              ]"
            />
            <v-text-field
              v-if="name==='phones'"
              class="mr-2"
              label="Phone number"
              ref="valueInput"
              @change="item[keyValue]= $event"
              :value="item[keyValue]"
              :rules="[
                  v => !!v || 'Phone is required',
                v => /(0[8,9])+([0-9]{8})\b/g.test(v) || 'Phone must be valid'
              ]"
            />
            <v-card-actions v-if="!item.primary">
              <v-radio-group
                :value="item.type"
                row
                :label="`Type ${keyValue}`"
                class="mr-2"
                :rules="[v => !!v || `type ${name} is required`]"
                required
              >
                <v-radio
                  class="custom-radio mr-2"
                  v-for="type in listType"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                  @change="item.type = type.value"
                ></v-radio>
              </v-radio-group>
            </v-card-actions>
            <v-icon
              color="primary"
            >{{name ==="emails" ? 'mdi-email-outline': 'mdi-cellphone-iphone'}}</v-icon>
            <div class="text-right ml-3">
              <AddIcon @onClickIcon="removeRow(index)" icon="remove" colorButton="error" />
            </div>
          </div>
        </div>
        <div>
          <v-btn
            class="pa-0 primary--text text-caption"
            style="text-transform: unset;"
            text
            @click="addRow"
            v-if="!isDefaultValue"
          >New {{ keyValue }}</v-btn>
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
    listData: Array,
    isLoading: Boolean,
    listType: Array,
    keyValue: String,
    name: String,
    primaryValue: String
  },
  data() {
    return {
      valid: false,
      menu: false,
      listValue: [],
      isDefaultValue: false,
      defaultValue: ""
    };
  },
  computed: {
    showEmailPrimary() {
      if (this.name !== "emails") {
        if (this.listData.length > 0) {
          return this.listData[0].number;
        }
      }
      return "(No data)";
    }
  },
  methods: {
    changeData(name, i, value) {
      this.listValue.forEach((item, index) => {
        if (index === i) {
          item[name] = value;
        }
      });
    },
    add() {
      if (this.$refs.form.validate()) {
        if (this.isDefaultValue) {
          this.$emit("addDefaultEmail", this.defaultValue);
          this.isDefaultValue = false;
        } else {
          this.$emit(
            "update",
            this.name === "phones"
              ? this.listValue.map(item => ({
                  ...item,
                  number: `+84${item.number.slice(1)}`
                }))
              : this.listValue
          );
        }
      }
    },
    addRow() {
      this.listValue.push({ [this.keyValue]: "", type: "" });
      this.$nextTick(() => {
        this.$refs.valueInput[this.listValue.length - 1].focus();
      });
    },
    removeRow(index) {
      this.listValue = this.listValue.filter((x, i) => i !== index);
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        if (!this.primaryValue) {
          if (this.name === "emails") {
            this.isDefaultValue = true;
          }
        }
        if (this.name === "phones") {
          this.listValue = this.listData.map(phone => {
            const phoneReplace1 = {};
            const number = phone.number.replace("+", "");
            phoneReplace1.number = number.replace(/84|81/, "0");
            phoneReplace1.type = phone.type;
            return phoneReplace1;
          });
        } else {
          this.listValue = [...this.listData];
        }
      }
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>
