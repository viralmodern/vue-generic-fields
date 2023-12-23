<template>
  <v-container fluid>
  <v-expansion-panels
    class="v-expansion-panels--custom"
    multiple
    v-model="panel"
  >
    <v-expansion-panel
      v-for="(item, i) in [{text: 'Low', groupID: 1}, {text: 'Normal', groupID: 2}, {text: 'High', groupID: 3}]"
      :key="i">
      <v-expansion-panel-header>
        <div class="d-flex align-center">
          <div class="font-weight-bold">
            {{item.text}}
          </div>
          <div class="flex-grow-1"></div>
          <v-chip
            class="ml-2 text-body-2 badge"
            small
            style="position:sticky; right: 40px;"
          >
            <span class="font-weight-bold mr-2">{{groupData[item.groupID].results.length}} items</span>
          </v-chip>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <TableGrid hide-default-footer :headers="[{text: 'Name', value: 'text'}, {text: 'Group ID', value: 'value'}, ]"
                   :desserts="groupData[item.groupID].results">

        </TableGrid>
        <div class="d-flex align-center">
          <div class="flex-grow-1"></div>
          <v-btn @click="loadMore({groupID: item.groupID})"
                 color="primary"
                 text
                 class="mt-2"
                 style="text-transform: unset"
                 v-if="groupData[item.groupID].next">Load more
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-container>
</template>

<script>
  import TableGrid from "../../reuse-components/TableGrid";
  export default {
    name: "static-pagination",
    components: {TableGrid},
    data() {
      return {
        panel: [0],

        groupData: {
          1: { // low
            results: [
              {
                text: 'RTE',
                value: 654
              }
            ],
            next: 'url1',
          },
          2: { // Normal
            results: [
              {
                text: 'VUE',
                value: 253
              }
            ],
            next: null,
          },
          3: { // High
            results: [
              {
                text: 'REACT',
                value: 179
              }
            ],
            next: 'url1',
          },
        }
      }
    },
    methods: {
      async loadMore({groupID}) {
        // call api
        // let rs = await this.$axios.get(this.groupData.next)
        let rs = {
          results: [
            {
              text: 'IOT',
              value: 1024
            }
          ],
          next: null,
        };
        let results = rs.results, current_results = [...this.groupData[groupID].results]
        this.groupData[groupID].results = [...current_results, ...results];
        this.groupData[groupID].next = rs.next
      }
    }
  }
</script>

<style scoped>

</style>
