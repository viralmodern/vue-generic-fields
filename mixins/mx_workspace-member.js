export default {
  methods: {
    $_member(ID) {
      try {
        return this.$store.getters['workspace/findMemberByID'](ID)
      } catch (e) {
        return null
      }
    },
    $_labelMember(ID) {
      try {
        let u = this.$store.getters['workspace/findMemberByID'](ID)
        return u.name || u.username || u.email || `@${u.userID}` || `@${ID}`
      } catch (e) {
        console.log(e.message)
        return 'N/A'
      }
    },
    $_labelTask(ID) {
      let u = this.$store.getters['workspace/findTaskByID'](ID)
      try {
        return u.name
      } catch (e) {
        return `#${ID}`
      }
    }
  }
}
