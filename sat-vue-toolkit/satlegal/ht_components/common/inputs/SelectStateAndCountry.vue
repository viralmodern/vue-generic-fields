<template>
  <div class="d-flex align-center no-gutters">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      :nudge-width="290"
      offset-y
    >
      <template v-slot:activator="{ on: onMenu }">
        <div class="d-flex align-center text-no-wrap">
          <span class="mr-2">{{ showStateAndCountry }}</span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on: onTooltip }">
              <AddIcon
                :on="{ ...onMenu, ...onTooltip }"
                @onClickIcon="$emit('onOpenMenu')"
                icon="mdi-earth"
                :colorButton="colorButton"
                :colorIcon="valid ? 'red' : ''"
                :style="`${valid ? 'border-color:red' : ''}`"
              />
            </template>
            <span>{{ textTooltipAfter }}</span>
          </v-tooltip>
        </div>
      </template>
      <div>
        <v-card>
          <v-card-title class="py-2">
            <span class="title">{{ title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-radio-group :value="type" row>
              <v-radio
                class="custom-radio mx-1"
                v-for="(item, index) in dataType"
                :key="index"
                :label="item.label"
                :value="item.value"
                @change="type = item.value"
              ></v-radio>
            </v-radio-group>
          </v-card-subtitle>
          <v-divider></v-divider>
          <div class="scroll-list">
            <v-card-text class="px-4 py-0 custom-text-field">
              <div class="d-flex justify-space-around">
                <v-radio-group :value="type === 1 ? typeState : typeCountry" column>
                  <v-radio
                    class="custom-radio mx-1"
                    v-for="(item, index) in type === 1 ? listState : listCountry"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :color="item.color"
                    @change="type === 1 ? typeState = item.value : typeCountry = item.value"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-card-text>
          </div>
          <v-card-actions v-if="isActions">
            <div class="text-right" style="width:100%">
              <v-btn
                small
                class="mr-1"
                color="primary"
                @click="
                  $emit('update', {
                    state: typeState || null,
                    country: typeCountry || null
                    });
                  menu = false;
                "
              >{{nameButtonSubmit}}</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>

<script>
import AddIcon from "../buttons/AddIcon";

export default {
  components: {
    AddIcon
  },
  props: {
    textTooltipAfter: {
      type: String,
      default: () => "Select state and country"
    },
    nameButtonSubmit: String,
    colorButton: String,
    isActions: Boolean,
    title: String,
    valid: Boolean,
    valueStateAndCountry: Object,
    listState: Array,
    listCountry: Array
  },
  data() {
    return {
      menu: false,
      days1: null,
      days2: null,
      type: 1,
      typeState: "",
      typeCountry: "",
      dataType: [
        { value: 1, label: "State" },
        { value: 2, label: "Country" }
      ],
      isClone: false
    };
  },
  computed: {
    showStateAndCountry() {
      if (Object.keys(this.valueStateAndCountry).length > 0) {
        const state =
          (this.valueStateAndCountry && this.valueStateAndCountry.state) || "";
        const country =
          (this.valueStateAndCountry && this.valueStateAndCountry.country) ||
          "";
        if (!state && !country) {
          return "(No data)";
        }
        const mapValueState = state
          ? (this.listState || []).find(item => item.value === state)
          : "";

        const mapValueCountry = country
          ? (this.listCountry || []).find(item => item.value === country)
          : "";
        return (
          ((mapValueState && mapValueState.label) || "") +
          (mapValueState && mapValueCountry ? " - " : "") +
          ((mapValueCountry && mapValueCountry.label) || "")
        );
      }
      return "(No data)";
    }
  },
  methods: {},
  watch: {
    menu: {
      handler(val) {
        if (val) {
          this.typeState =
            this.valueStateAndCountry && this.valueStateAndCountry.state;
          this.typeCountry =
            this.valueStateAndCountry && this.valueStateAndCountry.country;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.typeState =
      this.valueStateAndCountry && this.valueStateAndCountry.state;
    this.typeCountry =
      this.valueStateAndCountry && this.valueStateAndCountry.country;
  }
};
</script>
<style scoped>
.scroll-list {
  max-height: 320px;
  overflow: auto;
}
.scroll-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
.scroll-list::-webkit-scrollbar {
  width: 3px;
  background-color: #f5f5f5;
}
.scroll-list::-webkit-scrollbar-thumb {
  background-color: #3f51b5;
}
.input-search >>> .v-input__slot {
  min-height: 42px;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>