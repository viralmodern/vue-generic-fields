<template>
  <div>
    <div>
      <slot name="handle"></slot>
    </div>
    <div>
      <slot :data="openContent" name="content">Put your contents here</slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openContent: false
    }
  },
  methods: {
    open() {
      this.openContent = true
      // this.$refs.details.setAttribute("open", "")
    },
    close() {
      this.openContent = false
      // this.$refs.details.removeAttribute("open")
    },
    popupToggled() {
      // const isOpen = this.$refs.details.getAttribute("open") !== null ? true : false
      this.$emit('popup-toggled', this.openContent)
    }
  }
}
</script>

<style scoped></style>
