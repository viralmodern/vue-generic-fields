import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";
import keys from 'lodash/keys'
import mx_notification from "@/sat-vue-toolkit/mixins/mxNotification";

export default {
    props: {
        endPoint: {
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
            default: () => 'The note has been created'
        },
        isShowNotifySuccess: {
            type: Boolean,
            default: () => true
        }
    },
    mixins: [mx_validate, mx_notification],
    data() {
        return {
            error: {},
            data: {},
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
        endPoint: {
            handler: 'load',
            immediate: true
        }
    },

    async mounted() {

    },
    methods: {
        async load() {
            try {
                this.submitting = true
                let res = await this.$api.get(this.endPoint)
                this.data = res['data']
            }catch (e) {

            }finally {
                this.submitting = false
            }
        },
        async submit(postData) {
            try {
                this.submitting = true
                let res = await this.$api[this.type](this.endPoint, postData)
                let note = res['data'], currentData = this.data
                let currentResults = this.data['results'] ? this.data['results'] : []
                currentData['results'] = [...currentResults, note]
                let totalNotes =  currentData['results'].length
                this.data = currentData

                this.$emit('submitted', {totalNotes})
                if(this.isShowNotifySuccess) {
                    this.$_alertCURD({text: this.notifySuccessText, type: 'success'})
                }
                this.error = {}
            } catch (e) {
                if(e.response) {
                    if(e.response.status >= 500) {
                        this.$_alertCURD({text: e.response.statusText, type: 'error'})
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
                        try {
                            document.querySelector('div.error--text').scrollIntoView()
                        } catch (e) {

                        }
                        this.error = error
                        this.$emit('errored', e.response.data)
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
