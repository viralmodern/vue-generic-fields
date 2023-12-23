<template>
  <span ref='dom'
        :title="fullText">
    {{formattedText}}
  </span>
</template>

<script>
    import moment from "moment"
    import {cancel, format, render} from "timeago.js"

    export default {
        name: "TimeAgo",
        props: {
            datetime: {
                type: [String, Date],
                required: true
            },
            live: {
                type: Boolean,
                default: true
            },
            locale: {
                type: String,
                default: "en"
            }
        },

        mounted() {
            this.renderTimeAgo()
        },

        methods: {
            renderTimeAgo() {
                // cancel all the interval
                cancel(this.$refs.dom)

                if (this.live !== false) {
                    // live render
                    this.$refs.dom.setAttribute("datetime", this.datetime)
                    render(this.$refs.dom, this.locale)
                }
            }
        },
        computed: {
            formattedText() {
                return format(this.datetime, this.locale)
            },
            fullText() {
                moment.locale(this.locale)
                return moment(this.datetime).format("lll")
            }
        },

        beforeDestroy() {
            cancel(this.$refs.dom)
        }
    }
</script>

