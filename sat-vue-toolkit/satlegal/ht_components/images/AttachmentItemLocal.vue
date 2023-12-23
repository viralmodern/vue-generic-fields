<template>
  <div class="attachment">
    <div class="attachment__delete">
      <v-btn @click="$emit('clickIconDelete')" class="attachment__delete-icon" small icon color="primary">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </div>
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
  </div>
</template>

<script>
import ImageResponsive from "./ImageResponsive";

export default {
  components: {
    ImageResponsive
  },
  props: {
    imageUrl: String,
    name: String
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
    }
  }
};
</script>


<style lang="scss" scoped>
  .attachment {
    position: relative;

    &:hover &__delete {
      display: block;
    }

    &__delete {
      position: absolute;
      right: 6px;
      top: 3px;
      z-index: 1;
      display: none;

      &-icon {
        background: #fff;
      }
    }
  }
</style>
