<template>
  <v-menu v-bind="opts"
          transition="fade-transition"
          v-model="uiShowMenu"
          :open-on-click="false"
          :close-on-content-click="false">
    <slot name="append">

    </slot>
    <slot>
      <v-list class="list-customize py-0" dense>
        <v-list-item link v-for="(item, index) in items" :key="item.text">
          <v-list-item-title @click="clickItem(item.text)">
            <v-btn icon small v-if="!disabledIcon">
              <v-icon small>{{ item.icon }}</v-icon>
            </v-btn>
            <span class="caption">{{ item.text }}</span>
          </v-list-item-title>
          <v-list-item-action v-if="clearable"
                              @click="clearItem(item, index)">
            <v-icon small x-small>mdi-close</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </slot>
  </v-menu>
</template>
<script>
  export default {
    name: "MenuOptionsAbsolute",
    props: {
      value: {},
      offsetY: {
        type: Boolean,
        default: () => false
      },
      clearable: {
        type: Boolean,
        default: () => false
      },
      list: {
        type: Array,
        default: () => []
      },
      disabledIcon: {
        type: Boolean,
        default: () => false
      },
      absolute: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        uiShowMenu: false,
        activatorId: "",
        items: [
          {
            text: "Delete",
            icon: "mdi-delete"
          }
        ]
      }
    },
    computed: {
      optsAbsolute() {
        try {
          let {value} = this
          if(!Boolean(value)) return {}
          let positionX, positionY
          positionX = value.clientX
          positionY = value.clientY
          return {
            positionX,
            positionY,
            absolute: true,
            top: true,
            offsetX: !this.offsetY,
            offsetY: this.offsetY,
          }
        }catch (e) {
          console.error('ERR', e.message, this.value)
          return {}
        }
      },
      opts() {
        let {absolute, optsAbsolute} = this
        if(absolute) return optsAbsolute
        return {
          activator: this.activatorId,
          offsetX: !this.offsetY,
          offsetY: this.offsetY,
        }
      }
    },
    watch: {
      value: {
        // immediate: true,
        handler (val) {
          try {
            if(val !== null) {
              this.show(val)
            }

          } catch (e) {
          }
        }
      },
      list: {
        immediate: true,
        handler (v) {
          if (v) {
            this.items = v
          }
        }
      },
      uiShowMenu: {
        handler(v) {
          if(v === false) {
            if(this.absolute) {

            }else {
              this.$emit('input', null)
            }
          }
        }
      }
    },
    methods: {
      show (id) {
        try {
          this.uiShowMenu = false
          this.activatorId = id
          this.$nextTick(() => {
            this.uiShowMenu = true
          })
        } catch (e) {
        }
      },
      clickItem (textContent) {
        try {
          this.uiShowMenu = false
          this.$emit("click-item", { text: textContent, activatorId: this.activatorId })
        } catch (e) {
          console.log("clickItem", e.message)
        }
      },
      clearItem(item, index) {
        try {
          this.$emit("clear-item", {item, index})
        }catch (e) {

        }
      }
    }
  }
</script>

<style scoped></style>
