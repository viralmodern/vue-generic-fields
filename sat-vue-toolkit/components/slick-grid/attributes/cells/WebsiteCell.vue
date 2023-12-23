<template>
  <div class="d-flex align-center w-100">
    <div class="flex-grow-1 py-1" @click="change">
      <template v-if="editable">
        <v-text-field hide-details
                      outlined dense
                      ref="websiteUrl"
                      autofocus
                      v-model="text"
                      required
                      :rules="linkRules"
                      @keydown.enter="saveText"
                      :placeholder="$$attribute.label"
                      @blur="blurText"></v-text-field>
      </template>
      <div v-else
           class="cursor--pointer text-left field-cell-content" style="max-width: 85%">
        <router-link v-if="val" :to="val"
                     :href="val"
                     class="d-block text-decoration-unset block-with-text"
                     target="_blank">
          {{val}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "WebsiteCell",
    data() {
      return {
        editable: false,
        text: '',
        val: '',

      }
    },
    mixins: [mx_validate, mxAttributeItem],
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.text = v
          this.val = v
        }
      }
    },
    methods: {
      change() {
        if (!this.editableCell) {
          return
        }
        this.editable = !this.editable
      },
      async saveText(e) {
        this.$$execute({val: e.target.value})
        this.editable = false
      },
      blurText () {
        if (this.editable) {
          this.editable = false
          this.text = this.val
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .block-with-text {
    -webkit-line-clamp: 100;
  }
  .app--compact {
    .block-with-text {
      -webkit-line-clamp: 1;
      white-space: nowrap;
    }
    .field-cell-content {
      .block-with-text {
        -webkit-line-clamp: 1;
      }
    }
  }
</style>
