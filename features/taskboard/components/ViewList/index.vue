<template>
  <div>
    <template v-for="(item, index) in lists">
      <TaskBoardHeaderList :key="`header_${item.pk}`" :item="item" />
      <TableGrid
        :key="`table_${item.pk}`"
        :headers="[
          { text: 'Name', value: 'text' },
          { text: 'Labels', value: 'labels' },
          { text: 'Action', value: 'action' },
        ]"
        :desserts="item.items"
        to-model="card.card"
        hide-default-header
        hide-default-footer
      >
        <template v-slot:item.text="{ props: { row, item } }">
          <div
            class="text-no-wrap cusor--pointer"
            @click="$eventHub.$emit('task-detail-dialog', item)"
          >
            {{ item.text }}
          </div>
        </template>
        <template v-slot:item.labels="{ props: { row, item } }">
          <div class="text-no-wrap">
            <ChipType
              v-for="label in item.labels"
              class="mx-1"
              :key="label"
              :text="label"
            />
          </div>
        </template>
      </TableGrid>
      <div :key="`add_row_${item.pk}`">
        <CreateNewRowGrid
          title="Task"
          @addRow="(val) => addRow({ val, list: item.pk })"
        />
      </div>

      <div
        v-if="index !== lists.length - 1"
        :key="`drive_${item.pk}`"
        class="mb-4"
      ></div>
    </template>
  </div>
</template>

<script>
import TableGrid from '../../../../components/utils/TableGrid.vue'
import mx_taskboard from '../../mixins/mx_taskboard'
import TaskBoardHeaderList from './TaskBoardHeaderList.vue'
import ChipType from '../../../../sat-vue-toolkit/components/ChipType.vue'
import CreateNewRowGrid from '@/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid.vue'
import { v4 as uuid } from 'uuid'
export default {
  name: 'ViewList',
  mixins: [mx_taskboard],
  data() {
    return {
      items: '',
    }
  },
  components: { CreateNewRowGrid, ChipType, TaskBoardHeaderList, TableGrid },
  methods: {
    addRow({ val, list }) {
      try {
        let _pk = uuid()
        const updatedItem = {
          id: _pk,
          pk: _pk,
          text: val.name,
          name: val.name,
        }
        let _data = {
          boardId: this.getBoard.pk,
          listId: list,
          matterID: this.$route.params.matter || this.$route.params.projectId,
          item: updatedItem,
        }
        console.log(val.name)
        this.$store.dispatch('da_taskboard/saveTaskListItem', _data)
        return false
      } catch (e) {
        console.log(e.message)
      }
    },
  },
}
</script>

<style scoped></style>
