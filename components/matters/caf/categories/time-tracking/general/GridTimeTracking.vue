<template>
  <div>
    <div class="d-flex">
      <div class="flex-grow-1"></div>
    </div>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search" />
        <v-spacer />
        <MenuGroupByTimeTracking />
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <v-card class="mb-2">
      <v-card-text>
        <div class="d-flex align-center">
          <div><strong>L320 Document Production</strong></div>
          <div class="flex-grow-1"></div>
          <div class="text-right">
            <strong>Total:</strong>
            <strong class="black--text text-h5">00:00:02</strong>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <TableGrid hide-default-header :headers="fields" :desserts="desserts">
      <template v-slot:item.added_on="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatDateTime(item.added_on, 'MMM Do YY, h:mm:ss a') }}
        </div>
      </template>
      <template v-slot:item.logged_by="{ props: { row, item } }">
        <div
          class="text-no-wrap d-flex align-center"
          :title="item.logged_by.name"
        >
          <AvatarItem
            size="20"
            :title="item.logged_by.name"
            :src="item.logged_by.avatar"
          />
          <div class="pl-2 text-caption">
            {{ item.logged_by.name }}
          </div>
        </div>
      </template>
      <template v-slot:item.taskboard="{ props: { row, item } }">
        <div>
          <ChooseItems
            label-header="All Taskboard"
            show-footer
            @click-footer="uiShowAddTaskBoard = true"
            label-footer="Taskboard"
          >
            <template v-slot:content="{ selected, on }">
              <div class="cusor--pointer d-flex align-center" v-on="on">
                <div class="flex-grow-1 text-no-wrap primary--text">
                  {{ selected | name }}
                </div>
                <v-icon right>mdi-chevron-down</v-icon>
              </div>
            </template>
          </ChooseItems>
        </div>
      </template>
      <template v-slot:item.task="{ props: { row, item } }">
        <div>
          <ChooseItems
            label-header="All Task"
            show-footer
            @click-footer="uiShowAddTask = true"
            label-footer="Task"
          >
            <template v-slot:content="{ selected, on }">
              <div class="align-center d-flex cusor--pointer" v-on="on">
                <div class="flex-grow-1 text-no-wrap primary--text">
                  {{ selected | name }}
                </div>
                <v-icon right>mdi-chevron-down</v-icon>
              </div>
            </template>
          </ChooseItems>
        </div>
      </template>
      <template v-slot:item.description="{ props: { row, item } }">
        <v-edit-dialog large>
          <div style="width: 120px">
            {{ item.description }}
          </div>
          <template v-slot:input>
            <v-card flat>
              <v-card-text>
                <v-textarea hide-details :value="item.description" />
              </v-card-text>
            </v-card>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.comment="{ props: { row, item } }">
        <v-edit-dialog large>
          <div style="width: 120px">
            {{ item.comment }}
          </div>
          <template v-slot:input>
            <v-card flat>
              <v-card-text>
                <v-textarea hide-details :value="item.comment" />
              </v-card-text>
            </v-card>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.activities_code="{ props: { row, item } }">
        <v-edit-dialog>
          <div class="d-flex align-center">
            <div class="flex-grow-1">
              {{ getActivitiesCode(item.activities_code).text }} -
              {{ getActivitiesCode(item.activities_code).code }}
            </div>
            <v-icon right>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <ChooseItems
              :create-new-search="false"
              :items="ACTIVITIES_CODE"
              item-text="text"
              item-value="code"
              @change="(data) => updateActivitiesCode({ row, data })"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.litigation_code="{ props: { row, item } }">
        <v-edit-dialog>
          <div class="d-flex align-center">
            <div class="flex-grow-1">
              {{ getLigationCode(item.litigation_code).name }}
            </div>
            <v-icon right>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <ChooseItemsTree
              :items="LITIGATION_CODE"
              @change="({ items }) => updateLitigationCode({ row, items })"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.source="{ props: { row, item } }">
        <template v-if="item.type_tracking === 1">
          <div class="legal_box_select white">
            <strong>00:00:00</strong>
          </div>
        </template>
        <v-edit-dialog v-else>
          <div class="legal_box_select white">
            <strong>00:00:00</strong>
          </div>
          <template v-slot:input>
            <v-card flat>
              <v-card-text>
                <v-text-field
                  @keyup.enter="changeSource"
                  v-mask="'##:##:##'"
                  placeholder="00:00:00"
                />
              </v-card-text>
            </v-card>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.start_time="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatDateTime(item.start_time, 'MMM Do YY, h:mm:ss a') }}
        </div>
      </template>
      <template v-slot:item.end_time="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatDateTime(item.end_time, 'MMM Do YY, h:mm:ss a') }}
        </div>
      </template>
      <template v-slot:item.client="{ props: { row, item } }">
        <v-edit-dialog>
          <div class="mr-2 d-flex align-center">
            {{ item.client | nameClient }}
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-autocomplete
              dense
              @change="(item) => changeClient({ row, item })"
              placeholder="Search clients"
              :items="clients"
              :value="item.client"
              solo
              autofocus
              hide-details
              return-object
              color="blue-grey lighten-2"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.logged_for="{ props: { row, item } }">
        <v-edit-dialog>
          <div class="mr-2 d-flex align-center">
            {{ item.logged_for | nameLoggedFor }}
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-autocomplete
              dense
              @change="(item) => changeLoggedFor({ row, item })"
              placeholder="Search clients"
              :items="members"
              :value="item.logged_for"
              solo
              hide-details
              item-value="value"
              item-text="name"
              return-object
              color="blue-grey lighten-2"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.duration="{ props: { row, item } }">
        {{
          $$diffTimeByDateTime({ start: item.start_time, end: item.end_time })
        }}
      </template>
      <template v-slot:item.labels="{ props: { row, item } }">
        <ChooseItems
          label-header="Labels"
          item-text="text"
          item-value="pk"
          multiple
          :value="item.labels"
          :items="item.labels"
        >
          <template v-slot:content="{ on, selected }">
            <div style="min-width: 250px" class="d-flex cusor--pointer">
              <div>
                <template v-for="(item, index) in selected">
                  <ChipType
                    small
                    :text="item.text"
                    :color="item.color"
                    class="mb-2 mr-2"
                    :key="`${index}`"
                  />
                </template>
              </div>
              <v-btn v-on="on" small icon style="border: dashed 1px #c1c2c3">
                <v-icon x-small color="#dcdcdc"> mdi-tag</v-icon>
                <!--<v-icon small>mdi-tag</v-icon>-->
              </v-btn>
            </div>
          </template>
        </ChooseItems>
      </template>
      <template v-slot:item.billable="{ props: { row, item } }">
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" title="Billable">
              <v-icon v-if="item.billable" color="success">mdi-check</v-icon>
              <v-icon v-else color="error">mdi-close-circle</v-icon>
            </v-btn>
          </template>
          <v-list dense shaped width="150">
            <v-subheader>Billable ?</v-subheader>
            <v-list-item
              @click="desserts[row].billable = true"
              link
              exact
              color="success"
              :input-value="item.billable"
            >
              <v-list-item-content>
                <v-list-item-title>Yes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="desserts[row].billable = false"
              link
              color="error"
              :input-value="!item.billable"
            >
              <v-list-item-content>
                <v-list-item-title>No</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.action="{ props: { row, item } }">
        <v-menu offset-y :close-on-content-click="false" transition>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense shaped width="150">
            <v-subheader>Action</v-subheader>
            <v-list-item link exact color="error">
              <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link exact>
              <v-list-item-content>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link exact>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-flag</v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </TableGrid>
    <v-dialog persistent v-model="uiShowAddTaskBoard" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Create New Taskboard
          <v-spacer />
          <v-btn icon @click="uiShowAddTaskBoard = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormQuickAddTaskBoard v-if="uiShowAddTaskBoard" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="uiShowAddTask" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Create New Task
          <v-spacer />
          <v-btn icon @click="uiShowAddTask = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormQuickAddTask v-if="uiShowAddTask" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import date_time from '../../../../../../mixins/mx_dateTime'
