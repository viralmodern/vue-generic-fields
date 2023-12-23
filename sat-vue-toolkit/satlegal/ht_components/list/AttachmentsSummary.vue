<template>
  <div>
    <v-row align-center row wrap>
      <v-col cols="8" style="word-break: break-all;">
        <a :href="link" class="pointer" target="blank">{{ name }}</a>
      </v-col>
      <v-col cols="4">
        <v-row no-gutters class="align-center justify-end" v-if="!isdownload">
          <template v-slot:activator="{ on }">
            <v-btn @click="$emit('updateRateAttachment')" small class="ma-0 pointer" v-on="on" icon>
              <v-icon small :class="[rate ? 'orange--text' : '', 'pointer']">star</v-icon>
            </v-btn>
          </template>
          <AttachmentsActions
            :isDisabled="isDisabled"
            @removeAttachment="$emit('removeAttachment')"
            @updateAttachment="$emit('updateAttachment')"
          />
        </v-row>
        <v-row no-gutters class="align-center justify-end" v-else>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              class="ma-0 pointer"
              icon
              @click="changeStatusDocument('approve')"
            >
              <v-icon small color="success">check</v-icon>
            </v-btn>
          </template>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              class="ma-0 pointer"
              icon
              @click="changeStatusDocument('reject')"
            >
              <v-icon small color="error">clear</v-icon>
            </v-btn>
          </template>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" :href="link" small class="ma-0 pointer" icon target="blank">
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
    isdownload: Boolean,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
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
  text-decoration: none;
}
</style>
