<template>
  <DetailsPopup ref="newListPopup" v-show="activeBoard">
    <template v-slot:handle>
      <v-btn
        @click="overlay = true"
        depressed
        small
        class="text-capitalize"
        color="primary"
      >
        <v-icon small>mdi-plus</v-icon>
        New List
      </v-btn>
    </template>
    <template v-slot:content>
      <v-overlay :value="overlay">
        <v-card
          light
          style="position: relative;"
          max-width="600px"
          width="450px"
        >
          <v-card-title>
            <span class="text-h5">{{ heading }}</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleTaskListSave">
              <v-text-field
                type="text"
                v-model.trim="listForm.name"
                autofocus
                @keyup.ctrl.enter="handleTaskListSave"
                label="Enter your list name*"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="overlay = false"
              >Close</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="handleTaskListSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-overlay>
    </template>
  </DetailsPopup>
</template>
<script>
import DetailsPopup from '../Details/DetailsPopup'
import { mapGetters, mapActions } from 'vuex'
import { Bus } from '../../utils/bus'

export default {
  name: 'TaskListEdit',

  components: {
    DetailsPopup,
  },
  data() {
    return {
      listForm: {
        id: '',
        pk: '',
        name: '',
      },
      overlay: false,
    }
  },
  computed: {
    /*...mapGetters('da_taskboard', {
      activeBoard: 'activeBoard'
    }),*/
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ''
    },
    heading() {
      return this.listForm.pk ? this.listForm.name : 'Create new list'
      // return this.listForm.id ? 'Update list name' : 'Create new list'
    },
    activeBoard() {
      try {
        return this.$route.params.id
      } catch (e) {
        console.log('this.$router', this.$route)
        return false
      }
    },
    boardID() {
      try {
        return this.$route.params.id
      } catch (e) {
        return null
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
  mounted() {
    Bus.$on('tasklist-editing', this.handleTaskListEditing)
  },
  methods: {
    ...mapActions({
      saveTaskList: 'da_taskboard/saveTaskList',
    }),
    handleReset() {
      this.listForm.pk = 0
      this.listForm.name = ''
      // this.$validator.reset()
    },
    handleTaskListEditing(list) {
      this.overlay = true
      this.listForm.pk = list.pk
      this.listForm.name = list.name
    },
    handleTaskListSave() {
      // this.$validator.validateAll().then(async (result) => {
      this.saveTaskList({
        // boardId: this.activeBoard.id,
        boardId: this.boardID,
        listId: this.listForm.pk,
        name: this.listForm.name,
      })
      this.overlay = false
      // })
    },
  },
}
</script>
