<template>
  <v-card :loading="loading" style="border-radius: 0px">
    <v-list subheader dense>
      <v-subheader
        style="position: sticky; top: 0px; background: #ffffff; z-index: 2"
      >
        Assigned to me
      </v-subheader>
      <template v-for="(item, index) in list">
        <v-list-item :key="index" :to="`/matters/${item.pk}`">
          <v-list-item-avatar :color="`#${item.color}`">
            <span>{{ item.name | $$strName }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'ListMatterAssigned',
  data() {
    return {
      list: [],
      loading: false,
    }
  },
  async mounted() {
    // await this.fetchList()
  },
  methods: {
    async fetchList() {
      try {
        this.loading = true
        let endPoint = `/api/matters/?assigned_to_me=true&ungroup=true`
        let result = await this.$api.get(endPoint)
        this.list = result.data.results
        return result
      } catch (e) {
        return false
      } finally {
        this.loading = false
      }
    },
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped></style>
