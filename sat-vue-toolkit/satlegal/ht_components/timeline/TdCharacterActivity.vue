<template>
  <td>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List Characters"
      :value="dataRow.characters.map(x => x.pk)"
      :list="character"
      name="Characters"
      keySearch="name"
      @select="select"
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
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "addCharacter",
      "removeCharacter"
    ]),
    select(val) {
      const isSome = this.dataRow.characters.some(
        x => x.pk === val[val.length - 1]
      );
      const { projectId, timelineId } = this.$route.params;
      if (!isSome && [val[val.length - 1]][0] !== undefined) {
        this.addCharacter({
          matterId: projectId,
          timelineId,
          activitiesId: this.dataRow.id,
          body: {
            characters: [val[val.length - 1]]
          }
        });
      } else {
        var characters_id = this.dataRow.characters.filter(x => {
          return !val.includes(x.pk);
        });
        this.removeCharacter({
          timelineId,
          activitiesId: this.dataRow.id,
          matterId: projectId,
          characters_id: characters_id[0].pk
        });
      }
    }
  }
};
</script>
