<template>
  <div>
    <AssignMembersModel
      cell-pk="docket-entry-assign-members"
      :return-object="true"
      :inner-scope="false"
      :end-point="endPoint"
      :items="matterMembersList"
      :value="membersList"
      is-owner-row
      attribute-name="members"
      item-text="name"
      item-avatar="avatar"
      item-value="user"
    >
      <template
        #default="{data: val, change, items, delMember: delMember, submitting, error }"
      >
        <v-card :loading="submitting" flat id="xxp">
          <div class="d-flex" title="Assign Members">
            <v-btn small icon @click="change">
              <v-icon small>mdi-account-multiple-plus</v-icon>
            </v-btn>
            <div>
              <div>
                <template v-for="member in val">
                  <div
                    v-if="member"
                    class="ma-1 position-relative box_avatar_hover"
                    :title="member.name"
                  >
                    <v-btn
                      absolute
                      top
                      right
                      x-small
                      @click.stop="delMember(member)"
                      icon
                      :width="15"
                      :height="15"
                      style="
                        z-index: 2;
                        top: -5px;
                        right: -5px;
                        background: #000;
                      "
                      dark
                      color="#000"
                      class="close_hover"
                    >
                      <v-icon x-small color="white">
                        mdi-close
                      </v-icon>
                    </v-btn>
                    <!--              <UserDetail :pk="member"/>-->
                    <v-avatar color="primary" size="25">
                      <template v-if="member.avatar">
                        <img :src="member.avatar" />
                      </template>
                      <div v-else class="white--text">
                        {{ member.name | $$strName }}
                      </div>
                    </v-avatar>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </v-card>
      </template>
    </AssignMembersModel>
  </div>
</template>

<script>
import keyBy from 'lodash/keyBy'
import { $$strName } from '@/sat-vue-toolkit/functions'
import AssignMembersModel from '@/sat-vue-toolkit/components/models/AssignMembersModel'

export default {
  name: 'DocketEntryAssignMembers',
  components: { AssignMembersModel },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      workspaceMembers: [],
      matterMembers: [],
    }
  },
  async mounted() {
    let { matter } = this.$route.params
    let resMembers = await this.$api.get(`/api/matters/${matter}/members/`)
    this.matterMembers = resMembers['data']

    let resMb = await this.$api.get(`/api/workspace/members/`)
    this.workspaceMembers = resMb['data']
  },
  computed: {
    endPoint() {
      try {
        return `/api/matters/${this.$route.params.matter}/docket-entries/${this.$route.params.docket}/members/`
      } catch (e) {
        return null
      }
    },
    matterMembersList() {
      return this.convertValToValuesObject(this.matterMembers)
    },
    membersList: {
      get() {
        return this.convertValToValuesObject(this.items)
      },
      set(v) {
        console.log('change-members', v)
        this.$emit('change-members', v)
      },
    },
  },
  methods: {
    convertValToValuesObject(items) {
      let workspaceMembers = keyBy(this.workspaceMembers, (mb) => mb.user.pk)
      return items.map((mb) => {
        let temp = {},
          user = mb.user
        if (workspaceMembers[mb.user]) {
          temp = {
            ...workspaceMembers[mb.user],
            ...workspaceMembers[mb.user]['user'],
          }
          delete temp['user']
          temp['user'] = user
          return temp
        }
        return mb
      })
    },
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped lang="scss">
.box_avatar_hover {
  &:hover {
    .close_hover {
      opacity: 1;
    }
  }
  .close_hover {
    opacity: 0;
  }
}
</style>
