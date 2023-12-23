<template>
  <div>
    <!--<h1 class="title">
      Vue.js Virtual + Infinite Scroll + Dynamic Row Heights + Arrow Key
      Navigation + No Libraries
    </h1>
    <p class="subtitle">
      No hardcoding of heights necessary for each row. Set emitEnabled to false
      for max performance. Tested with
      <span id="large_num">50000</span> items...
    </p>-->
    <InfiniteList>
      <template v-slot:default="{ visibleItems, options, selectedIndex }">
        <!--<div v-for="i in visibleItems"
               :key="i.id"
               class="list-item"
               :ref="i.id"
               :data-index="i.index"
               :class="i.index === selectedIndex ? 'selected' : ''">
            <div>{{ i.index + " " + i.value }}</div>
          </div>-->
      </template>
    </InfiniteList>
  </div>
</template>

<script>
import InfiniteList from '~/features/ui/hoc/InfiniteList'
export default {
  name: 'VirtualInfinite',
  components: { InfiniteList },
}
</script>

<style scoped lang="scss">
@import './infinite';
</style>
