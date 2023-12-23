<template>
  <div class="px-2">
    <div class="div-card" @click="$emit('selectMultiple', item)">
      <v-row no-gutters class="justify-end">
        <v-col cols="1">
          <v-icon color="primary" class="icon-check mt-2">{{
            item.isActive === true ? "mdi-check_circle" : "mdi-check_circle_outline"
          }}</v-icon>
        </v-col>
      </v-row>
      <ImageResponsive
        v-if="checkLastDot"
        style="border-radius: 5px"
        :class="`${item.isActive === true ? `img-check` : ''}`"
        :imageUrl="imageUrl"
        minHeight="140"
        aspectRatio="2.75"
      />
      <v-row
        no-gutters
        v-else
        :class="
          `name-last ${
            item.isActive === true ? `name-check` : ''
          } justify-center align-center`
        "
      >
        <span class="title text--secondary">{{ nameLastString }}</span>
      </v-row>
    </div>
    <div>
      <DocumentSummary
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
import DocumentSummary from "../list/DocumentSummary";
export default {
  components: {
    ImageResponsive,
    DocumentSummary
  },
  props: {
    imageUrl: String,
    name: String,
    createAt: String,
    rate: Boolean,
    link: String,
    item: Object
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
<style scoped>
.div-card {
  cursor: pointer;
}
.icon-check {
  position: absolute;
  z-index: 10;
}
.name-last {
  height: 140px;
  background: grey;
  border-radius: 5px;
}
.name-check {
  opacity: 0.5;
}
.img-check {
  opacity: 0.5;
}
</style>
