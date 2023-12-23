<template>
  <div class="vote_row d-flex flex-column justify-center align-center">
    <v-btn icon :color="`${hover ? 'primary' : 'default'}`"
           small
           @click="$emit('change-up')"
           :disabled="voted">
      <v-icon small>mdi-chevron-double-up</v-icon>
    </v-btn>
    <v-chip small>
      {{value}}
    </v-chip>
    <v-btn icon :color="`${hover ? 'primary' : 'default'}`" small @click="$emit('change-down')">
      <v-icon small>mdi-chevron-double-down</v-icon>
    </v-btn>
  </div>
</template>

<script>
    export default {
        name: "VoteRow",
        props: {
            hover: {
                type: Boolean,
                default: () => false
            },
            voted: {
                type: Boolean,
                default: () => false
            },

            value: {
                default: () => 0
            }
        }
    }
</script>

<style scoped>

</style>
