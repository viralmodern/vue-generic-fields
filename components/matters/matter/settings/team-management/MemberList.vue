<template>
  <div>
    <v-data-table
      hide-default-header
      hide-default-footer
      :headers="headers"
      :items="membersMatter"
      :items-per-page="5"
      class="elevation-1"
    >
      <!--    header-->
      <!-- <template v-slot:item="{ item }">
         ROW=================={{item}}
       </template>-->
      <template v-slot:header="{ item }">
        <thead>
          <tr>
            <th
              style="border-bottom: solid 1px rgba(0,0,0,0.1); border-top: solid 1px rgba(0,0,0,0.1)"
              v-for="i in headers"
              :key="i.value"
            >
              <span class="text-no-wrap">{{ i.text }}</span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item.name="{ item }">
        {{ $_member(item.user)['name'] }}
      </template>
      <template v-slot:item.phone="{ item }">
        {{ $_member(item.user)['phone'] }}
      </template>
      <template v-slot:item.email="{ item }">
        {{ $_member(item.user)['email'] }}
      </template>
      <template v-slot:item.role="{ item }">
        <v-chip :color="$$_roleWorkSpaceMember(item.role)['detail']['color']">
          {{ $$_roleWorkSpaceMember(item.role)['label'] }}
        </v-chip>
      </template>
      <template v-slot:item.last_login="{ item }">
        <span class="text-no-wrap">
          {{ item.created | $formatFullDate }}
        </span>
      </template>
      <template v-slot:item.action="{ item }">
        <div class="text-no-wrap" v-if="item.role !== $$ROLES.OWNER">
          <v-btn
            icon
            @click="
              uiShowAction = $event
              rowActive = item
            "
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <actions-user
      v-if="uiShowAction"
      item-text="title"
      :items="actions"
      @changeMenu="changeActionMember"
      icon
      :event="uiShowAction"
    />
    <confirm-remove
      :dialog="uiShowConfirm"
      title="Remove members from matter?"
      @disagree="uiShowConfirm = false"
      @agree="uiDisagree"
    >
      Remove <code>{{ rowActive ? rowActive.name : '' }}</code> from matter,
      cannot access it anymore?
    </confirm-remove>
    <change-role-user
      :dialog="uiShowChangeRole"
      @disagree="uiShowChangeRole = false"
    >
      <p>
        <code>{{ rowActive ? rowActive.name : '' }}</code> <br />
      </p>
      <p class="mb-4">
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </p>
      <v-select
        :items="workspaceMemberRole"
        item-text="label"
        item-value="value"
        :value="roleSelected"
        :item-disabled="customDisabled"
        item-color="red"
        label="Roles"
      ></v-select>
    </change-role-user>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import userRole from '../../../../../mixins/mx_userRole'
import ActionsUser from './ActionsUser'
import ConfirmRemove from './ConfirmRemove'
import currentMatter from '../../../../../mixins/mx_matter'
import ChangeRoleUser from './ChangeRoleUser'
import workspaceMemberMixin from '@/mixins/mx_workspace-member'
export default {
  name: 'MemberList',
  components: { ChangeRoleUser, ConfirmRemove, ActionsUser },
  mixins: [userRole, currentMatter, workspaceMemberMixin],
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Last Login ', value: 'last_login' },
        { text: 'Action', value: 'action' }
      ],
      rowActive: null,
      uiShowAction: false,
      uiShowConfirm: false,
      uiShowChangeRole: false,
      actions: [
        { title: 'Revoke Access', icon: 'mdi-account-remove' },
        { title: 'Change Role ', icon: 'mdi-security' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      membersMatter: 'matter/members/members',
      workspaceMemberRole: 'appConfigs/workspaceMemberRole'
    }),
    members() {
      try {
        console.error('GHT1', this.membersMatter)
        if (this.membersMatter.length > 0) {
          this.membersMatter.map((mb) => {
            console.log('CC', mb.user, this.$_member(mb.user))
            return this.$_member(mb.user)
          })
        }
        return []
      } catch (e) {
        console.error('GHT', e.message)
        return []
      }
    },
    roleSelected() {
      try {
        return this.rowActive.role
      } catch (e) {
        return null
      }
    }
  },
  methods: {
    changeActionMember(item) {
      if (item['title'] === 'Revoke Access') {
        return (this.uiShowConfirm = true)
      }
      return (this.uiShowChangeRole = true)
    },
    async uiDisagree() {},
    async uiAgree() {
      try {
        let matterID = this.$$matterID,
          userID = this.rowActive.userID
        let rs = await this.$store.dispatch(
          'matter/members/deleteMemberMatter',
          { matterID, userID }
        )
        console.log('uiDisagree', rs)
      } catch (e) {
        console.log(e.message)
      }
    },
    customDisabled(items) {
      return items.value === this.$$ROLES.OWNER
    }
  }
}
</script>

<style scoped></style>
