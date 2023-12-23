<template>
  <div>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List Characters"
      :value="relatedCharacter"
      :list="character"
      name="Characters"
      keySearch="name"
      @select="update"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuListMembers from "../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    relatedCharacter: Array
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
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
      })
    }
  }
};
</script>
