<template>
  <component :is="sideBar"></component>
</template>

<script>
  import DrawerMatterSetting from "./DrawerMatterSetting";
  import DrawerDashboard from "./DrawerDashboard";
  import DrawerMatter from "./DrawerMatter";

  export default {
    name: "SideBarBase",
    components: {DrawerMatter, DrawerDashboard, DrawerMatterSetting},
    mounted() {
      console.log(this.$router)
    },
    computed: {
      sideBar() {
        const {name, params: {matter}} = this.$route
        let regx = /^matters-matter-setting/,
          isMatterSetting = regx.test(this.$route.name);
        if (isMatterSetting) return 'drawer-matter-setting'
        if (name === 'matters-matter' || !!matter) return 'DrawerMatter'
        return 'DrawerDashboard'
      }
    }
  }
</script>

<style scoped>

</style>
