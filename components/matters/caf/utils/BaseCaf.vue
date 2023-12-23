<template>
  <div>
    <template v-if="assignMember">
      <invite-members-caf></invite-members-caf>
    </template>
    <div v-show="!assignMember">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import InviteMembersCaf from "./InviteMembersCaf";
export default {
  name: "BaseCaf",
  components: {InviteMembersCaf},
  data() {
    return {
      assignMember: false,
    }
  },
  mounted() {
    const {params: {matter}, query: {members}} = this.$route
    if (matter && typeof members !== "undefined") {
      this.assignMember = true
    }
  },
  watch: {
    $route(n) {
      const {params: {matter}, query: {members}} = n
      if (matter && typeof members !== "undefined") {
        this.assignMember = true
      }else {
        this.assignMember = false
      }
    }
  }
}
</script>

<style scoped>

</style>
