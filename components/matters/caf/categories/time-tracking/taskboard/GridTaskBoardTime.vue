<template>
  <div>
    <TableGrid
      hide-default-header
      :headers="fields"
      :desserts="desserts"
      hide-default-footer
    >
      <template v-slot:header.time_in_stage>
        <table
          style="width: 100%; border-spacing: 0;"
          class="table_header_stacked"
        >
          <tr>
            <td :colspan="stages.length" class="text-center">
              Time in Stage
            </td>
          </tr>
          <tr>
            <td
              :style="'width: ' + 100 / stages.length + '%'"
              class="pa-0"
              v-for="(head, index) in stages"
              :key="index"
            >
              <div class="pa-2 text-center" style="width: 130px;">
                <v-chip label small :color="head.color">
                  {{ head.text }}
                </v-chip>
              </div>
            </td>
          </tr>
        </table>
      </template>
      <template v-slot:item.time_in_stage="{ props: { row, item } }">
        <div class="w-100 pa-1">
          <div class="d-flex align-content-center w-100">
            <div
              class="text-center"
              :style="'width: ' + 100 / stages.length + '%'"
              v-for="(stage, index) in stages"
              :key="index"
            >
              <div class="pa-2">
                <v-edit-dialog>
                  <div class="cusor--pointer">
                    {{ $formatTimeToDay(item.time_in_stage[stage['pk']]) }}
                  </div>
                  <template v-slot:input>
                    <v-card flat>
                      <v-card-text>
                        <table class="table-small-popup">
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Total time</th>
                              <th>Assignee</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tr v-for="i in 3" :key="i">
                            <td>
                              <v-chip
                                v-if="i === 1"
                                label
                                small
                                :color="stage.color"
                              >
                                {{ stage.text }}
                              </v-chip>
                            </td>
                            <td>
                              <div v-if="i === 1">24:00:30</div>
                            </td>
                            <td>
                              <nuxt-link to="#">User {{ i }}</nuxt-link>
                            </td>
                            <td>
                              12:23:40
                            </td>
                          </tr>
                        </table>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-edit-dialog>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:header.assignee_time>
        <table
          style="width: 100%; min-width: 200px;"
          class="table_header_stacked"
        >
          <tr>
            <td :colspan="members.length" class="text-center">
              Assignee Time
            </td>
          </tr>
          <tr>
            <td
              :style="'width: ' + 100 / members.length + '%'"
              class="text-caption text-center"
              v-for="member in members"
            >
              <v-avatar size="25" left color="primary" class="white--text">
                <v-img v-if="member.avatar" :src="member.avatar"></v-img>
                <span v-else>{{ member.name | $$strName }}</span>
              </v-avatar>
              {{ member.name }}
            </td>
          </tr>
        </table>
      </template>
      <template v-slot:item.assignee_time="{ props: { row, item } }">
        <table style="width: 100%;">
          <tr>
            <td
              class="text-center"
              :style="'width: ' + 100 / members.length + '%'"
              v-for="(member, index) in members"
              :key="index"
            >
              <v-edit-dialog>
                <div class="cusor--pointer">
                  {{ $formatTimeToDay(item.assignee_time[member['pk']].total) }}
                </div>
                <template v-slot:input>
                  <v-card flat>
                    <v-card-text class="">
                      <table class="table-small-popup">
                        <thead>
                          <tr>
                            <th>Assignee</th>
                            <th>Time per assignee</th>
                          </tr>
                        </thead>
                        <tr
                          v-for="(i, index) in item.assignee_time[member['pk']]
                            .time_per"
                          :key="index"
                        >
                          <td>
                            <div>
                              <nuxt-link to="#"
                                >User {{ i.member.username }}</nuxt-link
                              >
                            </div>
                          </td>
                          <td style="padding: 0px;">
                            <table class="" style="border-spacing: 0px;">
                              <tr
                                v-for="(item, index1) in i.stages"
                                :key="index1"
                              >
                                <td class="text-right">
                                  <v-chip label small :color="item.color">
                                    {{ item.text }}
                                  </v-chip>
                                </td>
                                <td>
                                  <template v-for="(item, idx) in item.totals">
                                    <div :key="idx">
                                      {{ item.title }}
                                    </div>
                                  </template>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </table>
      </template>

      <template v-slot:header.time_betweeen_stages>
        <table
          style="width: 100%; min-width: 200px;"
          class="table_header_stacked"
        >
          <tr>
            <td :colspan="stages_between.length" class="text-center">
              Time Betweeen Stages
            </td>
          </tr>
          <tr>
            <td
              :style="'width: ' + 100 / stages_between.length + '%'"
              class="text-caption text-center"
              v-for="stage in stages_between"
            >
              <div class="d-flex">
                <v-chip
                  label
                  small
                  :color="stage.start.color"
                  class="text-uppercase"
                  >{{ stage.start.text }}
                </v-chip>
                <v-icon x-small class="mx-1">mdi-chevron-double-right</v-icon>
                <v-chip
                  label
                  :color="stage.end.color"
                  small
                  class="text-uppercase"
                  >{{ stage.end.text }}
                </v-chip>
              </div>
            </td>
          </tr>
        </table>
      </template>
      <template v-slot:item.time_betweeen_stages="{ props: { row, item } }">
        <table style="width: 100%;">
          <tr>
            <td
              class="text-center"
              :style="'width: ' + 100 / stages_between.length + '%'"
              v-for="(stage, index) in stages_between"
              :key="index"
            >
              <v-edit-dialog>
                <div class="text-no-wrap">
                  {{
                    $formatTimeToDay(
                      item.time_betweeen_stages[stage['group_between']].total
                    )
                  }}
                </div>
                <template v-slot:input>
                  <v-card>
                    <v-card-text>
                      <table class="table-small-popup">
                        <thead>
                          <tr>
                            <td
                              class="text-uppercase"
                              v-for="(stage1, index1) in stages_between"
                              :key="index1"
                            >
                              <v-chip small>
                                <span>
                                  {{ stage1.start.text }}
                                </span>
                                <v-icon x-small class="mx-1"
                                  >mdi-chevron-double-right</v-icon
                                >
                                <span>
                                  {{ stage1.end.text }}
                                </span>
                              </v-chip>
                            </td>
                          </tr>
                        </thead>
                        <tr
                          v-for="(item1, index1) in item.time_betweeen_stages[
                            stage['group_between']
                          ].time_per"
                          :key="index1"
                        >
                          <td
                            v-for="(item11, index11) in stages_between"
                            :key="index11"
                          >
                            {{ item1[item11.group_between].title }}
                          </td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </table>
      </template>

      <template v-slot:item.taskboard="{ props: { row, item } }">
        <div class="text-no-wrap">
          <nuxt-link to="#">#{{ item.taskboard.name }}</nuxt-link>
        </div>
      </template>
      <template v-slot:item.task_name="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ item.task.name }}
        </div>
      </template>
      <template v-slot:item.task_id="{ props: { row, item } }">
        <div class="text-no-wrap">
          <nuxt-link to="#">#{{ item.task.pk }}</nuxt-link>
        </div>
      </template>
      <template v-slot:item.original_estimate_time="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatTimeToDay(item.original_estimate_time) }}
        </div>
      </template>
      <template v-slot:item.estimate_time_remaining="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatTimeToDay(item.estimate_time_remaining) }}
        </div>
      </template>
      <template v-slot:item.time_logged="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{ $formatTimeToDay(item.time_logged) }}
        </div>
      </template>
      <template v-slot:item.variance="{ props: { row, item } }">
        <div class="text-no-wrap">
          {{
            $formatTimeToDay(
              item.time_logged +
                item.estimate_time_remaining -
                item.original_estimate_time
            )
          }}
        </div>
      </template>
      <template
        v-slot:item.original_estimate_remaining="{ props: { row, item } }"
      >
        <div class="text-no-wrap">
          {{ $formatTimeToDay(item.original_estimate_time - item.time_logged) }}
        </div>
      </template>

      <template v-slot:item.action="{ props: { row, item } }">
        <v-edit-dialog>
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <template v-slot:input>
            <v-list dense shaped>
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
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
    </TableGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import dateTime from '../../../../../../mixins/mx_dateTime'
