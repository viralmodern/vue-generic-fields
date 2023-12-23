<template>
  <v-container>
    <v-row>
      <v-col>
        <v-treeview :items="treeList" />
      </v-col>
      <v-col>
        <v-card flat max-height="50vh" class="overflow-y-auto">
          <json-viewer :value="strList" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  name: 'tree-to-list',
  components: {
    JsonViewer,
  },
  data() {
    return {
      strList: '',
      treeList: [],
    }
  },
  mounted() {
    this.getListOfTree()
  },
  methods: {
    async getListOfTree() {
      let a = await fetch('/json/usconstitution.full.json')
      let res = await a.json()
      this.treeList = [res]
    },
  },
}
</script>

<style scoped></style>
