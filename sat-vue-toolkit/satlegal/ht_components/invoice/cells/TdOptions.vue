<template>
  <td>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="click">
          <IconText icon="edit" name="Edit"/>
        </v-list-item>
        <v-list-item @click="click">
          <IconText icon="picture_as_pdf" name="Download PDF"/>
        </v-list-item>
        <v-list-item @click="click">
          <IconText icon="send" name="Send Email"/>
        </v-list-item>
        <v-list-item @click="click">
          <IconText icon="payment" name="Enter Payment"/>
        </v-list-item>
        <v-list-item @click="$emit('delete')">
          <IconText icon="delete_sweep" name="Delete"/>
        </v-list-item>
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import IconText from "./IconText";

export default {
  components: {
    IconText
  },
  methods: {
    click() {}
  }
};
</script>
