<template>
  <SelectMultiple
    class="custom"
    :value="value"
    :list="list"
    :title="title"
    labelSearch="Search"
    :name="name"
    :to="to"
    :keySearch="keySearch"
    @select="select"
  >
    <template slot-scope="{ items }" slot="section">
      <v-tooltip v-for="item in items" :key="item.id" bottom>
        <template v-slot:activator="{ on }">
          <UserAvatar
            class="mx-1"
            v-on="on"
            :avatarSize="32"
            :imageUrl="(item.avatar || {}).imageUrl"
            :name="item.name"
          />
        </template>
        <span>{{item.name || ''}}</span>
      </v-tooltip>
    </template>
    <template slot-scope="{ item }" slot="item">
      <v-list-item-avatar class="border">
        <v-icon v-if="item.check">done</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row no-gutters class="align-center" style="width:100%">
          <v-col cols="2">
            <UserAvatar
              class="mx-1"
              :avatarSize="35"
              :imageUrl="(item.avatar || {}).imageUrl"
              :name="item.name"
            />
          </v-col>
          <v-col cols="10" class="ml-1">
            <div>{{item.name}}</div>
            <div class="caption text--secondary">{{(item.avatar || {}).email}}</div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </template>
  </SelectMultiple>
</template>

<script>
import SelectMultiple from "../inputs/SelectMultiple";
import UserAvatar from "../avatars/UserAvatar";

export default {
  components: {
    SelectMultiple,
    UserAvatar
  },
  props: {
    value: Array,
    list: Array,
    name: String,
    to: [Object, Array],
    keySearch: String,
    title: String
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = (this.value || []).filter(id => id !== idSelect);
      } else {
        data = [...this.value, idSelect];
      }
      this.$emit("select", data);
    }
  }
};
</script>

<style scoped>
.custom {
  align-items: center;
  flex-wrap: wrap;
}
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
