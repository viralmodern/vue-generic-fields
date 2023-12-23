<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="55%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>{{ title }}</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div>
        <v-list dense class="pa-0">
          <v-card flat :disabled="isLoadingGetDetail">
            <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
            <v-card-text class="py-0">
              <About
                @onDeleteSuccess="$emit('closeMenuRight', false)"
                @updateReports="$emit('updateReports', $event)"
              />
            </v-card-text>
          </v-card>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import About from "./About";
export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean
  },
  components: {
    About
  }
};
</script>
<style scoped>
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
