<template>
  <v-card
    light
    max-width="600"
    :loading="saving"
    :width="600"
    max-height="85vh"
    style="position: relative;"
    class="d-flex flex-column"
  >
    <v-card-title>
      <!--        <v-icon left style="opacity: 0;">access_time</v-icon>-->
      <span class="text-h5 pl-8">Create Meeting</span>
      <v-spacer />
      <v-btn
        v-if="edit"
        icon
        small
        color="error"
        @click="del"
        class="text-capitalize"
        :loading="saving"
        :disabled="saving"
      >
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon top right @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="flex-grow-1 overflow-y-auto">
      <div class="d-flex">
        <v-icon left style="opacity: 0;">mdi-timer</v-icon>
        <div class="flex-grow-1">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="name"
                hide-details
                dense
                label="Meeting name"
                autofocus
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex">
        <v-icon left>mdi-timer</v-icon>
        <div class="flex-grow-1">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    ref="inputTimelInvite"
                    dense
                    single-line
                    hide-details
                    v-model="date"
                    placeholder="Date"
                    :error="errorDateTime"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :min="minDate"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-menu
                ref="menu2x"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    placeholder="HH : MM"
                    readonly
                    dense
                    single-line
                    hide-details
                    :error="errorDateTime"
                    hint="Meeting date must be in the future"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  @click:minute="$refs.menu2x.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex">
        <v-icon left style="opacity: 0;">mdi-map-marker</v-icon>
        <div class="flex-grow-1">
          Meeting date must be in the future
        </div>
      </div>
      <div class="d-flex">
        <v-icon left>mdi-map-marker</v-icon>
        <div class="flex-grow-1">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="Location"
                v-model="location"
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex align-center">
        <div class="flex-grow-1">
          <v-row>
            <v-col cols="12" sm="8" md="8">
              <v-list two-line dense class="py-0 mt-n1">
                <v-menu offset-x :close-on-content-click="false" absolute>
                  <template v-slot:activator="{ on }">
                    <v-list-item dense style="min-height: unset;" v-on="on">
                      <v-list-item-avatar
                        style="margin-bottom: 0; font-size: 75%;"
                        class="my-0 text-center justify-center white--text text-uppercase"
                        color="teal"
                        size="25"
                      >
                        <v-icon color="white">mdi-plus</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          Invite member
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >member@mail.com, invite your
                          friend</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <members-list
                    @change="(val) => changeMember(val)"
                    :value="members"
                  />
                </v-menu>
                <template v-for="(item, index) in members">
                  <template v-if="item">
                    <v-divider
                      v-if="index !== 0"
                      :key="'drv_l_meeting-' + index"
                      class="my-0"
                      :inset="true"
                    ></v-divider>
                    <v-hover
                      :key="'mb_l_meeting-' + item.user.pk"
                      v-slot:default="{ hover }"
                    >
                      <v-list-item dense style="min-height: unset;">
                        <v-list-item-avatar
                          style="margin-bottom: 0; font-size: 75%;"
                          class="my-0 text-center justify-center white--text text-uppercase"
                          color="teal"
                          size="25"
                        >
                          <v-img
                            v-if="item.user.avatar"
                            :src="item.user.avatar"
                          />
                          <template v-else>{{
                            item.user.name | $$strName
                          }}</template>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.user.username }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            v-text="item.user.email"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            icon
                            small
                            :style="{ opacity: hover ? '1' : '0' }"
                            @click.stop="removeMember(item)"
                          >
                            <v-icon small>close</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-hover>
                  </template>
                </template>
              </v-list>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="d-flex">
        <v-icon left class="align-self-start pt-2"
          >mdi-format-align-left</v-icon
        >
        <div class="flex-grow-1">
          <v-row>
            <!--<v-col cols="12" sm="12" md="12">
              <div style="border: solid 1px rgba(0,0,0,0.1)">
                <quill-discussion @promptFilePicker="onPromptFilePicker"
                                  :hideFileUpload="true"
                                  placeholder="Description"
                                  :submitOnEnter="false"
                                  :toolBar="true"
                                  @change="submitComment"/>
              </div>
            </v-col>-->
          </v-row>
        </div>
      </div>
    </v-card-text>
    <v-card-text class="d-flex">
      <div class="flex-grow-1"></div>
      <v-btn
        v-if="edit"
        color="primary"
        @click="save"
        class="text-capitalize"
        :loading="saving"
        :disabled="saving"
      >
        Save
      </v-btn>
      <v-btn
        v-else
        color="primary"
        @click="save"
        class="text-capitalize"
        :loading="saving"
        :disabled="saving"
        >Save
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'FormAddMeeting',
  data() {
    return {
      menu: false,
      menu2: false,

      members: [],

      name: '',
      location: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: null,
      errorDateTime: false,

      desc: '',
      saving: false,
    }
  },
  props: {
    edit: Boolean,
    dataUpdate: Object,
  },
  methods: {
    /* ...mapActions({
         "addMeeting": "meeting/addMeeting",
         "updateMeeting": "meeting/updateMeeting",
     }),*/
    cancel() {
      // ...
      this.$emit('clickCancel')
    },
    async del() {},
    async save() {
      // todo check date future
      let payload = {},
        time = moment(this.date + ' ' + this.time).format(),
        members = [],
        result = null
      payload['name'] = this.name
      payload['location'] = this.location || 'No location'

      let isFutureTime = moment(time).isAfter(moment().format())
      console.log('isFutureTime', time)
      // Meeting date must be in the future.
      if (!isFutureTime && !this.edit) {
        this.$refs.inputTimelInvite.focus()
        return (this.errorDateTime = true)
      }
      this.errorDateTime = false
      if (!this.edit) {
        payload['time'] = time
      } else {
        if (moment(time).isAfter(moment().format())) {
          payload['time'] = time
        }
      }
      if (this.members.length > 0) {
        members = this.members.map((i) => i.user.pk)
        payload['members'] = members
      }
      if (this.desc) {
        payload['desc'] = this.desc
      }
      this.saving = true
      if (this.edit) {
        // result = await this.updateMeeting({meetingID: this.dataUpdate['pk'], payload})
      } else {
        // result = await this.addMeeting(payload);
      }

      this.saving = false
      if (result) {
        this.cancel()
      }
    },
    submitComment(desc) {
      this.desc = desc
    },
    onPromptFilePicker() {},
    changeMember(members) {
      this.members = [...this.members, ...members]
    },
    removeMember(mb) {
      let _index = this.members.findIndex((i) => i.user.pk === mb.user.pk)
      if (_index >= 0) {
        this.members.splice(_index, 1)
      }
    },
  },
  computed: {
    minDate() {
      return moment(Date.now()).format('YYYY-MM-DD')
    },
    timeValid() {
      return moment(this.date + ' ' + this.time).isAfter(moment().format())
    },

    titleValid() {
      return this.name.trim() && this.location.trim()
    },
    ...mapGetters({
      findMemberByID: 'workspace/findMemberByID',
    }),
  },
  watch: {},
  mounted() {
    if (this.edit) {
      try {
        console.log('this.dataUpdate', this.dataUpdate['members'])
        let time = this.dataUpdate['time']
        this.members = [...this.dataUpdate['members']].map((i) => {
          let mb = this.findMemberByID(i.pk)
          console.log('mb', mb)
          return _.assign({}, mb)
        })
        this.name = this.dataUpdate['name']
        this.location = this.dataUpdate['location']
        this.desc = this.dataUpdate['desc']
        this.time = moment(time).format('hh:mm')
        this.date = moment(time).format('YYYY-MM-DD')
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  beforeDestroy() {
    // reset component
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped>
.text_input_list:not(.error--text)
  /deep/
  > .v-input__control
  > .v-input__slot:before {
  border-color: transparent !important;
}
</style>
