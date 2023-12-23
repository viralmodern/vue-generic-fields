<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search label"/>
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy/>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <v-card flat>
      <v-card-text>
        <TableGrid hide-default-header :headers="fieldss" :desserts="desserts">
          <template v-slot:item.added_on="{ props: { row, item } }">
            <div class="text-no-wrap">
<!--              {{ $formatDateTime(item.added_on, 'MMM Do YY, h:mm:ss a') }}-->
              {{item.added_on}}
            </div>
          </template>
        </TableGrid>
      </v-card-text>

      <v-card-text>
        <ChooseColor/>
      </v-card-text>
      <v-card-text>
        <ChooseDatePicker/>
      </v-card-text>
      <v-card-text>
        <ChooseLevel/>
      </v-card-text>
      <v-card-text>
        <SwitchActivate/>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
  import TableGrid from "../../reuse-components/TableGrid";
  import ChooseColor from "../../reuse-components/ChooseColor";
  import MenuShowHideFields from "../../reuse-components/MenuShowHideFields";
  import CustomizeFieldsTableGrid from "../../reuse-components/CustomizeFieldsTableGrid";
  import {items_tracking} from "../../reuse-components/dummy";
  import MenuDropDownGroupBy from "../../reuse-components/MenuDropDownGroupBy";
  import SearchInput from "../../reuse-components/SearchInput";
  import ChooseLevel from "../../reuse-components/ChooseLevel";
  import SwitchActivate from "../../reuse-components/SwitchActivate";
  import ChooseDatePicker from "../../reuse-components/ChooseDatePicker";

  export default {
    components: {
      ChooseDatePicker,
      SwitchActivate,
      ChooseLevel,
      SearchInput, MenuDropDownGroupBy, CustomizeFieldsTableGrid, MenuShowHideFields, ChooseColor, TableGrid},
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
          { text: 'Action', value: 'action', active: true }
        ],
        desserts: items_tracking,
        groups: [

        ]
      }
    },
    computed: {
      fieldss: {
        get() {
          return this.headers.filter(h => h.active)
        },
        set() {}
      }
    },
    methods: {
      resetFields({fields}) {
        this.headers = fields
      },
    }
  }
</script>

<style scoped>

</style>
