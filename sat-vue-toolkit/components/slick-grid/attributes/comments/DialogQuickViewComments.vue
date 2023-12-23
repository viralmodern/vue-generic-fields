<template>
  <v-navigation-drawer
      width="40vw"
      v-model="uiShowModal"
      right fixed @input="input">
    <v-card class="fill-height" :loading="loading">
      <div class="fill-height pa-4 overflow-y-auto" style="position: relative">
        <div class="ui small comments">
          <div class="text-subtitle-2 d-flex align-center">
            <div>
              <span class="primary--text">#{{title}}</span>
              / Comments
            </div>
            <v-spacer/>

          </div>
        </div>
        <v-btn icon @click="closeDialog" absolute right top>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <div class="ui small comments">
          <div class="ui reply form">
            <MarkDownComment v-if="uiShowModal"
                             :users="users"
                             :path-tag="pathTag"
                             :path-user="pathUser"
                             :end-point="endPoint"
                             @submitted="postComment"/>
          </div>
          <template v-for="comment in comments">
            <CommentItem :content="comment.text"
                         :users="users"
                         :path-tag="pathTag"
                         :path-user="pathUser"
                         :parent-id="comment.pk"
                         :creator="comment.creator"
                         :child-count="comment.child_count"
                         :key="comment.pk"
                         :modified="comment.modified"
                         :end-point="endPoint"
                         :created="comment.created">
              <template v-slot:child></template>
            </CommentItem>
          </template>

        </div>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
    import faker from 'faker'
    import 'semantic-ui-button/button.min.css'
    import 'semantic-ui-comment/comment.css'
    import MarkDownComment from './editor/MarkDownComment'
    import MarkDownToVue from './editor/MarkDownToVue'
    import CommentItem from './CommentItem'
    import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";

    export default {
        name: 'DialogQuickViewComments',
        components: {CommentItem, MarkDownToVue, MarkDownComment},
        mixins: [mx_validate],
        props: {

        },
        data() {
            return {
                uiShowModal: false,
                loading: false,
                avt: faker.internet.avatar(),
                valid: true,
                comments: [],
                endPoint: '',
                title: '',
            }
        },
        mounted() {
            try {
                const vm = this;
                this.$eventHub.$on('menu-cell-comments', function (data) {
                    // document.documentElement.classList.add('no_scroll')
                    vm.uiShowModal = true
                    try {
                        vm.endPoint = data.endPoint
                        vm.title = data.title
                    } catch (e) {

                    }
                })
            } catch (e) {

            }
        },
        computed: {
            url() {
                return this.endPoint
            },
            users() {
                try {
                    return this.$store.getters['workspace/workspaceMembers']
                } catch (e) {
                    return []
                }
            },
            pathUser() {
              let domainName = '.satlegal.ebitc.com'
              let workspaceName = location.hostname.split('.')[0]
              return `https://${workspaceName}${domainName}/mb`
            },
            pathTag() {
              let domainName = '.satlegal.ebitc.com'
              let workspaceName = location.hostname.split('.')[0]
              return `https://${workspaceName}${domainName}/tag`
            },

        },
        methods: {
            resetInitState() {
                this.uiShowModal = false;
                this.loading = false;
                this.valid = true;
                this.comments = [];
            },
            async fetchComments() {
                this.loading = true
                try {
                    let res = await this.$api.get(this.url)
                    this.comments = res['data'].results
                } catch (e) {

                }
                this.loading = false
            },
            async postComment(data) {
                try {
                    this.comments.unshift(data.comment)
                    this.$store.dispatch('comments/fetchComment', {endPoint: this.endPoint})
                } catch (e) {
                }
            },

            closeDialog() {
                this.uiShowModal = false
            },
            input(show) {
                if (!show) {
                    // this.resetInitState()
                  this.$eventHub.$emit('closed-comment', {k: this.endPoint, total: this.comments.length})
                }
            }
        },
        watch: {
            endPoint: {
                immediate: true,
                handler(v, old) {
                    if (v && v.localeCompare(old) != 0) {
                        this.fetchComments()
                    }

                }
            }

        },
        destroyed() {
            this.resetInitState()
        },
    }
</script>

<style scoped></style>
