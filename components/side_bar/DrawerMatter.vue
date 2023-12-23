<template>
  <v-card flat tile class="fill-height">
    <TopSideBarMatter />
    <NavCafSetting />
  </v-card>
</template>

<script>
import TopSideBarMatter from './TopSideBarMatter'
import NavCafSetting from './NavCafSetting'
export default {
  name: 'DrawerMatter',
  components: { TopSideBarMatter, NavCafSetting },
}
</script>
