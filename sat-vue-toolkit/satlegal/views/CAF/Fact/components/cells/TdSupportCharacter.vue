<template>
  <td>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List Characters"
      :value="dataRow.characters"
      :list="character"
      name="Characters"
      keySearch="name"
      @select="update"
    />
  </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuListMembers from "../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    idGroup: [String, Number],
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateCharactersSupport"]),
    update(val) {
      const { projectId, factId } = this.$route.params;
      const isSome = this.dataRow.characters.some(
        x => x.user === val[val.length - 1]
      );
      if (!isSome && val.length > 0) {
        this.updateCharactersSupport({
          type: "add",
          characterId: val,
          matterId: projectId,
          itemId: this.dataRow.id,
          factId,
          supportId: this.idGroup
        })
      } else {
        this.updateCharactersSupport({
          type: "remove",
          characterId: this.dataRow.characters[0],
          matterId: projectId,
          itemId: this.dataRow.id,
          factId,
          supportId: this.idGroup
        })
      }
    }
  }
};
</script>
