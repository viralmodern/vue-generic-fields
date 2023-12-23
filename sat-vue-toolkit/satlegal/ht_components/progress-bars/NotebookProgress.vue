<template>
   <v-row no-gutters class="align-center" style="width:100%">
    <v-progress-linear class="ma-0" :color="color" :value="showProgress"></v-progress-linear>
  </v-row>
</template>
<script>
export default {
  props: {
    top: Number,
    color: String,
    count: Number,
  },
  computed: {
    showProgress(){
      return this.count * 100 / this.top
    }
  },
}
</script>

