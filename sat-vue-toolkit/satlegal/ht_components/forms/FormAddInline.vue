<template>
  <v-col cols="12">
    <v-form ref="form">
      <v-row no-gutters>
        <v-text-field
          autofocus
          hide-details
          class="ma-0 pa-0"
          v-model="text"
          :rules="[v => !!v || 'This field is required']"
        />
        <v-btn
          small
          @click="
            $emit('add', text);
            $refs.form.reset();
            $emit('cancel');
          "
          class="ma-0 custom"
          icon
          color="primary"
        >
          <v-icon small>check</v-icon>
        </v-btn>
        <v-btn
          small
          @click="
            $emit('cancel');
            $refs.form.reset();
          "
          class="ma-0 custom"
          icon
        >
          <v-icon small>close</v-icon>
        </v-btn>
      </v-row>
    </v-form>
  </v-col>
</template>
<script>
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>
