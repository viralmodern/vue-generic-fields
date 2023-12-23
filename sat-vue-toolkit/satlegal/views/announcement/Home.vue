<template>
  <v-row no-gutters>
    <ListView />
    <div v-if="loading">
      <v-progress-linear height="2" :indeterminate="true"></v-progress-linear>
    </div>
    <div class="py-3">
      <v-pagination
        v-model="page"
        :length="totalPage"
        total-visible="7"
      ></v-pagination>
    </div>
  </v-row>
</template>

<script>
const pageSize = 20;
import { mapActions, mapGetters } from "vuex";
import ListView from "../../ht_components/announcement/ListView";
export default {
  components: {
    ListView
  },
  data() {
    return { page: 1 };
  },
  mounted() {
    this.doFilter({ pageSize, page: 1 });
  },
  methods: {
    ...mapActions("ht_store/announcement", ["doFilter"]) // eslint-disable-line
  },
  computed: {
    totalPage() {
      if (!this.totals) return 0;
      return Math.ceil(this.totals / pageSize);
    },
    ...mapGetters("ht_store/announcement", ["loading", "totals"]) // eslint-disable-line
  },
  watch: {
    page: {
      handler(v) {
        this.doFilter({ pageSize, page: v });
      }
    }
  }
};
</script>
