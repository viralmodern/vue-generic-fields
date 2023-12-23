<template>
  <v-main>
    <v-container fluid>
      <AllMatters height="92.5vh" :owner-pk="ownerPk" />
    </v-container>
  </v-main>
</template>
<script>
import AllMatters from '@/sat-vue-toolkit/satlegal/views/ui/AllMatters.vue'

export default {
  components: { AllMatters },
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss"></style>
