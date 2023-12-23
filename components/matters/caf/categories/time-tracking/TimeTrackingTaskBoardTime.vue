<template>
  <div>
    <v-card>
      <v-card-title>
        <SearchInput placeholder="Search" />
        <div class="flex-grow-1"></div>
        <v-autocomplete
          :items="taskboard"
          item-text="name"
          return-object
          item-value="pk"
          v-model="active"
          outlined
          dense
          hide-details
          chips
          small-chips
          label="Choose Taskboard"
          multiple
        >
          <template v-slot:item="data">
            <v-list-item-content v-text="data.item.name"></v-list-item-content>
          </template>
        </v-autocomplete>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            @resetFields="({ fields }) => (headers = fields)"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <div class="mb-4"></div>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, i) in taskboard" :key="i">
        <v-expansion-panel-header class="expansion-custom">
          <div class="d-flex align-center">
            <v-icon color="primary">mdi-view-list</v-icon>
            <strong class="ml-2">{{ item.name }}</strong>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expansion-custom">
          <v-divider />
          <GridTaskBoardTime :headers="headers" :desserts="desserts" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import GridTaskBoardTime from './taskboard/GridTaskBoardTime'
import ChooseItems from '../../../../utils/ChooseItems'
import ChipType from '../../../../../sat-vue-toolkit/components/ChipType'
import SearchInput from '../../../../utils/SearchInput'
import MenuShowHideFields from '../../../controls/MenuShowHideFields'
import CustomizeFieldsTableGrid from '../../../controls/CustomizeFieldsTableGrid'
import { members } from '../../../../../mock/dummy'

export default {
  name: 'TimeTrackingTaskBoardTime',
  components: {
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    SearchInput,
    ChipType,
    ChooseItems,
    GridTaskBoardTime,
  },
  data() {
    return {
      headers: [
        { text: 'Task Name', value: 'task_name', active: true },
        { text: 'Taskboard', value: 'taskboard', active: true },
        { text: 'Task ID', value: 'task_id', active: true },
        {
          text: 'Original Estimate Time',
          value: 'original_estimate_time',
          active: true,
        },
        {
          text: 'Estimate Time Remaining',
          value: 'estimate_time_remaining',
          active: true,
        },
        { text: 'Time Logged', value: 'time_logged', active: true },
        { text: 'Variance', value: 'variance', active: true },
        {
          text: 'Original Estimate Remaining',
          value: 'original_estimate_remaining',
          active: true,
        },
        {
          text: 'Time in Stage',
          value: 'time_in_stage',
          active: true,
        },
        { text: 'Assignee Time', value: 'assignee_time', active: true },
        {
          text: 'Time Betweeen Stages',
          value: 'time_betweeen_stages',
          active: true,
        },
        { text: 'Action', value: 'action', active: true },
      ],
      desserts: [
        {
          taskboard: {
            pk: 7890,
            name: 'Log Taskboard 1',
          },
          task: {
            pk: 2549,
            name: 'Create timelog',
          },
          original_estimate_time: 1024,
          estimate_time_remaining: 960,
          time_logged: 4268,
          time_in_stage: {
            todo: 1234567,
            inprogress: 72,
            testing: 1234567,
            done: 1234567,
          },
          assignee_time: {
            23456: {
              total: 1234567,
              time_per: [
                {
                  member: members[0],
                  stages: [
                    {
                      pk: 'todo',
                      text: 'TO DO',
                      color: 'primary',
                      totals: [
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                      ],
                    },
                    {
                      pk: 'inprogress',
                      text: 'IN PROGRESS',
                      color: 'info',
                      totals: [
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                      ],
                    },
                  ],
                },
                {
                  member: members[1],
                  stages: [
                    {
                      pk: 'todo',
                      text: 'TO DO',
                      color: 'primary',
                      totals: [
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                      ],
                    },
                    {
                      pk: 'inprogress',
                      text: 'IN PROGRESS',
                      color: 'info',
                      totals: [
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                      ],
                    },
                    {
                      pk: 'done',
                      text: 'DONE',
                      color: 'success',
                      totals: [
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                        {
                          title: '23/Aug/18 1:11pm-23/Aug/18 3:28pm: 2h 17m',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            897: {
              total: 1234567,
              time_per: [],
            },
          },
          time_betweeen_stages: {
            1: {
              total: 21345,
              time_per: [
                {
                  1: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  2: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  3: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                },
              ],
            },
            2: {
              total: 4563,
              time_per: [
                {
                  1: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  2: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  3: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                },
              ],
            },
            3: {
              total: 2345678,
              time_per: [
                {
                  1: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  2: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                  3: {
                    // group_between
                    title: '48:25',
                    total: 234,
                  },
                },
              ],
            },
          },
        },
      ],
      taskboard: [
        {
          pk: 23432345,
          name: 'DONG A',
        },
        {
          pk: 345654,
          name: 'HT',
        },
        {
          pk: 65345,
          name: 'GOOGLE',
        },
      ],
      active: [],
    }
  },
}
</script>

<style scoped>
.expansion-custom >>> .v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
