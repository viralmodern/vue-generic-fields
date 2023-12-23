<template>
  <div class="d-block w-100 fill-height py-1">
    <div class="d-flex align-center justify-start fill-height" @click="$$openDropDownSource">
      <template v-if="val">
        <v-avatar :size="25">
          <img :src="val" alt="John">
        </v-avatar>
      </template>
      <template v-else>
        <v-btn rounded small icon :title="`Upload ${$$attribute.label}`">
          <v-icon small>mdi-upload</v-icon>
        </v-btn>
      </template>
    </div>

  </div>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "PictureCell",
    data () {
      return {
        val: ""
      }
    },
    mixins: [mxAttributeItem],
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
