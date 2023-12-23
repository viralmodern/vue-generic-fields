<template>
  <div>
    <v-chip class="pa-0" v-for="item in listRelatedFacts" :key="item.od" label>{{item.title}}</v-chip>
    <MenuListFacts
      @select="select"
      :list="listFacts"
      title="List facts"
      labelSearch="Search facts..."
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuListFacts from "../menus/MenuListFacts";
export default {
  components: {
    MenuListFacts
  },
  props: {
    relatedFacts: Array
  },
  computed: {
    listRelatedFacts() {
      const map = [];
      (this.relatedFacts || []).forEach(item => {
        const populate = (this.dataFactsReSearch || []).find(j => j.id === item.pk);
        if (populate) map.push(populate);
      });
      return map;
    },
    listFacts() {
      const clone = JSON.parse(JSON.stringify(this.dataFactsReSearch || []));
      const list = clone.map(x => {
        if (x.characters) {
          const map = [];
          x.characters.forEach(user => {
            const populateCharacter = (this.character || []).find(
              j => j.id === user
            );
            if (populateCharacter) map.push(populateCharacter);
          });
          x.characters = map;
        }
        if ((this.relatedFacts.map(x => x.pk) || []).includes(x.id)) {
          x.check = true;
        } else {
          x.check = false;
        }
        return x;
      });
      return list;
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"])
  },
  methods: {
    select(data) {
      const { projectId, factId } = this.$route.params;
      const some = this.relatedFacts.some(x => x.pk === data.id);
      let related_facts;
      if (!some) {
        related_facts = [...this.relatedFacts.map(x => x.pk), data.id];
      } else {
        related_facts = this.relatedFacts.filter(x => x.pk !== data.id).map(x => x.pk);
      }
      this.updateFactsDetail({
        matterId: projectId,
        taskId: factId,
        body: {
          related_facts
        }
      });
    },
    ...mapActions("ht_store/project/research/facts", ["updateFactsDetail"])
  }
};
</script>
