export default {
  computed: {
    isOwnerRow () {
      try {
        let {val, item, ownerName, userAccount, disabledOwnerRow} = this
        if(Boolean(disabledOwnerRow)) return disabledOwnerRow
        ownerName = ownerName || 'creator'
        userAccount = userAccount || ''
        return item[ownerName] == userAccount
      }catch (e) {
        return false
      }
    }
  }
}
