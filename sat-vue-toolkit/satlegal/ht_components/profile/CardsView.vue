<template>
  <div>
    <v-progress-linear
      :indeterminate="true"
      height="2"
      v-if="loading"
    ></v-progress-linear>
    <v-row no-gutters>
      <v-col
        cols="12"
        xl2
        lg="3"
        md4
        sm="6"
        v-for="item in dataProjects"
        :key="item.id"
      >
        <CardProject :item="item" />
      </v-col>
      <v-col cols="12">
        <v-row no-gutters class="justify-center">
          <v-btn
            @click="showMore"
            :loading="loading"
            class="ma-2"
            v-if="hasMoreItem"
            >View more</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
const pageSize = 20;
import CardProject from "../cards/CardProject";

export default {
  props: {
    dataProjects: Array,
    hasMoreItem: Boolean,
    loading: Boolean
  },
  data() {
    return {
      page: 0
    };
  },
  components: {
    CardProject
  },
  methods: {
    showMore() {
      const filter = { pageSize, page: ++this.page };
      this.$emit("getData", filter);
    }
  },
  mounted() {
    this.$emit("getData", { pageSize, page: 0 });
  },
  destroyed() {
    this.$emit("clearData");
  }
};
</script>
