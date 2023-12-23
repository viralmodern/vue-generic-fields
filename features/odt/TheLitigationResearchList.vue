<template>
  <v-card width="350px">
    <v-list>
      <v-subheader class="text-capitalize"> Litigation Research </v-subheader>
      <template v-for="(pin, index) in pinned">
        <v-list-item
          :key="`${index}-${pin.path}`"
          active-class="primary--text"
          :to="pin.path"
          replace
        >
          <v-list-item-icon>
            <v-icon v-if="pin.icon">{{ pin.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            class="caption"
            v-html="pin.label"
          ></v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'

export default {
  name: 'TheLitigationResearchList',
  computed: {
    pinned() {
      try {
        return ROUTES.LitigationResearch
      } catch (e) {
        console.log('pinnedRoute', e.message)
        return []
      }
    },
  },
}
</script>

<style scoped></style>
