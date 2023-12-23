<template>
  <div>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput />
        <div class="flex-grow-1"></div>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            @resetFields="({ fields }) => (headers = fields)"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <TableGrid
      :headers="fields"
      hide-default-header
      hide-default-footer
      :desserts="desserts"
    >
      <template v-slot:item.task_name="{ props: { row, item } }">
        <div style="width: 100px;">
          {{ item.task.name }}
        </div>
      </template>
      <template v-slot:item.taskboard="{ props: { row, item } }">
        <nuxt-link to="#">{{ item.taskboard.name }}</nuxt-link>
      </template>
      <template v-slot:item.task_id="{ props: { row, item } }">
        <nuxt-link to="#">#{{ item.task.pk }}</nuxt-link>
      </template>
      <template v-slot:item.description="{ props: { row, item } }">
        <v-edit-dialog large>
          <div style="min-width: 150px;">
            {{ item.description }}
          </div>
          <template v-slot:input>
            <div class="px-2">
              <v-textarea hide-details :value="item.description"> </v-textarea>
            </div>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.start_time="{ props: { row, item } }">
        <v-chip small>
          {{ $formatDateTime(item.start_time, 'MMMM Do YYYY, h:mm:ss a') }}
        </v-chip>
      </template>
      <template v-slot:item.active_time="{ props: { row, item } }">
        <v-chip small>
          {{ $formatDateTime(item.active_time, 'MMMM Do YYYY, h:mm:ss a') }}
        </v-chip>
      </template>
      <template v-slot:item.matter_member="{ props: { row, item } }">
        <LinkMember :ID="item.matter_member.pk">
          <div class="d-flex align-center">
            <AvatarItem
              :src="item.matter_member.avatar"
              :title="item.matter_member.name"
              class="mx-1"
            />
            <div class="mx-1"></div>
            <span class="text-caption text--underline-none text-no-wrap">
              {{ item.matter_member.name }}
            </span>
          </div>
        </LinkMember>
      </template>
      <template v-slot:item.action="{ props: { row, item } }">
        <div class="d-flex">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                small
                icon
                outlined
                title="Stop Timer"
              >
                <v-icon small>mdi-stop</v-icon>
              </v-btn>
            </template>
            <span>Stop Timer</span>
          </v-tooltip>

          <div class="mx-2"></div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                v-on="on"
                color="error"
                outlined
                icon
                title="Remove Timer"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            Remove Timer
          </v-tooltip>
        </div>
      </template>
    </TableGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import { members } from '../../../../../../mock/dummy'
import MenuShowHideFields from '../../../../controls/MenuShowHideFields'
import CustomizeFieldsTableGrid from '../../../../controls/CustomizeFieldsTableGrid'
import dateTime from '../../../../../../mixins/mx_dateTime'
import AvatarItem from '../../../../../utils/AvatarItem'
import LinkMember from '../../../../../utils/LinkMember'
import SearchInput from '../../../../../utils/SearchInput'

export default {
  name: 'GridTimersEntries',
  components: {
    SearchInput,
    LinkMember,
    AvatarItem,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
  },
  mixins: [dateTime],
  data() {
    return {
      headers: [
        { text: 'Task Name', value: 'task_name', active: true },
        { text: 'Taskboard', value: 'taskboard', active: true },
        { text: 'Task ID', value: 'task_id', active: true },
        { text: 'Matter member', value: 'matter_member', active: true },
        { text: 'Start Time', value: 'start_time', active: true },
        { text: 'Active Time', value: 'active_time', active: true },
        { text: 'Description', value: 'description', active: true },
        { text: 'Action', value: 'action', active: true },
      ],
      desserts: [
        {
          task: {
            pk: 34567,
            name: 'Licensed to Webstorm',
          },
          taskboard: {
            name: 'DONGA',
            pk: 7782,
          },
          matter_member: members[0],
          start_time: '2020-01-15T10:14:17+07:00',
          active_time: '2020-01-15T10:14:17+07:00',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam consectetur cum distinctio doloribus enim et\n' +
            '    illum impedit, magni pariatur quas rem sint, tempore voluptas voluptates. Placeat praesentium sequi veniam!',
        },
      ],
    }
  },
  computed: {
    fields: {
      get() {
        return this.headers.filter((hd) => hd.active)
      },
    },
  },
}
</script>

<style scoped></style>
