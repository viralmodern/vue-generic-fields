<template>
  <v-row no-gutters fill-height>
    <v-col>
      <BillingHeader />
      <router-view></router-view>
    </v-col>
  </v-row>
</template>
<script>
import BillingHeader from "../../ht_components/header-wrapper/BillingHeader";
export default {
  components: {
    BillingHeader
  }
};
</script>
