<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on"  color="primary">
        <v-icon class="mr-2">add_box</v-icon>Add Resource
      </v-btn>
    </template>
    <v-list>
      <label>
        <v-list-item class="mouse" @change.native.stop>
          <v-list-item-title>Upload a File</v-list-item-title>
        </v-list-item>
        <input
          type="file"
          @change="$emit('selectFile')"
          hidden
          class="hidden"
        />
      </label>
      <v-list-item>
        <MenuMeetingAddLink
          @click.native.stop
          @addLink="v => $emit('addLink', v)"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import MenuMeetingAddLink from "./MenuMeetingAddLink";
export default {
  components: {
    MenuMeetingAddLink
  }
};
</script>
<style scoped>
.mouse {
  cursor: pointer;
}
</style>
