<template>
  <div>
    <v-btn class="primary" @click="$emit('moveRight')">
      <v-icon>chevron_right</v-icon>
    </v-btn>
    <v-btn class="primary" @click="$emit('moveAllRight')">
      <v-icon>fast_forward</v-icon>
    </v-btn>
    <v-btn class="primary" @click="$emit('moveLeft')">
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-btn class="primary" @click="$emit('moveAllLeft')">
      <v-icon>fast_rewind</v-icon>
    </v-btn>
  </div>
</template>