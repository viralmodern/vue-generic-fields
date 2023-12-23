<template>
  <td>
    <SelectInline
      v-if="dataClient.length > 0"
      :item="clientJoin"
      :items="dataClient"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
      nudge-width="250"
    >
      <template slot="section" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <UserAvatar
              v-on="on"
              :avatarSize="32"
              :imageUrl="props.item.user.imageUrl || null"
              :name="props.item.user.name || ''"
            />
          </template>
          <span>{{ props.item.user.name }}</span>
        </v-tooltip>
      </template>
      <template slot="menu" slot-scope="props">
        <UserAvatar
          :avatarSize="32"
          :imageUrl="props.item.user.imageUrl || null"
          :name="props.item.user.name || ''"
        />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ props.item.user.name }}</span>
        <v-spacer></v-spacer>
        <v-icon v-if="props.item.id === clientJoin.id">done</v-icon>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../menus/SelectInline";
import UserAvatar from "../../avatars/UserAvatar";

export default {
  components: {
    SelectInline,
    UserAvatar
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    clientJoin() {
      return (
        (this.dataClient || []).find(
          x => x.id === this.dataRow[this.column.name]
        ) || {}
      );
    },
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  methods: {
    select({ id }) {
      if (id !== this.dataRow[this.column.name]) {
        this.$emit("update", id);
      }
    }
  }
};
</script>
