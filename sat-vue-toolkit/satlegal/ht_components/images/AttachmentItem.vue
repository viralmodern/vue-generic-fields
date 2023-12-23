<template>
  <div>
    <a target="_blank" :href="imageUrl" style="text-decoration: none;">
      <ImageResponsive
        v-if="checkLastDot"
        style="border-radius: 5px;"
        :imageUrl="imageUrl"
        minHeight="140"
        aspectRatio="2.75"
      />
      <v-row
        v-else
        style="height:140px;background:grey;border-radius: 5px;word-break: break-all;"
        class="justify-center align-center"
        no-gutters
      >
        <span class="title text--secondary text">{{ name }}</span>
      </v-row>
    </a>
  </div>
</template>

<script>
import ImageResponsive from "./ImageResponsive";

export default {
  components: {
    ImageResponsive
  },
  props: {
    imageUrl: String
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
    name() {
      return this.imageUrl.split("/").pop();
    }
  }
};
</script>
