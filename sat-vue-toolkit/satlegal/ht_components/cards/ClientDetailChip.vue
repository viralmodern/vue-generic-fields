<template>
  <div>
    <v-menu
      style="width: 120px"
      v-model="menuSigned"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="px-1 white--text text-capitalize"
          rounded
          :color="getSigned.color"
          small
          v-on="on"
          >{{ getSigned.name }}</v-btn
        >
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in listSigned"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-1 white--text text-capitalize"
            rounded
            :color="item.color || ''"
            small
            @click="onChangeSigned(item.id)"
            >{{ item.name || "" }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
    <v-menu
      style="width: 120px"
      v-model="menuType"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="px-2 white--text text-capitalize"
          rounded
          :color="getDataAccount.color"
          small
          >{{ getDataAccount.name }}</v-btn
        >
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in listAccountType"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="item.color"
            small
            @click="changeAccountType(item.id)"
            >{{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { listSigned, listAccountType } from "../../config";

export default {
  props: {
    clientDetail: Object
  },
  data() {
    return {
      listSigned,
      listAccountType,
      menuSigned: false,
      menuType: false
    };
  },
  methods: {
    onChangeSigned(id) {
      this.$emit("changeSigned", id);
      this.menuSigned = false;
    },
    changeAccountType(id) {
      this.$emit("changeAccountType", id);
      this.menuType = false;
    }
  },
  computed: {
    getSigned() {
      return this.listSigned.find(x => x.id === this.clientDetail.signed) || {};
    },
    getDataAccount() {
      return (
        this.listAccountType.find(
          x => x.id === this.clientDetail.account_type
        ) || {}
      );
    }
  }
};
</script>
