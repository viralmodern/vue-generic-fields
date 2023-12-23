<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list subheader>
          <v-list-item :class="`v-list-title ${themeColor}`">
            <v-list-item-content class="mt-2">
              <v-list-item-title>Background</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="mt-2">
              <v-btn icon @click="menu = false">
                <v-icon size="20">arrow_back</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <div
            v-for="item in dataBackgroundColor"
            :key="item.id"
            :class="
              `mt-1 text-xs-center v-div-theme-color ${item.backgroundColor}`
            "
            @click="selectColor(item)"
          >
            <v-row  no-gutters>
              <v-col
                style="height: 40px"
                cols="6"
                justify-center
                align-center
                d-flex
              >
                <span class="text-body-1 text-xs-left ml-3">{{
                  item.backgroundColor
                }}</span>
              </v-col>
              <v-col v-if="item.isActive" cols="6" right>
                <v-btn icon small @click="confirmChangeColorTheme">
                  <v-icon size="20">check</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteColorTheme(item)">
                  <v-icon size="20">delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import {$$STORE_PREFIX} from "../../utils";

function showButtonSelectColor(button) {
  button.isActive = false;
  for (let i = 0; i < button.length; i++) {
    showButtonSelectColor(button[i]);
  }
}
export default {
  data() {
    return {
      menu: false,
      isActiveButton: false,
      color: "",
      messageSnackbar: "",
      snackbar: false
    };
  },
  computed: {
    ...mapGetters("ht_store/project", ["dataBackgroundColor", "themeColor"])
  },
  mounted() {
    this.$store.dispatch("ht_store/project/getDataBackgroundColor");
  },
  methods: {
    selectColor(item) {
      showButtonSelectColor(this.dataBackgroundColor);
      item.isActive = true;
      this.isActiveButton = item.isActive;
      this.color = item.backgroundColor;
      this.$emit("emitBackgroundColor", item);
      this.selectThemeColor(this.color);
      this.changeThemeColor(this.color);
    },
    ...mapActions("ht_store/project", ["selectThemeColor", "changeThemeColor"]),
    ...mapMutations("ht_store/project", [
      "selectThemeColorSuccess",
      "changeThemeColorSuccess"
    ]),
    confirmChangeColorTheme() {
      this.changeThemeColorSuccess();
      this.messageSnackbar =
        "Change theme color " + this.color + " for banner success!";
      this.emitSnackbar(this.messageSnackbar);
    },
    deleteColorTheme(item) {
      const data = {
        idThemeColor: item.id
      };
      if (data) {
        this.messageSnackbar = "Delete Theme color " + this.color + " success!";
        this.emitSnackbar(this.messageSnackbar);
      }
    },
    emitSnackbar(messageSnackbar) {
      this.snackbar = true;
      this.$emit("snackbar", this.snackbar, messageSnackbar);
    }
  }
};
</script>

<style scoped>
.v-list-title {
  height: 60px;
}
.v-div-theme-color {
  cursor: pointer;
  height: 40px;
}
</style>
