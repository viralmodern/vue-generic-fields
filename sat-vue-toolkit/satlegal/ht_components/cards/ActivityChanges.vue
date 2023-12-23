<template>
  <v-col>
    <strong>-</strong>&nbsp;
    <strong>{{title}}:</strong>&nbsp;
    <span class="error--text">
      <s>{{ from }}</s>
    </span>
    <span class="success--text">&nbsp;{{ to }}</span>
  </v-col>
</template>

<script>
export default {
  props: {
    title: String,
    from: String,
    to: String
  }
};
</script>
