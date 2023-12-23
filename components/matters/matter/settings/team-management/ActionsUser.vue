<template>
  <v-menu :close-on-content-click="false"
          v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          offset-y>
    <slot>
      <v-list dense>
        <v-list-item v-for="(item, index) in items"
                     :key="index"
                     @click="$emit('changeMenu', item)">
          <v-list-item-avatar v-if="icon" size="20">
            <v-icon small>{{item.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ item[itemText] }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </slot>
  </v-menu>
</template>

<script>
export default {
  name: "ActionsUser",
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,

  }),
  props: {
    event: {},
    items: {
      type: Array
    },
    itemText: {
      type: String,
      default: 'title'
    },
    icon: {
      type: Boolean
    }
  },
  mounted() {
    try {
      this.show(this.event);
    } catch (e) {
      console.log('ActionsUser', e.message);
    }
  },
  methods: {
    show(e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
  },
  watch: {
    event(v) {
      this.show(v)
    }
  }

}
</script>

<style scoped>

</style>
