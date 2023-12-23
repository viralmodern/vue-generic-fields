<template>
  <v-card class="py-4" style="border-radius: 10px;">
    <v-row no-gutters class="align-center">
      <v-col cols="12" sm="6">
        <v-row no-gutters class="justify-center">
          <div class="fact-column text-h4 characters">
            <div class="transform">{{ involvedCharacters }}</div>
          </div>
          <div class="fact-column text-h4 locations">
            <div class="transform">{{ locations }}</div>
          </div>
          <div class="fact-column text-h4 issuses">
            <div class="transform">{{ issuses }}</div>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" class="pl-2">
        <div class="py-2">
          <v-row no-gutters class="align-center">
            <div class="fact-round characters"></div>
            <span class="pl-2 subheading">Involved Characters</span>
          </v-row>
        </div>
        <div class="py-2">
          <v-row no-gutters class="align-center">
            <div class="fact-round locations"></div>
            <span class="pl-2 subheading">Locations</span>
          </v-row>
        </div>
        <div class="py-2">
          <v-row no-gutters class="align-center">
            <div class="fact-round issuses"></div>
            <span class="pl-2 subheading">Issues</span>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    involvedCharacters: Number,
    locations: Number,
    issuses: Number
  }
};
</script>

<style scoped>
.fact-column {
  width: 80px;
  background: #eaafaf;
  color: white;
  height: 200px;
  text-align: center;
  line-height: 200px !important;
  margin: 0px 10px;
  border-radius: 10px;
}
.fact-round {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.transform {
  transform: rotate(270deg);
}
.characters {
  background: #469454;
}
.locations {
  background: #bec136;
}
.issuses {
  background: #bf3f37;
}
</style>
