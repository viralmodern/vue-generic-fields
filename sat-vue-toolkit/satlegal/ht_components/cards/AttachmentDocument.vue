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
        no-gutters
        v-else
        style="height:140px;background:grey;border-radius: 5px;"
        class="align-center justify-center"
      >
        <span class="title text--secondary">{{ nameLastString }}</span>
      </v-row>
    </div>
    <div>
      <AttachmentsSummary
        :name="name"
        :createAt="createAt"
        :isdownload="true"
        :link="link"
        class="py-2"
        @changeStatusDocument="changeStatusDocument"
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
    link: String
  },
  methods: {
    changeStatusDocument(e) {
      this.$emit("changeStatusDocument", e);
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
      return this.name.split(".").pop();
    }
  }
};
</script>
