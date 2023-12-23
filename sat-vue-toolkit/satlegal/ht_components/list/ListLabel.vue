<template>
  <div>
    <LabelColor v-for="(item, index) in labels" :key="index" :color="item.color" :text="item.text"/>
  </div>
</template>

<script>
import LabelColor from "../chips/LabelColor";
export default {
  components: {
    LabelColor
  },
  props: {
    labels: Array
  }
};
</script>
