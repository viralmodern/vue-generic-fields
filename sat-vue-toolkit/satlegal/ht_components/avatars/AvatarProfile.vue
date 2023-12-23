<template>
  <div>
    <AvatarResponsive
      :class="type"
      :src="imageUrl"
      aspectRatio="1"
    />
    <div class="mt-1">
      <v-btn color="secondary" small @click="$emit('remove')">
        <span>REMOVE AVATAR</span>
      </v-btn>
    </div>
    <div>
      <InputFile small color="primary" text="choose avatar" @change="$emit('change', $event)"/>
    </div>
  </div>
</template>

<script>
import AvatarResponsive from "./AvatarResponsive";
import InputFile from "../inputs/InputFile";

export default {
  components: {
    AvatarResponsive,
    InputFile
  },
  props: {
    imageUrl: String,
    type: String
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