import code_fields from '../../../../../../mixins/mx_code-fields'
import TableGrid from '../../../../../utils/TableGrid.vue'
import MenuGroupByTimeTracking from './MenuGroupByTimeTracking.vue'
import SearchInput from '../../../../../utils/SearchInput.vue'
import MenuShowHideFields from '../../../../controls/MenuShowHideFields.vue'
import CustomizeFieldsTableGrid from '../../../../controls/CustomizeFieldsTableGrid.vue'
import AvatarItem from '../../../../../utils/AvatarItem.vue'
import ChipType from '../../../../../../sat-vue-toolkit/components/ChipType.vue'
import ChooseItems from '../../../../../utils/ChooseItems.vue'
import ChooseItemsTree from '../../../../../utils/ChooseItemsTree.vue'
import FormQuickAddTaskBoard from '../FormQuickAddTaskBoard.vue'
import FormQuickAddTask from '../FormQuickAddTask.vue'
import { clients, items_tracking, members } from '../../../../../../mock/dummy'
import { mask } from 'vue-the-mask'
import CreateNewRowGrid from '@/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid.vue'

export default {
  name: 'GridTimeTracking',
  mixins: [date_time, code_fields],
  directives: {
    mask,
  },
  components: {
    CreateNewRowGrid,
    FormQuickAddTask,
    FormQuickAddTaskBoard,
    ChooseItemsTree,
    ChooseItems,
    ChipType,
    AvatarItem,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    SearchInput,
    MenuGroupByTimeTracking,
    TableGrid,
  },
  data() {
    return {
      headers: [
        { text: 'Added On', value: 'added_on', active: true },
        { text: 'Logged By', value: 'logged_by', active: true },
        { text: 'Logged For', value: 'logged_for', active: true },
        { text: 'Taskboard', value: 'taskboard', active: true },
        { text: 'Task', value: 'task', active: true },
        { text: 'Description', value: 'description', active: true },
        { text: 'Comment', value: 'comment', active: true },
        { text: 'Activities Code', value: 'activities_code', active: true },
        { text: 'Litigation Code', value: 'litigation_code', active: true },
        { text: 'Source', value: 'source', active: true },
        { text: 'Start Time', value: 'start_time', active: true },
        { text: 'End Time', value: 'end_time', active: true },
        { text: 'Client', value: 'client', active: true },
        { text: 'Duration', value: 'duration', active: true },
        { text: 'Labels', value: 'labels', active: true },
        { text: 'Billable', value: 'billable', active: true },
        { text: 'Action', value: 'action', active: true },
      ],

      desserts: items_tracking,

      clients: clients,
      members: members,
      uiShowAddTaskBoard: false,
      uiShowAddTask: false,
    }
  },
  computed: {
    fields: {
      get() {
        return this.headers.filter((h) => h.active)
      },
      set() {},
    },
  },
  methods: {
    resetFields({ fields }) {
      this.headers = fields
    },
    getActivitiesCode(code) {
      return this.$$getActivitiesCode({ code })
    },
    getLigationCode(code) {
      return this.$$getLigationCode({ code })
    },
    updateActivitiesCode({ row, data }) {
      console.log('updateActivitiesCode', row, data.items)
      this.desserts[row].activities_code = data.items.code
    },
    updateLitigationCode({ row, items }) {
      console.log('updateLitigationCode', row, items)
      if (items.length) {
        try {
          let code = items[0]['id']
          this.desserts[row].litigation_code = code
        } catch (e) {}
      }
    },
    changeClient({ row, item }) {
      this.desserts[row].client = item
    },
    changeLoggedFor({ row, item }) {
      this.desserts[row].logged_for = item
    },
    changeSource({ row, e }) {
      // this.desserts[row].source =
      console.log('changeSource', arguments)
    },
  },
  filters: {
    name(list) {
      try {
        return '# ' + list[0].name
      } catch (e) {
        return 'N/A'
      }
    },
    nameClient(val) {
      try {
        return val.text
      } catch (e) {
        return 'N/A'
      }
    },
    nameLoggedFor(val) {
      console.error('nameLoggedFor', val)
      try {
        return val.name
      } catch (e) {
        return 'N/A'
      }
    },
  },
}
</script>

<style>
.v-data-table-header >>> th {
  white-space: nowrap;
}
</style>
