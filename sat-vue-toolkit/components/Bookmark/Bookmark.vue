<template>
  <v-btn :icon="icon"
         :title="bookmarked ? 'Bookmarked' : 'Bookmark'"
         small
         @click.stop="doBookmark"
         depressed class="caption text-capitalize"
         :rounded="!icon"
         :disabled="submitting$"
         :loading="submitting$">
    <template v-if="!icon">
      {{bookmarked ? `Bookmarked` : `Bookmark`}}
    </template>
    <v-icon :color="bookmarked ? 'warning' : 'default'"
            small
            :right="!icon">
      mdi-bookmark-check
    </v-icon>
  </v-btn>
</template>

<script>

  export default {
    name: "Bookmark",
    props: {
      bookmarked: {
        type: [Boolean, String, Number],
        default: () => ''
      },
      endPoint: {
        type: String,
        required: true
      },
      icon: {
        type: Boolean,
        default: () => true
      },

    },
    data () {
      return {
        submitting$: false
      }
    },
    computed: {
      canReport () {
        return this.submitting$ === false
      },
      reduceEndpoint() {
        let {endPoint} = this
        return endPoint.endsWith('/') && endPoint || `${endPoint}/`
      },
    },
    methods: {
      async doBookmark () {
        let {reduceEndpoint, bookmarked} = this
        let method,
          url = `${reduceEndpoint}bookmarks/`;
        if (bookmarked) {
          method = this.$api.delete
        } else {
          // post
          method = this.$api.post
        }
        try {
          this.submitting$ = true
          let res = await method(url)
          let val;
          if(res['data']) {
            val = {bookmarked: res['data']['pk']}
            try {
              this.$trigger('$bookmarkEntity', {url, response: res['data']})
            }catch (e) {

            }
          }else {
            val = {bookmarked: null}
            this.$trigger('$bookmarkEntity', {url, response: res['data'], unBookmark: true})
          }
          this.$emit("bookmarked", val)
        } catch (e) {
          console.error(e.message)
        } finally {
          this.submitting$ = false
        }
      }
    }
  }
</script>

