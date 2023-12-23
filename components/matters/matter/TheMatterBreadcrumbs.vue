<template>
  <div>
    <BreadCrumbsBase :items="items" />
  </div>
</template>

<script>
import BreadCrumbsBase from '../../utils/BreadCrumbsBase'

export default {
  name: 'SettingMatterBreadcrumbs',
  components: { BreadCrumbsBase },
  data() {
    return {
      links: [
        {
          path: '/matters',
          disabled: false,
          text: 'All matters'
        }
      ],
      temp: null,
      breadcrumbs: []
    }
  },
  computed: {
    items() {
      try {
        let links = [...this.links]
        if (this.matter) {
          links.splice(1, 0, this.matter)
        }
        if (this.temp) {
          links.push(this.temp)
        }
        return links
      } catch (e) {
        console.log(e.message)
        return this.links
      }
    },
    matter() {
      try {
        let matter = this.$store.getters['matters/matterDetail']
        return {
          path: matter.path,
          disabled: false,
          link: true,
          text: matter.name
        }
      } catch (e) {
        return null
      }
    }
  },
  mounted() {
    this.$eventHub.$on(
      this.$eventBusTypes.setBreadcrumbsMatterSetting,
      (item) => {
        try {
          this.temp = item
          // links[links.length - 1] = item
        } catch (e) {
          console.log(e.message)
        }
      }
    )
  }
}
</script>

<style scoped></style>
