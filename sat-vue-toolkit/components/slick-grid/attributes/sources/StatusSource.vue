<template>
  <v-card>
    <template v-for="(item, index) in attribute.list">
      <v-divider :key="`menu-ysu-${index}`" v-if="index !== 0"/>
      <v-card :key="item.value" flat style="border-radius: 0px;">
        <v-list-item @click.stop="clickItem(item)"
                     dense
                     :input-value="item.value === val">
          <v-list-item-icon>
            <v-icon :color="item.label | getStatusColor">mdi-checkbox-blank</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-left">
              {{item.label}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </v-card>
</template>
<script>

  import { getStatusColor } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import baseSourceProps from "../../configs/props/baseSourceProps"

  export default {
    name: "StatusSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: null
      }
    },

    watch: {},
    methods: {
      clickItem (val) {
        try {
          this.$$execute({ val: val.value })
        } catch (e) {
        }
      }
    },
    filters: {
      getStatusColor
    }
  }
</script>
<style scoped></style>

