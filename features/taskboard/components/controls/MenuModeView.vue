<template>
  <v-menu transition="slide-y-transition" dense offset-y>
    <template v-slot:activator="{ on }">
      <div class="text-capitalize d-flex align-center cusor--pointer" v-on="on">
        <v-icon small>mdi-format-line-spacing</v-icon>
        <div class="mx-1 text-caption">
          Show by: <strong>{{ getActiveMode }}</strong>
        </div>
      </div>
    </template>
    <v-list dense>
      <v-list-item
        v-for="n in list"
        :key="n.title"
        exact
        link
        :to="`${pathByModeView}/${n.query.type}`"
      >
        <v-list-item-icon>
          <v-icon>{{ n.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="n.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'MenuModeView',
  data() {
    return {
      active: '',
      list: [
        {
          title: 'Columns',
          icon: 'mdi-view-column',
          to: '',
          query: {
            type: 'columns',
          },
        },
        {
          title: 'List',
          icon: ' mdi-view-list',
          to: 'list',
          query: {
            type: 'list',
          },
        },
        {
          title: 'Gantt',
          icon: ' mdi-view-agenda',
          to: 'gantt',
          query: {
            type: 'gantt',
          },
        },
      ],
    }
  },
  computed: {
    getActiveMode() {
      if (this.$route.name === 'matters-matter-caf-simple-taskboard-id-gantt') {
        return 'Gantt'
      } else if (
        this.$route.name === 'matters-matter-caf-simple-taskboard-id-list'
      ) {
        return 'List'
      }
      return 'Columns'
    },
    pathByModeView() {
      try {
        const {
          params: { id, matter },
        } = this.$route
        return `/matters/${matter}/caf/simple-taskboard/${id}`
      } catch (e) {
        return `#`
      }
    },
  },
  watch: {},
  methods: {
    clickMenu(r) {
      this.$router.replace(
        _.assign({}, this.$route, {
          query: {
            ...this.$route.query,
            type: r.to,
          },
        })
      )
    },
  },
}
</script>

<style scoped></style>
