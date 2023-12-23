<template>
   <v-row no-gutters class="align-center mt-3">
    <!-- <v-btn-toggle active-class>
      <v-btn :to="{name: 'ProjectResourceOverviewTeam'}"  class="px-3">@resources</v-btn>
      <v-btn :to="{name:'ProjectResourceOverviewProject'}"  class="px-3">#projects</v-btn>
    </v-btn-toggle>-->
    <v-btn-toggle class="bg-btn-toggle">
      <v-btn
        :to="{ name: 'ProjectResourceOverviewTeam' }"
        color="error"
        class="btn-toggle-tree px-3"
        >@resources</v-btn
      >
      <v-btn
        class="btn-toggle-tree px-3"
        :to="{ name: 'ProjectResourceOverviewProject' }"
        color="error"
        >#projects</v-btn
      >
    </v-btn-toggle>
  </v-row>
</template>
<style scoped>
.btn-toggle-tree::before {
  background: transparent !important;
}
.btn-toggle-tree {
  border: 0 !important;
}
.bg-btn-toggle {
  background: none;
}
</style>
