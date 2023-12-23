<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn v-if="!text" v-on="on" :color="color || 'grey'" icon :size="size || 25" class="btn_input"
               @click.stop="$emit('onClick', $event)">
          <v-icon>{{icon || 'mdi-account-plus'}}</v-icon>
        </v-btn>
        <v-btn v-else v-on="on" :color="color || 'grey'" icon :size="size || 25" class="btn_input"
               @click.stop="$emit('onClick', $event)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>{{title}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ButtonTooltip",
  props: ["title", "icon", "size", "color", "text"]
}
</script>

<style scoped>

</style>
