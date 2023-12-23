<!-- template for the user avatar component -->
<template>
  <v-form @submit.prevent="$emit('searchSubmit', query)">
    <v-text-field
      ref="input"
      solo
      filled
      flat
      rounded
      hide-details
      dense
      prepend-inner-icon="mdi-magnify"
      v-model="query"
      aria-autocomplete="none"
      :placeholder="getPlaceholder"
    ></v-text-field>
    <!--<input ref="input"
           type="text"
           v-model="query"
           :placeholder="getPlaceholder"
           autocomplete="true"
           class="txt no-border">-->
  </v-form>
</template>
<script>
export default {
  props: {
    value: String,
    placeholder: { type: String },
    focus: Boolean,
    preset: {
      type: String
    },
    timeDelayChangeInput: Number,
    isDebounceChangeInput: Boolean,
  },
  data() {
    return {
      internalValue: this.preset,
      debounce: null
    }
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    query: {
      get() {
        return this.internalValue
      },
      set(value) {
        if(this.isDebounceChangeInput) {
          this.$emit("onStartSearch");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            this.internalValue = value
            this.$emit('input', value)
          }, this.timeDelayChangeInput);
        } else {
          this.internalValue = value
          this.$emit('input', value)
        }
      }
    },
    getPlaceholder() {
      return this.placeholder || 'this.$t(general.label.search)'
    }
  }
}
</script>
<style scoped lang="scss"></style>
