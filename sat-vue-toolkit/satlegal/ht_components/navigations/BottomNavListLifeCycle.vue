<template>
  <v-row  no-gutters>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      color="transparent"
      class="custom-bottom-nav elevation-2"
    >
      <v-btn
        color="primary"
        :value="item.policyName"
        v-for="item in list"
        :key="item.id"
      >
        <FilingRoomAvatar
          heading="text-caption"
          :imageUrl="item.avatar"
          :size="35"
          :name="item.name"
          :text="item.policyName"
        />
      </v-btn>
    </v-bottom-nav>
  </v-row>
</template>

<script>
import FilingRoomAvatar from "../avatars/FilingRoomAvatar";

export default {
  components: {
    FilingRoomAvatar
  },
  props: {
    list: Array
  },
  data() {
    return {
      bottomNav: "CREATE"
    };
  },
  mounted() {
    this.$emit("click", this.bottomNav);
  },
  watch: {
    bottomNav(val) {
      this.$emit("click", val);
    }
  }
};
</script>

<style scoped>
.custom-bottom-nav /deep/ .v-btn {
  max-width: unset;
  min-width: unset;
  padding: 0px;
}
</style>
