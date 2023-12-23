<template>
  <v-card flat color="transparent">
    <v-card-title class="px-0 pt-0">
      Members
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <div style="width: 450px;" class="d-flex">
        <v-text-field
          dense
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          flat
          solo
          background-color="#f5f5fa"
          single-line
          hide-details
        ></v-text-field>
        <DialogInviteMembersCaf />
      </div>
    </v-card-title>
    <v-data-table
      hide-default-footer
      hide-default-header
      flat
      :headers="headers"
      :items="workspaceMembers"
      :search="search"
      no-results-text="Member not found"
      class="elevation-1"
    >
      <template v-slot:item.user="{ item }">
        <v-list-item class="pl-0">
          <v-list-item-avatar>
            <v-avatar color="indigo" :size="30">
              <img v-if="item.hasAvatar" :src="item.avatar" alt="" />
              <span class="white--text font-weight-bold" v-else>
                {{ item.name | $$strName }}
              </span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:item.role="{ item }">
        <v-chip color="secondary" dark v-if="item.role === 1">Owner</v-chip>
        <v-chip color="primary" dark v-if="item.role === 2">Member</v-chip>
        <v-chip color="accent" dark v-if="item.role === 3">Guest</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn depressed small color="secondary" class="text-capitalize mr-2">
          <v-icon left>remove_circle</v-icon>
          Remove
        </v-btn>
        <v-btn depressed small color="success" class="text-capitalize">
          <v-icon left>exit_to_app</v-icon>
          Leave
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DialogInviteMembersCaf from './DialogInviteMembersCaf'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'InviteMembersCaf',
  components: { DialogInviteMembersCaf },
  filters: {
    $$strName,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'User',
          align: 'left',
          sortable: false,
          value: 'user',
        },
        { text: 'Role', value: 'role' },
      ],
    }
  },
  methods: {
    ...mapActions('workspace', ['getMembers']),
    getColor(calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    },
  },

  computed: {
    ...mapGetters('workspace', ['workspaceMembers']),
  },
}
</script>

<style scoped>
.table_list_custom /deep/ .v-data-table-header th {
  box-shadow: none !important;
  font-size: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.table_list_custom /deep/ .v-data-table-header {
  /*border-color: transparent !important;*/
}

.chip_ellipsis /deep/ .v-chip__content {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table_list_custom /deep/ .v-data-footer {
  margin-right: 0px;
}

.table_list_custom /deep/ tbody tr td {
}

.table_list_custom /deep/ tbody tr td,
.table_list_custom /deep/ .v-data-table-header th {
  white-space: nowrap;
}
.table_list_custom /deep/ tbody tr td > div,
.table_list_custom /deep/ .v-data-table-header th > div {
  /*border: solid 1px red;*/
}

/*#f4f5f7*/
.table_list_custom /deep/ .v-data-table-header th {
  border-color: transparent !important;
  /*box-shadow: unset !important;*/

  font-size: 14px;
  text-transform: none;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);

  position: sticky;
  top: 40px;
  border: solid 1px red;
}
</style>
