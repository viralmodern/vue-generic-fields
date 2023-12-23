<template>
  <v-row  no-gutters>
    <v-col shrink>
      <PrivateMessageToolbar @changeGroupMessage="changeGroupMessage"/>
    </v-col>
    <v-col>
      <PrivateMessageInList :groupType="groupType"/>
    </v-col>
  </v-row>
</template>

<script>
import PrivateMessageToolbar from "../toolbars/PrivateMessageToolbar";
import PrivateMessageInList from "../cards/PrivateMessageInList";
export default {
  components: {
    PrivateMessageToolbar,
    PrivateMessageInList
  },
  data() {
    return {
      groupType: "all"
    };
  },
  methods: {
    changeGroupMessage(groupType) {
      this.groupType = groupType;
    }
  }
};
</script>
