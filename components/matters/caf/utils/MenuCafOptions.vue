<template>
  <v-menu :value="open"
          :close-on-content-click="false"
          :position-x="x"
          :position-y="y"
          absolute right
          offset-x>
    <v-list dense>
      <v-list-item style="min-height: unset"
                   v-for="(item, index) in items"
                   :key="index"
                   @click="clickOption(item.value)">
        <v-list-item-icon class="">
          <v-icon v-if="item.active" color="warning">{{item.icon}}</v-icon>
          <v-icon v-else color="default">{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="py-0">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "MenuCafOptions",
  data() {
    return {
      x: 0, y: 0, open: false,
      items: [
        {
          title: 'Assign Member',
          value: 'assign_member',
          icon: 'mdi-account-multiple-plus',
          query: {member: true}
        },
        {
          title: 'Add Record',
          value: 'add_record',
          icon: 'mdi-plus',
        },
        {
          title: 'Open in New Tab',
          icon: 'mdi-open-in-new',
          value: 'open_in_new_tab',
        },
        {
          title: 'Add to Favorites',
          icon: 'mdi-star',
          value: 'add_to_favorite',
          active: false,
        },
        {
          title: 'Hide',
          icon: 'mdi-eye', // mdi-eye-off
          value: 'hide',
        },

      ]
    }
  },
  methods: {
    show(e) {
      e.preventDefault()
      this.open = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.open = true
      })
    },
    clickOption(value) {
      try {
        let idx = this.items.findIndex(i => i.value === value)
        let item = this.items[idx]
        switch (value) {
          case 'hide':
            item['icon'] = this.items[idx]['icon'] === 'mdi-eye-off' ? 'mdi-eye' : 'mdi-eye-off'
            break;
          case 'add_to_favorite':
            item['active'] = !item['active']
            break;
          case 'assign_member':
            this.$router.push({query: {members: null}})
            break;
          default:
            break;
        }
        this.items[idx] = item
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