import { members } from '../../../../../../mock/dummy'
import AvatarItem from '../../../../../utils/AvatarItem'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'GridTaskBoardTime',
  components: { AvatarItem, TableGrid },
  mixins: [dateTime],
  filters: {
    $$strName,
  },
  data() {
    return {
      stages: [
        {
          pk: 'todo',
          text: 'TO DO',
          color: 'primary',
        },
        {
          pk: 'inprogress',
          text: 'IN PROGRESS',
          color: 'info',
        },
        {
          pk: 'testing',
          text: 'TESTING',
          color: 'warning',
        },
        {
          pk: 'done',
          text: 'DONE',
          color: 'success',
        },
      ],
      members: members,
      stages_between: [
        {
          start: {
            pk: 'todo',
            text: 'todo',
            color: 'primary',
          },
          end: {
            pk: 'done',
            text: 'done',
            color: 'success',
          },

          group_between: 1,
        },
        {
          start: {
            pk: 'todo',
            text: 'todo',
            color: 'primary',
          },
          end: {
            pk: 'inprogress',
            text: 'inprogress',
            color: 'info',
          },
          group_between: 2,
        },
        {
          start: {
            pk: 'todo',
            text: 'todo',
            color: 'primary',
          },
          end: {
            pk: 'done',
            text: 'DONE',
            color: 'success',
          },
          group_between: 3,
        },
      ],
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    desserts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    fields: {
      get() {
        return this.headers.filter((h) => h.active)
      },
      set() {},
    },
  },
}
</script>

<style scoped></style>
