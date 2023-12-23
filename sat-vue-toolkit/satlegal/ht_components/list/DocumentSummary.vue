<template>
  <div>
    <v-row align-center row wrap>
      <v-col cols="8" style="word-break: break-all;">
        <span class="pointer">{{ name }}</span>
      </v-col>
      <v-col cols="4">
        <v-row class="align-center justify-end" v-if="!isdownload">
          <template v-slot:activator="{ on }">
            <v-btn
              @click="$emit('updateRateAttachment')"
              small
              class="ma-0 pointer"
              v-on="on"
              icon
            >
              <v-icon small :class="[rate ? 'orange--text' : '', 'pointer']"
                >star</v-icon
              >
            </v-btn>
          </template>
          <AttachmentsActions @removeAttachment="$emit('removeAttachment')" />
        </v-row>
        <v-row no-gutters class="align-center justify-end " v-else>
          <template v-slot:activator="{ on }">
            <v-btn
              :href="link"
              small
              class="ma-0 pointer"
              v-on="on"
              icon
              target="blank"
            >
              <v-icon small>save_alt</v-icon>
            </v-btn>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <span class="text--secondary pointer">{{ createAt | formatDMY }}</span>
  </div>
</template>

<script>
import AttachmentsActions from "../menus/AttachmentsActions";

export default {
  components: {
    AttachmentsActions
  },
  props: {
    name: String,
    createAt: String,
    rate: Boolean,
    link: String,
    isdownload: Boolean
  },
  methods: {
    changeStatusDocument(val) {
      this.$emit("changeStatusDocument", val);
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
