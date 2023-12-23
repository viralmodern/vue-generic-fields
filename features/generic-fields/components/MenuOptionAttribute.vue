<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-icon right v-on="on" :class="clsHover">
        mdi-dots-vertical
      </v-icon>
    </template>
    <v-list dense class="py-0">
      <template v-for="item in items">
        <v-list-item
          :key="item.title"
          @click="$emit('change', { type: item.action })"
        >
          <v-list-item-icon>
            <v-icon small :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider :key="`dr-${item.title}`" />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuOptionAttribute',
  props: {
    clsHover: {
      type: String,
      default: () => 'hide_base'
    }
  },
  data() {
    return {
      items: [
        { title: 'Edit attribute', icon: 'mdi-pencil', action: 'edit' },
        {
          title: 'Remove from this matter',
          icon: 'mdi-folder-remove',
          action: 'remove_scope'
        },
        {
          title: 'Delete from this workspace',
          icon: 'mdi-delete',
          color: 'red',
          action: 'remove_workspace'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
