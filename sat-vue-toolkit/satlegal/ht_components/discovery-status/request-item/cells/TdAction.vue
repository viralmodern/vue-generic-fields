<template>
  <td>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="click" v-if="!this.dataRow.request_task">
          <IconText icon="mdi-plus" name="Create new task"/>
        </v-list-item>
        <v-list-item @click="click">
          <IconText icon="archive" name="Archive"/>
        </v-list-item>
        <v-list-item @click="click">
          <IconText icon="done" name="Mark as done"/>
        </v-list-item>
        <v-list-item @click="$emit('remove')">
          <IconText icon="delete_sweep" name="Delete"/>
        </v-list-item>
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import IconText from "../IconText";

export default {
  props: {
    dataRow: Object
  },
  components: {
    IconText
  },
  methods: {
    click() {}
  }
};
</script>
