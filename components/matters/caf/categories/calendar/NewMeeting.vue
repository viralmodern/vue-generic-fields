<template>
  <v-overlay
    :absolute="overlay.absolute"
    :opacity="overlay.opacity"
    :value="overlay.overlay"
    :z-index="overlay.zIndex"
  >
    <form-add-meeting
      :edit="isEdit"
      :dataUpdate="item"
      v-if="overlay.overlay"
      @clickCancel="clickCancel"
    />
  </v-overlay>
</template>

<script>
import FormAddMeeting from './FormAddMeeting'
export default {
  name: 'NewMeeting',
  components: {
    FormAddMeeting
  },
  data: () => ({
    isEdit: false,
    item: null,
    overlay: {
      absolute: false,
      opacity: 0.2,
      overlay: false,
      zIndex: 5
    }
  }),

  methods: {
    clickCancel() {
      this.overlay.overlay = false
    }
  },
  created() {
    let vm = this
    this.$eventHub.$on('clickAddMeeting', function({ evt, data }) {
      // eslint-disable-line
      try {
        if (data) {
          vm.isEdit = true
          vm.item = data
        } else {
          vm.isEdit = false
          vm.item = null
        }
        vm.overlay.overlay = true
      } catch (e) {
        console.log(e.message)
      }
    })
  },
  beforeDestroy() {
    this.isEdit = false
    this.item = null
  }
}
</script>

<style scoped></style>
