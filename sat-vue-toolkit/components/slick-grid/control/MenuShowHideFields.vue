<template>
  <div>
    <v-menu v-model="uiShowMenu"
            offset-y
            open-delay="0"
            :close-on-content-click="false"
            max-height="45vh">
      <template v-slot:activator="{ on }">
        <slot name="activator" :on="on">
          <BtnLink :label="title" :icon="icon" v-on="on"/>
        </slot>
      </template>
      <slot>
        Menu Show/Hide Fields
      </slot>
    </v-menu>
  </div>
</template>

<script>

    import BtnLink from "@/sat-vue-toolkit/components/BtnLink.vue"

    export default {
        name: 'MenuShowHideFields',
      components: { BtnLink },
      props: {
            title: {
                type: String,
                default: () => 'Customize'
            },
            icon: {
                type: String,
                default: () => 'mdi-swap-horizontal'
            },
            value: {

            }

        },
        data() {
            return {
                uiShowMenu: false
            }
        },
        watch: {
            uiShowMenu: {
                // immediate: true,
                handler(v) {
                    this.$emit('input', v)
                    if(!v) {
                      this.$emit('close')
                    }
                }
            }
        },

        methods: {
            closeMenu() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped></style>
