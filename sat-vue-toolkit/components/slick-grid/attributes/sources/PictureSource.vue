<template>
  <v-card>
    <v-card-text class="d-flex justify-center align-center flex-wrap">
      <FilePondUpload v-model="val"/>
      <div class="w-100 text-right">
        <v-btn :disabled="!val" @click="clickItem"
               text
               small
               class="text-capitalize">Save
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import FilePondUpload from "@/sat-vue-toolkit/components/uploader/FilePondUpload.vue"
  import baseSourceProps from '../../configs/props/baseSourceProps'
  export default {
    name: "PictureSource",
    components: { FilePondUpload },
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: null,
      }
    },
    computed: {},
    methods: {
      clickItem () {
        try {
          this.$$execute({ val: this.val })
        } catch (e) {
          console.log("choose-cell-picture", e.message)
        }
        return false
      }
    },
    filters: {}
  }
</script>
<style scoped></style>


