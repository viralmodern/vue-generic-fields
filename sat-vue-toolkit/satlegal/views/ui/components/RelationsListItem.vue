<template>
  <v-card :color="color | hexToRgbA"
          tile
          class="text-break fill-height"
          style="word-break: break-all">
    <div class="black--text pa-2">
      {{title}}
    </div>
  </v-card>
</template>

<script>
    import {hexToRgbA} from "@/sat-vue-toolkit/functions";

    export default {
        name: "RelationsListItem",
        props: {
            title: {
                type: [String]
            },
            color: {
                type: [String],
                default: () => {
                    return '#ff0000'
                }
            },

        },
        filters: {
            hexToRgbA
        }
    }
</script>

<style scoped>

</style>
