<template>
  <SelectMultiple
    :textTooltip="textTooltip"
    :icon="icon"
    class="custom"
    :value="single ? [value] : value"
    :list="listData"
    :valid="valid"
    title="List"
    labelSearch="Search"
    name="Referral by Clients"
    keySearch="first_name"
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
              :imageUrl="item.avatar"
              :name="`${item.first_name} ${item.last_name}`"
            />
          </span>
        </template>
        <span>{{ item.first_name}} {{item.middle_name}} {{ item.last_name}}</span>
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
              :imageUrl="item.avatar"
              :name="`${item.first_name} ${item.last_name}`"
            />
          </v-col>
          <v-col cols="10">
            <div>{{ item.first_name }} {{item.middle_name}} {{ item.last_name}}</div>
            <div class="caption text--secondary">{{ item.email}}</div>
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
    pk: String,
    value: [Array, String, Number],
    listCharacters: Array,
    single: Boolean,
    icon: String,
    textTooltip: String,
    valid: Boolean,
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean
  },
  computed: {
    listData() {
      return this.listCharacters.filter(item => item.pk !== this.pk);
    }
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if (this.single) {
        data = this.selectSingle(check, idSelect);
      } else {
        data = this.selectMultiple(check, idSelect);
      }
      this.$emit("select", data);
      if (check) {
        this.$emit("removeRow", idSelect);
      } else {
        this.$emit("selectRow", idSelect);
      }
    },
    selectMultiple(check, idSelect) {
      let data;
      if (check) {
        data = (this.value || []).filter(id => id !== idSelect);
      } else {
        data = [...this.value, idSelect];
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
