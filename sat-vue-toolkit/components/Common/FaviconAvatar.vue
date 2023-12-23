<template>
  <div>
    <v-avatar :size="size">
      <img :src="`${baseFavicon}=${value}`" alt=""/>
    </v-avatar>
  </div>
</template>

<script>
  export default {
    name: "FaviconAvatar",
    props: {
      baseFavicon: {
        type: String,
        default: () => `https://www.google.com/s2/favicons?domain_url`
      },
      value: {

      },
      size: {
        type: Number,
        default: () => 25
      }
    }
  }
</script>

<style scoped lang="scss">
  .favicon_avatar {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px 5px 10px;
    background: #E8EAF6;
    overflow: hidden;
    border-radius: 100%;
    img {
      display: block;
      width: 75%;
    }
  }
</style>
