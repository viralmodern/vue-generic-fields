<template>
  <CurdModel :$$endpoint="endPointPermission">
    <template
      slot-scope="{
        data: members,
        loading: loadingParent,
        update: updateMemberRole
      }"
    >
      <v-card color="transparent" :loading="loadingParent">
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="submit">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="4">
                  Matter members
                </v-col>
                <v-col cols="12" md="4">
                  <CurdModel $$endpoint="/api/workspace/members/">
                    <template slot-scope="{ data: membersWorkspace }">
                      <v-autocomplete
                        label="Invite members"
                        :items="membersWorkspace"
                        item-value="user.pk"
                        item-text="user.email"
                        :item-disabled="itemInviteDisabled"
                        outlined
                        dense
                        hide-details
                      >
                      </v-autocomplete>
                    </template>
                  </CurdModel>
                </v-col>
                <v-col cols="8">
                  <v-divider />
                </v-col>
              </v-row>
              <v-row v-for="(item, index) in members" :key="item.user">
                <v-col cols="12" md="4">
                  <DataMember :pk="item.user">
                    <template slot-scope="{ data: member, loading }">
                      <v-text-field
                        hide-details
                        dense
                        outlined
                        readonly
                        v-model="member.email"
                        label="Matter member"
                      >
                      </v-text-field>
                    </template>
                  </DataMember>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    dense
                    :loading="loadingParent"
                    v-model="item.role"
                    required
                    hide-details
                    label="Role"
                    item-disabled="2"
                    @change="
                      (val) =>
                        updateMemberMatterRole({
                          data: { role: val },
                          user: item.user
                        })
                    "
                    outlined
                    :items="roles"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="list.length">
                <v-col cols="12" md="8">
                  <div class="d-flex">
                    <v-spacer />
                    <v-btn type="submit" color="primary" :disabled="!valid"
                      >Send invite</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </CurdModel>
</template>

<script>
import userRole from '../../../mixins/mx_userRole'
import _ from 'lodash'
import mx_emailRules from '../../../mixins/mx_emailRules'
import { v4 as uuid } from 'uuid'
import CurdModel from '../../../features/generic-fields/components/CurdModel'
import DataMember from '../../../components/utils/DataMember'

export default {
  props: {
    matterId: {
      // type: [Number, String]
    }
  },
  components: { DataMember, CurdModel },
  data: () => ({
    valid: false,
    email: '',
    list: []
  }),
  mixins: [userRole, mx_emailRules],
  computed: {
    roles() {
      return [
        {
          text: 'ADMIN',
          value: this.$$ROLES.ADMIN
        },
        {
          text: 'EMPLOYEE',
          value: this.$$ROLES.EMPLOYEE
        },
        {
          text: 'OWNER',
          value: this.$$ROLES.OWNER
        },
        {
          text: 'STAFF',
          value: this.$$ROLES.STAFF
        }
      ]
    },
    endPointPermission() {
      // return `/api/workspace/members/`
      return `/api/matters/${this.matterId}/members/`
    }
  },
  methods: {
    submit() {
      return false
    },
    addRow() {
      this.list.unshift({
        pk: uuid(),
        email: '',
        role: this.$$ROLES.EMPLOYEE
      })
      return false
    },
    updateMemberMatterRole({ data, user }) {
      let end = `/api/matters/${this.matterId}/members/${user}/`
      this.$axios.patch(end, { ...data })
    },
    itemInviteDisabled() {
      console.log('itemInviteDisabled', arguments)
    }
  }
}
</script>

<style scoped></style>
