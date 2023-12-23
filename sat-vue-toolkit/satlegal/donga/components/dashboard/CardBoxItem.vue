<template>
  <div class="xs4">
    <v-card color="white">
      <v-card-title primary-title>
        <div>
          <div class="text-h5">Project</div>
        </div>
      </v-card-title>
      <v-card-text>
        <p>
          Listen to your favorite artists and albums whenever and wherever,
          online and offline.
        </p>
        <router-link to="/project/2">Project</router-link>
      </v-card-text>
      <v-card-actions>
        <v-btn dark>Listen now</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CardBoxItem",
  data: () => ({})
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
