<template>
  <v-menu
    offset-x
    v-model="open"
    :position-x="x"
    :position-y="y"
    :close-on-content-click="false"
  >
    <!--<v-list class="list-customize">
      <v-list-item v-for="item in items" :key="item.text" @click="clickItem">
        <v-list-item-title>
          <v-btn icon small>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-btn>
          <span class="text-caption">{{ item.text }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>-->
    <v-card>
      <slot v-if="uiShowMenu" :entry="entry"></slot>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'MenuPicker',
  props: {
    value: {},
    type: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      uiShowMenu: false,
      x: 0,
      y: 0,
      items: [
        {
          text: 'Rename',
          icon: 'mdi-pencil-box',
        },
        {
          text: 'Download PDF',
          icon: 'mdi-download',
        },
        {
          text: 'Reupload PDF',
          icon: 'mdi-upload',
        },
        {
          text: 'Bookmark',
          icon: 'mdi-bookmark',
        },
        {
          text: 'Delete',
          icon: 'mdi-delete',
        },
      ],
      entry: null,
    }
  },
  computed: {
    open: {
      get() {
        return this.uiShowMenu
      },
      set(val) {
        this.uiShowMenu = val
        this.$emit('input', val)
      },
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        try {
          if (val.e) {
            this.show(val.e)
            this.entry = val.item
          } else {
            this.show(val)
          }
        } catch (e) {
          this.show(val)
          console.log('XOP', val)
        }
      },
    },
  },
  methods: {
    show(e) {
      try {
        e.preventDefault()
        this.uiShowMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.uiShowMenu = true
        })
      } catch (e) {}
    },
    clickItem(e) {
      try {
        console.log('clickItem', e.target.textContent)
        this.$emit('clickItem', { text: e.target.textContent })
        this.uiShowMenu = false
      } catch (e) {
        console.log('clickItem', e.message)
      }
    },
  },
}
</script>
<style scoped></style>
