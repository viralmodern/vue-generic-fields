import { mapActions, mapGetters } from 'vuex'
import mx_genericFields from '~/features/generic-fields/mixins/mx_genericFields'

export default {
  props: {
    filter: {
      type: Object,
    },
  },
  mixins: [mx_genericFields],
  data() {
    return {
      to_model: 'card.card',
    }
  },
  computed: {
    ...mapGetters('da_taskboard', {
      unarchivedBoards: 'unarchivedBoards',
      archivedBoards: 'archivedBoards',
    }),

    ...mapGetters('da_taskboard', {
      boards: 'allBoards',
      isLoading: 'isLoading',
    }),

    getDragOptions() {
      return {
        animation: '200',
        ghostClass: 'ghost',
        handle: '.heading',
        disabled: !this.shouldAllowListOrder,
        group: 'kanban-board-lists',
        forceFallback: true,
        fallbackOnBody: true,
      }
    },
    shouldAllowListOrder() {
      return this.isDesktop || this.isTablet
    },
    param() {
      return this.$route.params.id
    },
    getBoard() {
      return this.boards.find((b) => b.pk == this.param)
    },
    lists: {
      get() {
        try {
          let attributes = this.$$getAttributesExitsGroupBy(this.to_model),
            lists = this.getBoard.lists.filter((l) => !l.archived)
          console.log({ attributes, lists })
          // return attributes
          return lists.filter((l) => !l.archived)
        } catch (e) {
          return []
        }
      },
      set(value) {
        try {
          this.reorderTaskLists({
            boardId: this.param,
            lists: value,
          })
        } catch (e) {}
      },
    },
  },

  methods: {
    ...mapActions('da_taskboard', {
      reorderTaskLists: 'reorderTaskLists',
      setActiveTaskBoard: 'setActiveTaskBoard',
    }),
    ...mapActions('da_taskboard', {
      // setActiveTaskBoard: 'setActiveTaskBoard',
      archiveTaskBoard: 'archiveTaskBoard',
      restoreTaskBoard: 'restoreTaskBoard',
    }),
    $openTaskDetail() {
      this.$eventHub.$emit('task-detail-dialog')
    },
  },
}
