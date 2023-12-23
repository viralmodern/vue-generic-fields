<template>
  <UserModel :pk="creator">
    <template v-slot:default="{user, name}">
      <v-lazy class="comment">
        <div class="comment">
          <a class="avatar d-flex align-center justify-center"
             style="width: 37px; height: 37px; overflow:hidden;">
            <v-avatar color="primary" :size="25">
              <template v-if="user">
                <img v-if="user.avatar" :src="user.avatar" :alt="name">
                <span v-else class="white--text font-weight-bold caption">
                    {{name.substring(0, 2)}}
                </span>
              </template>
            </v-avatar>
          </a>
          <div class="content">
            <a class="author">
              {{name}}
            </a>
            <div class="metadata">
            <span class="date">
              <TimeAgo :datetime="timeAgo"/>
            </span>
            </div>
            <div class="text">
              <MarkDownToVue :content="content">
                <template slot-scope="{ data }">
                  <div v-html="data"></div>
                </template>
              </MarkDownToVue>
            </div>
            <div class="actions d-flex align-center">
              <template v-if="items.length">
                <a @click="toggleChildList"
                   class="d-flex align-center primary--text ml-n2">
                  <v-icon color="primary">
                    <template v-if="uiShowChildList">mdi-menu-up</template>
                    <template v-else>mdi-menu-down</template>
                  </v-icon>
                  {{uiShowChildList ? 'Hide ' : 'View '}}
                  {{ items.length | countLabel }}
                </a>
                <p class="ma-0 mr-2" v-if="!uiShowChildComment">|</p>
              </template>
              <template v-if="!noShowReply">
                <a class="reply black--text font-weight-bold text-uppercase"
                   v-if="!uiShowChildComment"
                   @click="uiShowChildComment = true">Reply</a>
              </template>
            </div>
            <div v-if="uiShowChildComment">
              <div class="mb-2"></div>
              <MarkDownComment :end-point="url"
                               cancel-comment
                               :users="users"
                               @cancel="uiShowChildComment = false"
                               @submitted="postComment"
              />
            </div>
          </div>
          <template v-if="items.length">
            <div v-show="uiShowChildList"
                 class="comments" style="padding-left: 2.5em">
              <template v-for="comment in items">
                <comment-item :key="comment.pk"
                              :creator="comment.creator"
                              :content="comment.text"
                              :child-count="comment.child_count"
                              :parent-id="comment.parent"
                              no-show-reply
                              :modified="comment.modified"
                              :created="comment.created"/>
              </template>
            </div>
          </template>
        </div>
      </v-lazy>
    </template>
  </UserModel>
</template>

<script>
  import MarkDownToVue from "./editor/MarkDownToVue"
  import { TimeAgo } from "@/sat-vue-toolkit/components"
  import UserModel from "../../../UserModel"
  import MarkDownComment from "./editor/MarkDownComment"

  export default {
    name: "CommentItem",
    components: { MarkDownComment, UserModel, TimeAgo, MarkDownToVue },
    props: {
      users: {
        type: Array,
        default: () => []
      },
      creator: {
        type: [Number, String],
        required: true
      },
      content: {
        type: String
      },
      modified: {
        type: String
      },
      created: {
        type: String
      },
      childCount: {
        type: Number,
        default: 0
      },
      parentId: {
        type: [Number, String, null, undefined]
      },
      endPoint: {
        type: String
      },
      noShowReply: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        uiShowChildComment: false,
        uiShowChildList: false,
        items: []
      }
    },
    // components: { MarkDownComment, DataMember, TimeAgo, MarkDownToVue },
    computed: {
      timeAgo () {
        try {
          return this.modified ? this.modified : this.created
        } catch (e) {
          return null
        }
      },
      url () {
        try {
          return this.endPoint.replace("null", this.parentId)
        } catch (e) {
          return this.endPoint
        }
      }
    },
    methods: {
      postComment (data) {
        try {
          this.items.unshift(data.comment)
        } catch (e) {
        }
      },
      async fetchComments () {
        let url = this.endPoint.replace("null", this.parentId)
        let res = await this.$api.get(url)
        this.items = res["data"].results
      },
      toggleChildList() {
        this.uiShowChildList = !this.uiShowChildList
      }
    },
    watch: {
      childCount: {
        handler (val) {
          if (val) {
            this.fetchComments()
          }
        },
        immediate: true
      }
    },
    filters: {
      countLabel (val) {
        try {
          return val === 0 ? "" : val >= 2 ? `${val} replies ` : `${val} reply `
        } catch (e) {
          return "N/A"
        }
      }
    }
  }
</script>

<style scoped></style>
