<template>
  <div>
    <v-btn @click="pickFile" class="mr-2" :color="color" :x-small="xSmall" :small="small" v-if="!$scopedSlots.section" :loading="isLoading">
      <v-icon :x-small="xSmall" :small="small">{{icon}}</v-icon>&nbsp;&nbsp;
      <span>{{text}}</span>
    </v-btn>
    <slot v-else name="section"></slot>
    <v-btn @click="$emit('onRemove')" v-if="isShowActionRemove" color="error" :x-small="xSmall" :small="small" :loading="isLoadingRemove">
      <v-icon :x-small="xSmall" :small="small">remove</v-icon>&nbsp;&nbsp;
      <span>remove</span>
    </v-btn>
    <input type="file" ref="image" style="display:none" :accept="accept" @change="onFilePicked">
  </div>
</template>

<script>
export default {
  props: {
    small: Boolean,
    xSmall: Boolean,
    isShowActionRemove: Boolean,
    color: String,
    text: String,
    accept: {
      type: String,
      default: () => 'image/*',
    },
    isLoading: Boolean,
    isLoadingRemove: Boolean,
    icon: {
      type: String,
      default: () => 'cloud_upload',
    },
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.$emit("change", { fileReader: fr, file: files[0] });
          e.target.value = "";
        });
      }
    }
  }
};
</script>
