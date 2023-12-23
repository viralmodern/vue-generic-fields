<template>
  <div>
    <v-btn max-width="unset"
           @click="clickLink"
           depressed
           text
           small
           min-width="unset"
           width="unset"
           class="text-capitalize text-caption"
           style="border-radius: 0px;"
           color="primary">
      <v-icon x-small style="transform: translateY(1px)">mdi-plus</v-icon>
      New {{countLabelSingular}}
    </v-btn>
  </div>
</template>

<script>
    import { COUNT_LABEL_DATA } from "../configs/attribute"

    export default {
        name: "LinkAddRowModal",
        props: {
          countLabelSingular: {
            type: [String, Number],
            default: () => COUNT_LABEL_DATA.countLabelSingular
          },
        },
        methods: {
            clickLink() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>
