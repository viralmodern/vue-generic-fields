<template>
  <v-row no-gutters fill-height>
    <v-col>
      <div>
        <v-row no-gutters class="my-2">
          <v-col cols="12">
            <v-btn
              text
              v-for="item in items"
              :key="item.id"
              class="text-capitalize mx-2"
              :to="`${item.link}`"
              active-class="primary--text"
            >{{ item.name }}</v-btn>
          </v-col>
        </v-row>
      </div>
      <router-view></router-view>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: "All requests", link: "all" },
        { id: 2, name: "Review requests", link: "review" }
      ]
    };
  }
};
</script>
