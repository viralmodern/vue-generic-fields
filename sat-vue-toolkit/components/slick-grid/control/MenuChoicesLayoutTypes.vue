<template>
  <v-menu offset-y
          :close-on-content-click="true"
          open-delay="0"
          max-height="45vh">
    <template v-slot:activator="{ on }">
      <btn-link v-on="on"
                :input-value="true"
                :label="types[value] | t_name"
                :icon="types[value] | t_icon"/>
    </template>
    <slot>
      <v-list dense>
        <template v-for="type in types">
          <v-list-item :key="`layout-type-menu-${type.TYPE}`" dense active-class="primary--text"
                       :input-value="type.TYPE === value"
                       @click="changeLayout(type.TYPE)">
            <v-list-item-icon>
              <v-icon>{{type | t_icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption text-capitalize">
                {{type | t_name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </slot>
  </v-menu>
</template>

<script>
  import BtnLink from "@/sat-vue-toolkit/components/BtnLink.vue"

  export default {
    name: "MenuChoicesLayoutTypes",
    components: { BtnLink },
    props: {
      types: {
        type: [Object, Array],
        default: () => {
        }
      },
      value: {}
    },

    methods: {
      changeLayout (layoutType) {
        this.$emit("input", layoutType)
        this.$emit("change-layout", layoutType)
      }
    },
    filters: {
      t_name (type) {
        try {
          return type.TEXT.toLowerCase()
        } catch (e) {
          return "__"
        }
      },
      t_icon (type) {
        try {
          return type.ICON
        } catch (e) {
          return "__"
        }
      }

    }
  }
</script>

<style scoped>

</style>
