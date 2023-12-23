<template>
  <div>
    <AppHeader />
    <v-row>
      <template v-for="board in unarchivedBoards">
        <v-col :key="board.pk" cols="12" md="3">
          <v-card
            :color="board.color"
            class="fill-height d-flex flex-wrap"
            dark
          >
            <v-card-text>
              <div class="board-item">
                <v-card-title class="pa-0">
                  <h5 style="font-weight: 700; font-size: 14px;">
                    {{ board.name }}
                  </h5>
                  <v-spacer></v-spacer>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn text v-on="on" icon small dense>
                        <v-icon small>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="handleTaskBoardEditing(board)">
                        <v-list-item-icon>
                          <v-icon small>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon small>mdi-eye</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Hide</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <div>
                  <v-progress-linear
                    :value="board.progress"
                    color="blue-grey"
                    height="15"
                    reactive
                  >
                    <template v-slot="{ value }">
                      <strong style="font-size: 75%;"
                        >{{ Math.ceil(value) }}%</strong
                      >
                    </template>
                  </v-progress-linear>
                </div>
                <div class="mb-4"></div>
                <div>
                  <v-chip
                    v-if="board.members.length"
                    :title="`${board.members.length} member`"
                  >
                    <v-icon left small>
                      mdi-account-multiple
                    </v-icon>
                    {{ board.members.length }}
                  </v-chip>
                </div>
                <div class="mb-4"></div>
                <!--                {{ board }}-->
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="">
                <v-btn
                  color="rgba(255,255,255,0.2)"
                  small
                  dense
                  depressed
                  class="text-capitalize"
                  dark
                  :to="`/matters/${
                    $route.params.matter || $route.params.projectId
                  }/caf/simple-taskboard/${board.pk}`"
                >
                  View
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
import { Bus } from '../utils/bus'
import AppHeader from '../components/AppHeader'
import mx_taskboard from '../mixins/mx_taskboard'
import mx_matter from '../../../mixins/mx_matter'

export default {
  name: 'FeatureDashboard',
  components: { AppHeader },
  mixins: [mx_taskboard, mx_matter],
  methods: {
    handleTaskBoardEditing(board) {
      Bus.$emit('taskboard-editing', board)
    },
    handleArchiveTaskBoard(board) {
      this.archiveTaskBoard({ boardId: board.pk })
    },
    handleRestoreTaskBoard(board) {
      this.restoreTaskBoard({ boardId: board.pk })
    },
  },
  async created() {
    await this.setActiveTaskBoard({ board: null })
    this.$store.dispatch('da_taskboard/fetchData', {
      matterID: this.$$matterID,
    })
  },
}
</script>
