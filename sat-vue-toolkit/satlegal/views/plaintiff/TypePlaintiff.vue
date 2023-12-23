<template>
  <v-row no-gutters class="ma-2">
    <v-col cols="12" class="text-xs-left">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" outlined v-on="on">
            <v-icon class="mr-2">mdi-compare_arrows</v-icon>
            {{ nameGroup }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.toLink"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "All Plaintiff",
          toLink: {
            name: "AllPlaintiff"
          }
        },
        {
          id: 2,
          name: "By KYC Status",
          toLink: {
            name: "ByKYCStatus"
          }
        },
        {
          id: 3,
          name: "By Acquire Source",
          toLink: {
            name: "ByAcquireSource"
          }
        },
        {
          id: 4,
          name: "By Plaintiff Group",
          toLink: {
            name: "ByPlaintiffGroup"
          }
        }
      ]
    };
  },
  computed: {
    nameGroup() {
      const name = this.$route.name;
      return name === "AllPlaintiff"
        ? "All Plaintiff"
        : name === "ByKYCStatus"
        ? "By KYC Status"
        : name === "ByAcquireSource"
        ? "By Acquire Source"
        : name === "ByPlaintiffGroup"
        ? "By Plaintiff Group"
        : "";
    }
  }
};
</script>
