<template>
  <div class="px-2">
    <div>
      <ImageResponsive
        v-if="checkLastDot"
        style="border-radius: 5px;"
        :imageUrl="imageUrl"
        minHeight="140"
        aspectRatio="2.75"
      />
      <v-row
        v-else
        style="height:140px;background:grey;border-radius: 5px;"
        class="justify-center align-center"
        no-gutters
      >
        <span class="title text--secondary text">{{ name }}</span>
      </v-row>
    </div>
    <div>
      <AttachmentsSummary
        :name="name"
        :createAt="createAt"
        :rate="rate"
        @removeAttachment="$emit('removeAttachment')"
        @updateAttachment="$emit('updateAttachment')"
        class="py-2"
        :link="link"
        :isDisabled="isDisabled"
      />
    </div>
  </div>
</template>

<script>
import ImageResponsive from "../images/ImageResponsive";
import AttachmentsSummary from "../list/AttachmentsSummary";
export default {
  components: {
    ImageResponsive,
    AttachmentsSummary
  },
  props: {
    imageUrl: String,
    name: String,
    createAt: String,
    rate: Boolean,
    link: String,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    checkLastDot() {
      const name = this.name
        .split(".")
        .pop()
        .toLowerCase();
      if (name === "jpeg" || name === "jpg" || name === "png") {
        return true;
      } else {
        return false;
      }
    },
    nameLastString() {
      return this.name.split("/").pop();
    }
  }
};
</script>

<style lang="scss" scoped>
  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
