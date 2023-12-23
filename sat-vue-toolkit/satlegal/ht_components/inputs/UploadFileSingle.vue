<template>
  <div>
    <AvatarResponsive
      v-if="checkLastDot"
      :class="type"
      :src="imageUrl"
      aspectRatio="1"
      :style="`${isAvatarCenter ? '' : 'margin: unset'}`"
    />
    <v-row
      v-if="!checkLastDot && imageUrl"
      style="height:140px;background:grey;border-radius: 5px;"
      class="justify-center align-center"
      no-gutters
    >
      <span class="title text--secondary">{{ name }}</span>
    </v-row>
    <v-row class="my-2 ml-0">
      <InputFile small color="primary" :accept="accept" :text="textButtonAdd" @change="$emit('change', $event)"/>
      <v-btn v-if="imageUrl" class="mr-2" color="error" small @click="$emit('remove')">
        <v-icon>remove</v-icon>&nbsp;&nbsp;
        <span>{{textButtonRemove}}</span>
      </v-btn>
    </v-row>
    <!-- <div class="my-2">
    </div> -->
  </div>
</template>

<script>
import AvatarResponsive from "../avatars/AvatarResponsive";
import InputFile from "./InputFile";

export default {
  components: {
    AvatarResponsive,
    InputFile
  },
  props: {
    imageUrl: String,
    type: String,
    isAvatarCenter: {
      type: Boolean,
      default: () => true,
    },
    textButtonRemove: {
      type: String,
      default: () => 'REMOVE AVATAR',
    },
    textButtonAdd: {
      type: String,
      default: () => 'choose avatar',
    },
    accept: {
      type: String,
      default: () => 'file_extension|image/*',
    },
    name: String,
  },
  computed: {
    checkLastDot() {
      const name = (this.name || '')
        .split(".")
        .pop()
        .toLowerCase();
      if (name === "jpeg" || name === "jpg" || name === "png") {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>

<style scoped>
.round {
  border-radius: 50%;
  height: 185px;
  width: 185px;
  margin: auto;
  box-shadow: 3px 0px 10px -2px;
}
.thumbnail {
  width: 200px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 3px 0px 10px -2px;
}
</style>

