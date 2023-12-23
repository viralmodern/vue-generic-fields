<template>
  <SelectMultiple
    :textTooltip="textTooltip"
    :icon="icon"
    class="custom"
    :value="single ? [value] : value"
    :list="listCharacters"
    :valid="valid"
    title="List"
    labelSearch="Search"
    name="character"
    :to="{ name: 'character', params: { projectId: 1 } }"
    keySearch="name"
    :isLoadingGet="isLoadingGet"
    :isLoadingUpdate="isLoadingUpdate"
    @select="select"
    @onOpenMenu="$emit('onOpenMenu')"
  >
    <template slot-scope="{ items }" slot="section">
      <v-tooltip v-for="item in items" :key="item.id" bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <UserAvatar
              class="mx-1"
              :avatarSize="25"
              :imageUrl="(item.avatar || {}).imageUrl"
              :name="item.name"
            />
          </span>
        </template>
        <span>{{ item.name || "" }}</span>
      </v-tooltip>
    </template>
    <template slot-scope="{ item }" slot="item">
      <v-list-item-avatar class="border mr-3">
        <v-icon v-if="item.check">done</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row no-gutters class="align-center" style="width:100%">
          <v-col cols="2" class="pr-2">
            <UserAvatar
              :avatarSize="30"
              :imageUrl="(item.avatar || {}).imageUrl"
              :name="item.name"
            />
          </v-col>
          <v-col cols="10">
            <div>{{ item.name }}</div>
            <div class="caption text--secondary">
              {{ (item.avatar || {}).email }}
            </div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </template>
    <template slot="searchNoResult">
      <slot name="searchNoResult"></slot>
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
    value: [Array, String, Number],
    listCharacters: Array,
    single: Boolean,
    icon: String,
    textTooltip: String,
    valid: Boolean,
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isChooseInMeeting: Boolean
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if(this.single) {
        data = this.selectSingle(check, idSelect);
      }
      if(this.isChooseInMeeting) {
        data = this.selectInMeetings(check, idSelect);
      } else {
        data = this.selectMultiple(check, idSelect);
      }
      this.$emit("select", data);
      if(check) {
        this.$emit("removeRow", idSelect);
      } else {
        this.$emit("selectRow", idSelect);
      }
    },
    selectMultiple(check, idSelect) {
      let data;
      if (check) {
        console.log(this.value, 'this.value');
        
        data = (this.value || []).filter(id => id !== idSelect);
      } else {
        data = [...this.value, idSelect];
      }
      return data;
    },
    selectInMeetings(check, idSelect) {
      let data;
      if (check) {
        data = {
          type: "remove",
          membersId: (this.value || []).filter(id => id !== idSelect),
          isRemove: idSelect
        };
      } else {
        data = {
          type : "select",
          membersId: [...this.value, idSelect]
        };
      }
      return data;
    },
    selectSingle(check, idSelect) {
      let data;
      if (check) {
        data = null;
      } else {
        data = idSelect;
      }
      return data;
    }
  }
};
</script>

<style scoped>
.custom {
  align-items: center;
  flex-wrap: wrap;
}
.border {
  height: 30px !important;
  min-width: 30px !important;
  width: 30px !important;
  border: 1px solid silver;
}
</style>
