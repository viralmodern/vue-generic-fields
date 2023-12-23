<template>
  <v-form
      v-model="valid"
      style="border: solid 1px rgba(0,0,0,0.1); border-radius: 5px;"
      class="pa-2 pt-2"
      @submit.prevent="submit"
  >
    <div class="d-flex align-center">
      <v-btn
          text
          small
          class="text-subtitle-2 text-transform-unset"
          active-class="primary--text"
          :input-value="!modePreview"
          @click="$$changeMode(false)"
      >Write
      </v-btn
      >
      <v-btn
          text
          small
          class="text-subtitle-2 text-transform-unset"
          active-class="primary--text"
          :input-value="modePreview"
          @click="$$changeMode(true)"
      >Preview
      </v-btn
      >
      <v-spacer/>
      <div v-show="!modePreview && uiShowCustom">
        <v-btn icon small>
          <v-icon small>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn icon small>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"
            />
          </svg>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-code-tags</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-link-variant</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn icon small>
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z"
            />
          </svg>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-table</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon small>mdi-checkbox-marked-outline</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider/>
    <div class="mb-2"></div>
    <div class="input_md" v-show="!modePreview">
      <v-textarea placeholder="@,#..."
                  v-model="content"
                  ref="elComment"
                  hide-details
                  solo
                  flat
                  required
                  :rules="textRules"
      />
    </div>
    <div class="preview_md" v-show="modePreview">
      <div v-html="contentPreview" style="min-height: 150px;"></div>
    </div>
    <v-divider/>
    <div class="mb-2"></div>
    <div class="d-flex">
      <v-btn v-if="uiShowCustom"
             text
             depressed
             color="primary"
             small
             class="text-caption text-transform-unset"
             v-show="!modePreview"
      >
        <v-icon left>mdi-paperclip</v-icon>
        Attach a file
      </v-btn>
      <v-spacer/>
      <v-btn depressed small @click="$emit('cancel')" v-if="cancelComment"
      >Cancel
      </v-btn
      >
      <div class="mx-2"></div>
      <v-btn depressed color="primary" small :disabled="!valid || submitting" type="submit" :loading="submitting"
      >Submit
        <v-icon right>mdi-send</v-icon>
      </v-btn
      >
    </div>
  </v-form>
</template>

<script>
    import mx_markdown from './mixins/mx_markdown'
    import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";

    export default {
        name: 'MarkDownComment',
        props: {
            cancelComment: {
                type: Boolean,
                default: false
            },
            endPoint: {
                type: String
            },
            pathUser: {
              type: String,
              default: () => 'https://satchaos.demo.satproj.io/mb'
            },
            pathTag: {
              type: String,
              default: () => 'https://satchaos.demo.satproj.io/#'
            },
        },
        data() {
            return {
                valid: true,
                content: '',
                submitting: false
                // '![Image](https://images-na.ssl-images-amazon.com/images/I/71Ron2wo5aL._AC_SL1500_.jpg)'
            }
        },
        mixins: [mx_markdown, mx_validate],
        mounted() {
            try {
                const vm = this
                // console.error(vm.$refs.elComment.$refs.input)
                this.$$initialize({el: vm.$refs.elComment.$refs.input})
            } catch (e) {
            }
        },
        computed: {
            contentPreview() {
                try {
                    return this.md.render(this.content)
                } catch (e) {
                    return 'N/A'
                }
            }
        },
        methods: {
            async submit() {
                if (this.submitting) return
                this.submitting = true
                try {
                    let data = {text: this.content}
                    let res = await this.$api.post(this.endPoint, data)
                    let comment = res['data']
                    this.$emit('submitted', {comment})
                    this.content = ''
                } catch (e) {

                }
                this.submitting = false
            }
        }
    }
</script>

<style lang="scss">
  .preview_md {
    img {
      display: block;
      max-width: 100%;
    }
  }
</style>
<style scoped lang="scss">
  .text_box_comment {
    display: block;
    border: solid 1px red;
    border: none !important;
    width: 100%;
    outline: none;
    resize: none;
    max-height: 55vh;

    &:focus,
    &:active {
      outline: none;
    }
  }

  .primary--border {
  }
</style>
