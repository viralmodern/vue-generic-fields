<template>
  <div>
    <v-btn
      color="primary"
      class="text-capitalize"
      @click="uiShowAddMember = true"
      >Add team members</v-btn
    >
    <dialog-picker
      :dialog="uiShowAddMember"
      text-agree="save"
      text-disagree="cancel"
      @disagree="uiShowAddMember = false"
      @agree="saveInvite"
      title="Invite team member"
    >
      <div class="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        earum nam nesciunt quo reiciendis
      </div>
      <div class="d-flex justify-space-between">
        <div class="flex-grow-1 mr-4">
          <autocomplete-list
            :items="workspaceMembers"
            placeholder="Members"
            text="name"
            multiple
            @change="change"
            :value="value"
            val="userID"
          />
        </div>
        <div style="width: 150px;">
          <v-select
            :items="[{ text: 'STAFF', value: 3 }]"
            :value="3"
            solo-inverted
            hide-details
            dense
            item-color="red"
            label="Roles"
          ></v-select>
        </div>
      </div>
    </dialog-picker>
  </div>
</template>

<script>
import DialogPicker from '../../../../utils/DialogPicker'
import AutocompleteList from '../../../../utils/AutocompleteList'
import { mapGetters } from 'vuex'
import userRole from '../../../../../mixins/mx_userRole'
import matter from '../../../../../mixins/mx_matter'

export default {
  name: 'AddTeamMember',
  components: { AutocompleteList, DialogPicker },
  mixins: [userRole, matter],
  data: () => ({
    uiShowAddMember: false,
    value: []
  }),
  computed: {
    ...mapGetters({
      workspaceMembers: 'workspace/workspaceMembers'
    })
  },
  methods: {
    change(items) {
      console.log(items)
      // addMemberToMatter
    },
    saveInvite() {
      let a = this.$$matterID
      // {userID, matterID, members}
      this.$store.dispatch('matter/members/addMemberToMatter', {
        matterID: this.$$matterID
      })
    }
  }
}
</script>

<style scoped></style>
