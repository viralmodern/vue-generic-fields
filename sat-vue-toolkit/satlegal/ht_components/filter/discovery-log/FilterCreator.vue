<template>
  <v-row no-gutters>
    <v-col cols="12">
      <SelectMultipleUser
        label="Creator"
        :user="creator"
        :users="members"
        @change="changeType"
        item-value="id"
        prepend-icon="mdi-magnify"
        itemText="avatar.name"
        itemImg="avatar.imageUrl"
      />
    </v-col>
  </v-row>
</template>
<script>
import SelectMultipleUser from "../../inputs/SelectMultipleUser";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    SelectMultipleUser
  },
  data() {
    return {
      creator: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  },
  mounted() {
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
  },
  methods: {
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    changeType(id) {
      this.creator = id;
      const data = {
        type: "creator",
        value: this.creator || ""
      };
      this.$emit("filterLog", data);
    }
  }
};
</script>
