<template>
  <v-menu bottom
          offset-x
          v-model="uiShowMenu"
          :position-x="x"
          :position-y="y">
    <v-list dense>
      <template v-for="action in actions">
        <v-list-item @click="action.func">
          {{action.text}}
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: "DropDownActions",
    data () {
      return {
        uiShowMenu: false,
        x: 0,
        y: 0,
        isOwnerRow: false,
        actions: []
      }
    },
    mounted () {
      try {
        const vm = this
        this.$eventHub.$on(`menu-row-actions`, function (data) {
          try {
            vm.show(data.e)
            vm.k = data.k
            vm.actions = data.actions
          } catch (e) {

          }
        })
      } catch (e) {

      }
    },
    methods: {
      show (e) {
        try {
          e.preventDefault()
          this.uiShowMenu = false
          this.x = e.clientX
          this.y = e.clientY
          this.$nextTick(() => {
            this.uiShowMenu = true
          })
        } catch (e) {
        }
      },
      bookmark () {
        let vm = this
        this.$eventHub.$emit(`choose-row-bookmark-${vm.k}`, { k: vm.k })
      },
      delRow () {
        let vm = this
        this.$eventHub.$emit(`choose-row-delete-${vm.k}`, { k: vm.k })
      }
    }
  }
</script>

<style scoped>

</style>
