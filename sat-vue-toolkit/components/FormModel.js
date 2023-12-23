import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";
import keys from 'lodash/keys'
import mx_notification from "@/sat-vue-toolkit/mixins/mxNotification";

export default {
    props: {
        endpoint: {
            type: String,
        },
        type: {
            type: String,
            default: 'post'
        },
        entry: {
            type: [Object, Boolean],
        },
        notifySuccessText: {
            type: [String, Number],
            default: () => 'The item has been created'
        },
        isShowNotifySuccess: {
            type: Boolean,
            default: () => true
        },
        isOffline: {
            type: Boolean,
            default: () => false
        },

    },
    mixins: [mx_validate, mx_notification],
    data() {
        return {
            error: {},
            data: null,
            valid: true,
            submitting: false
        }
    },
    computed: {
        disabled() {
            return !this.valid
        },

    },
    watch: {
        entry: {
            handler: 'load',
            deep: true,
            immediate: true
        }
    },

    async mounted() {

    },
    methods: {
        async load(v) {
            this.data = v
        },
        async submit(data) {
            try {
                let {isOffline} = this
                let res, mthGet = this.type.toLowerCase() === 'get';
                this.submitting = true
                this.$emit('submitting', data)
                if(isOffline) {
                  return this.$emit('submitted', data)
                }
                if(mthGet)  {
                  res = await this.$api[this.type](this.endpoint, {params: data})
                }else {
                  res = await this.$api[this.type](this.endpoint, data)
                }
                this.$emit('submitted', res['data'])
                if(this.isShowNotifySuccess && !mthGet) {
                    this.$eventHub.$emit('alert-curd', {text: this.notifySuccessText, type: 'success'})
                }
                this.error = {}
            } catch (e) {
              if(e.response) {
                if(e.response.status >= 500) {
                  this.$eventHub.$emit('alert-curd', {text: e.response.statusText, type: 'error'})
                }else {
                  let error = e.response.data
                  let error_keys = keys(error)
                  for (let i = 0; i < error_keys.length; i++) {
                    let item_error = error[error_keys[i]];
                    if (!Array.isArray(item_error)) {
                      error[error_keys[i]] = keys(item_error).map(i => item_error[i].toString())
                    }
                  }
                  // setTimeout(() => this.error = {}, 3000);
                  this.error = error
                  this.$emit('errored', e.response.data)
                  try {
                    setTimeout(() => {
                      document.querySelector('div.error--text').scrollIntoView(true)
                    }, 300);

                  } catch (e) {

                  }
                }
              }
            }finally {
                this.submitting = false
            }
            return false
        }
    },

    render() {
        return this.$scopedSlots.default({
            data: this.data,
            submitting: this.submitting,
            submit: this.submit,
            error: this.error,
            rules: {
                emailRules: this.emailRules,
                textRules: this.textRules,
                linkRules: this.linkRules,
            }
        })
    }
}
