<template>
  <div>
    <autocomplete-list :items="workspaceMembers"
                       placeholder="Members"
                       text="name"
                       @change="change"
                       :value="value"
                       val="userID"/>
  </div>
</template>

<script>
import AutocompleteList from "../../../utils/AutocompleteList";
import {mapGetters} from 'vuex'

export default {
  name: "SettingTransferMatter",
  components: {AutocompleteList},
  data() {
    return {
      list: [],
      value: [],
    }
  },
  computed: {
    ...mapGetters({
      workspaceMembers: "workspace/workspaceMembers",

    })
  },
  methods: {
    change(items) {
      console.log('items', items)
    }
  }
}
</script>

<style scoped>

</style>
