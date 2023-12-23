<template>
  <v-card max-width="300" class="pa-4">
    <template v-for="color in COLORS">
      <v-btn icon
             @click="clickItem(color)"
             :input-value="`#${val}` === color">
        <v-icon :color="`${color}`">
          mdi-checkbox-blank-circle
        </v-icon>
      </v-btn>
    </template>
  </v-card>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"
  import { COLORS } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "ColorsSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: "",
        COLORS
      }
    },
    watch: {
      value: {
        immediate: true,
        deep: true,
        handler (v) {
          this.val = v
        }
      }
    },
    methods: {
      clickItem (color) {
        try {
          let val = color.replace("#", "")
          this.$$execute({ val })
        } catch (e) {
        }
      }
    }
  }
</script>
<style scoped></style>


