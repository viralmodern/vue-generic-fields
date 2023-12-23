<template>
  <DetailsPopup ref="newBoardPopup">
    <template v-slot:handle>
      <v-btn
        @click="overlay = true"
        v-if="!isActiveBoard"
        depressed
        small
        class="text-capitalize"
        color="primary"
      >
        <v-icon small>mdi-plus</v-icon>
        New Board
      </v-btn>
      <template v-else class="d-flex align-center">
        <nuxt-link
          :to="`/matters/${
            $route.params.matter || $route.params.projectId
          }/caf/simple-taskboard`"
          class="text-capitalize text--underline-none text-subtitle-2"
        >
          All Board
        </nuxt-link>
        <v-btn icon small color="transparent">
          <v-icon small color="primary">mdi-chevron-double-right</v-icon>
        </v-btn>
        {{ activeBoard.name }}
      </template>
    </template>
    <template v-slot:content>
      <v-dialog :value="overlay" max-width="55%" persistent>
        <v-card light style="position: relative;">
          <v-card-title>
            <span class="text-h5">{{ heading }}</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSaveBoard">
              <v-text-field
                outlined
                dense
                type="text"
                v-model.trim="boardForm.name"
                autofocus
                @keyup.ctrl.enter="handleSaveBoard"
                label="Enter your board name*"
              >
              </v-text-field>
              <v-textarea
                outlined
                dense
                rows="2"
                v-model.trim="boardForm.description"
                @keyup.ctrl.enter="handleSaveBoard"
                label="Enter your board description"
              ></v-textarea>
              <ChooseColor v-model="boardForm.color" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="overlay = false"
              >Close
            </v-btn>
            <v-btn color="blue darken-1" text @click.prevent="handleSaveBoard"
              >Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </DetailsPopup>
</template>
<script>
import DetailsPopup from '../Details/DetailsPopup'
import { mapGetters, mapActions } from 'vuex'
import { Bus } from '../../utils/bus'
import ChooseColor from '../../../../components/utils/ChooseColor'
export default {
  name: 'TaskBoardEdit',
  components: {
    ChooseColor,
    DetailsPopup,
  },
  data() {
    return {
      boardForm: {
        id: '',
        pk: '',
        name: '',
        description: '',
        color: '',
      },
      overlay: false,
    }
  },
  mounted() {
    Bus.$on('taskboard-editing', this.handleTaskBoardEditing)
  },
  computed: {
    heading() {
      return this.boardForm.pk ? 'Update board' : 'Create new board'
    },
    boardID() {
      return this.$route.params.id
    },
    isActiveBoard() {
      try {
        return this.$route.params.id
      } catch (e) {
        console.log('this.$router', this.$route)
        return false
      }
    },
    activeBoard() {
      try {
        return this.$store.getters['da_taskboard/findBoardByID'](this.boardID)
      } catch (e) {
        return {}
      }
    },
  },
  watch: {
    overlay(isOpen) {
      if (!isOpen) {
        this.handleReset()
      }
    },
  },
  methods: {
    ...mapActions('da_taskboard', {
      saveTaskBoard: 'saveTaskBoard',
    }),
    handleTaskBoardEditing(board) {
      console.log('handleTaskBoardEditing', board)
      this.boardForm.id = board.pk
      this.boardForm.pk = board.pk
      this.boardForm.name = board.name
      this.boardForm.description = board.description
      this.boardForm.color = board.color
      // this.$refs.newBoardPopup.open()
      this.overlay = true
    },
    handleReset() {
      this.boardForm.pk = 0
      this.boardForm.id = 0
      this.boardForm.name = ''
      this.boardForm.description = ''
      // this.$validator.reset()
    },
    handleSaveBoard() {
      this.saveTaskBoard({
        id: this.boardForm.pk,
        pk: this.boardForm.pk,
        name: this.boardForm.name,
        description: this.boardForm.description,
        color: this.boardForm.color,
        matterID: this.$route.params.matter || this.$route.params.projectId,
      })
      this.overlay = false
    },
  },
}
</script>
