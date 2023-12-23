<template>
  <td>
    <SelectInline
      :item="characterJoin"
      :items="character"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
      nudge-width="350"
    >
      <template slot="section" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <UserAvatar
              v-on="on"
              :avatarSize="32"
              :imageUrl="props.item.avatar.imageUrl || null"
              :name="props.item.avatar.name || ''"
            />
          </template>
          <span>{{ props.item.avatar.name }}</span>
        </v-tooltip>
      </template>
      <template slot="menu" slot-scope="props">
        <UserAvatar
          :avatarSize="32"
          :imageUrl="props.item.avatar.imageUrl || null"
          :name="props.item.avatar.name || ''"
        />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ props.item.avatar.name }}</span>
        <v-spacer></v-spacer>
        <v-icon v-if="props.item.id === characterJoin.id">mdi-done</v-icon>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../../menus/SelectInline";
import UserAvatar from "../../../avatars/UserAvatar";

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
    characterJoin() {
      return (
        (this.character || []).find(x => x.id === this.dataRow.respondent) || {}
      );
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    select({ id }) {
      if (id !== this.dataRow.respondent) {
        this.$emit("update", id);
      }
    }
  }
};
</script>
