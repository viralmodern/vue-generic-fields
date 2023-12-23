<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-select
        :value="filters.value"
        :items="character"
        item-text="name"
        item-value="id"
        label="Assignee filter"
        return-object
        prepend-icon="search"
        placeholder="Assignee filter"
        multiple
        @change="changeAssignee"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0" class="chip--select-multi" small>
            <v-avatar>
              <UserAvatar
                :name="item.avatar.name"
                :imageUrl="item.avatar.imageUrl"
                :avatarSize="30"
              />
            </v-avatar>
            <span>{{item.avatar.nickName}}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text text-caption"
          >(+{{ filters.value.length - 1 }} others)</span>
        </template>
        <template slot="item" slot-scope="{item}">
          <UserAvatar :name="item.avatar.name" :imageUrl="item.avatar.imageUrl" :avatarSize="35"/>&nbsp;
          <span>{{item.avatar.name}}</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../../avatars/UserAvatar";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      filters: {
        value: []
      }
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    ...mapMutations("ht_store/matter/character/characterProfile/character", [
      "updateFilterValue"
    ]),
    changeAssignee(v) {
      var resultValue = v.length > 0 ? v : null;
      this.updateFilterValue({ filterName: "assignee", value: resultValue });
      this.filters.value = v;
    }
  }
};
</script>
