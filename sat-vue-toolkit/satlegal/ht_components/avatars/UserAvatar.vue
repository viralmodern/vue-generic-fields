<template>
  <v-avatar :left="left" v-if="!isInList" :size="`${avatarSize}px`" :color="backgroundColor">
    <img :src="imageUrl" :alt="name" v-if="showAvatar">
    <span v-else class="white--text" :style="`font-size: ${avatarSize/2}px`">{{ nameSymbol }}</span>
    <slot/>
  </v-avatar>
  <v-list-item-avatar
    v-else
    class="ma-0"
    :style="{zIndex:index, width, minWidth:width, overflow: 'unset'}"
  >
    <div :class="`${backgroundColor} avatars-list`">
      <img :src="imageUrl" :alt="name" v-if="showAvatar">
      <span v-else class="white--text" :style="`font-size: ${avatarSize/2}px`">{{ nameSymbol }}</span>
      <slot/>
    </div>
  </v-list-item-avatar>
</template>
<script>
export default {
  props: {
    avatarSize: Number,
    backgroundColor: {
      type: String,
      default: "indigo"
    },
    imageUrl: String,
    name: String,
    isInList: { type: Boolean, default: false },
    width: String,
    index: Number,
    left: String,
  },
  computed: {
    showAvatar() {
      return !!this.imageUrl;
    },
    nameSymbol: function() {
      if (this.imageUrl) return null;
      if(!this.name) return "";
      if (!this.name.trim().length) return "";
      let words = this.name.split(" ");
      if (words.length == 1) {
        return this.name.substring(0, 2).toUpperCase();
      }
      return (words[0][0] + "" + words[words.length - 1][0]).toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
  .avatars-list {
    width:40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
