<template>
  <div>
    <v-switch
      v-model="showBolean"
      color="success"
      hide-details
      class="ma-0"
      @change="$emit('update', $event)"
      :readonly="isReadonly"
    ></v-switch>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean,
    isReadonly: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      showBolean: false
    };
  },
  mounted() {
    this.showBolean = this.value;
  },
  watch: {
    value: {
      handler(val) {
        this.showBolean = val;
      }
    }
  }
};
</script>
