<template>
  <MainLayout>
    <div class="flex">
      <ProjectHeader/>
      <TabsLinkProject :links="links"/>
      <v-divider></v-divider>
      <router-view></router-view>
      <ManageMember ref="ManageMember"/>
    </div>
  </MainLayout>
</template>

<script>
  import MainLayout from "../components/layouts/MainLayout";
  import ProjectHeader from "../views/project/components/ProjectHeader";
  import TabsLinkProject from "../views/project/components/TabsLinkProject";
  import ManageMember from "../views/project/components/ManageMember";
  import {LINKS} from '../views/project/components/constant';

  export default {
    name: "ProjectLoggedIn",
    components: {ManageMember, TabsLinkProject, ProjectHeader, MainLayout},
    data() {
      return {
        links: []
      }
    },
    created() {
      let routes = this.$router.options.routes;
      let routeActive = this.$underscore.filter(routes, item => {
        if(item.meta && item.meta.layout && item.meta.layout === "ProjectLoggedIn") {
          return true
        }
        return item.name === this.$router.currentRoute.name
      });
      if (routeActive[0]) {
        this.links = routeActive[0].children;
      }

      this.$eventHub.$on(this.$eventTypes.menuProjectSetting, (_type) => {
        if(_type === LINKS.MANAGE) {
          this.$refs.ManageMember.toggleModal();
        }
      })
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
