<template>
  <div class="cancel">
    {{ text }}
    <a href="#" @click="$emit('onClickCancel')">cancel</a>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style lang="scss" scoped>
.cancel {
  font-size: 10px;
  padding-left: 2px;
}
</style>
