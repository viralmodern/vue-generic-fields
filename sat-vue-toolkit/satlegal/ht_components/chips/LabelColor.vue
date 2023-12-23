<template>
  <v-chip small :color="color" label class="white--text custom-chip">
    <span>{{ text }}</span>
  </v-chip>
</template>
<script>
export default {
  props: {
    color: String,
    text: String
  }
};
</script>


<style >
.custom-chip {
  /* height: 20px !important; */
  border-radius: 4px;
  margin: 0px 2px;
}
</style>

