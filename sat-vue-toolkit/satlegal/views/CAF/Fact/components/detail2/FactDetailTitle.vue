<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>mdi-message</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row no-gutters class="justify-center">
            <span class="text-h5 mouse">
              {{ title }}
              <v-icon small class="ml-2">mdi-create</v-icon>
            </span>
            <span class="subheading text--secondary">{{
              date | formatDMY
            }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-row right no-gutters>
        <MenuListMembers
          style="flex-wrap: unset;"
          title="List Characters"
          :value="characters"
          :list="members"
          name="Characters"
          keySearch="name"
          @select="update"
        />
      </v-row>
    </v-col>
    <v-col cols="1" text-xs-right class="mr-4">
      <v-btn
        :outlined="!mode"
        @click="$emit('clickScore')"
        :class="`ma-0 primary ${!mode ? 'primary--text' : ''}`"
      >
        <span>Score &nbsp;</span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import MenuListMembers from "../../../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    title: String,
    date: String,
    mode: Boolean,
    characters: Array,
    members: Array
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateFactsDetail"]),
    update(val) {
      const { projectId, factId } = this.$route.params;
      this.updateFactsDetail({
        matterId: projectId,
        taskId: factId,
        body: {
          characters: val
        }
      });
    }
  }
};
</script>

<style scoped>
.icon-mess {
  justify-content: center;
  align-items: center;
  display: flex;
}
.mouse {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.custom /deep/ .v-icon {
  padding: 0px;
}
</style>
