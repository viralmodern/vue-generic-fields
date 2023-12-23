<template>
  <v-card flat
          max-width="350px">
    <v-hover v-slot:default="{ hover }">
      <div class="d-flex align-center pa-2">
        <v-icon left
                small>{{ attribute.icon }}
        </v-icon>
        <div class="caption font-weight-bold">
          {{ attribute.label }}
        </div>
        <div class="flex-grow-1"></div>
        <div v-if="!disabledActions"
             :class="{show_base: hover, hide_base: !hover}">
          <template v-for="action in attribute.actionsFieldSetting">
            <v-btn icon
                   v-on="action.on"
                   small
                   v-bind="action.attrs">
              <v-icon small>{{ action.icon }}</v-icon>
            </v-btn>
          </template>
        </div>
      </div>
    </v-hover>
  </v-card>
</template>

<script>
export default {
  name: "CustomizeFieldItem",
  props: {
    attribute: {
      type: Object,
      default: () => ({label: "Member"})
    },
    disabledActions: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style scoped>

</style>
