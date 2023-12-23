<template>
  <v-card color="transparent">
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-btn class="text-capitalize">
        Use this Caf
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto,
      asperiores commodi deleniti deserunt doloribus dolorum ipsam obcaecati
      odio! Delectus harum impedit placeat voluptate? Amet doloribus id magni
      mollitia odit.
    </v-card-text>
    <v-dialog hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-title class="text-subtitle-1">
          Please stand by
        </v-card-title>
        <v-card-text>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {},
  },
}
</script>

<style scoped></style>
