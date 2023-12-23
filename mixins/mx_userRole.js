import { mapGetters } from 'vuex'
import { ROLES } from '~/utils/appConfigs'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      findRoleByWorkspaceMemberRole: 'appConfigs/findRoleByWorkspaceMemberRole'
    }),
    $$ROLES() {
      return ROLES
    }
  },
  //
  created() {},
  destroyed() {},
  methods: {
    $$_roleWorkSpaceMember(role) {
      return this.findRoleByWorkspaceMemberRole(role)
    }
  },
  filters: {}
}
