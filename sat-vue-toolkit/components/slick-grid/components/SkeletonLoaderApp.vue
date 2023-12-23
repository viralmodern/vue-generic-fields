<template>
  <v-container fluid>
    <v-row>
      <v-col v-bind="skeletonLoaderLayouts.vBind"
             v-for="n in skeletonLoaderLayouts.l" :key="n">
        <v-skeleton-loader elevation="2"
                           ref="skeleton"
                           :boilerplate="true"
                           :type="skeletonLoaderLayouts.types"
                           :tile="false"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "SkeletonLoaderApp",
    props: {
      skeletonLoaderLayouts: {
        type: Object,
        default: () => ({
          vBind: {},
          l: 6,
          types: "article, actions"
        })
      }
    }
  }
</script>

<style scoped>

</style>
