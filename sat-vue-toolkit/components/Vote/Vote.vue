<template>
  <div class="vote_row d-flex flex-row justify-center align-center">
    <v-btn icon :color="`${voted === 1 ? 'primary' : 'default'}`"
           small
           :disabled="!canVote"
           @click="doVote(1)"
    >
      <v-icon small>mdi-chevron-double-up</v-icon>
    </v-btn>
    <v-chip small :title="totalVotes$">
      {{totalVotes$ | nFormatter}}
    </v-chip>
    <v-btn icon :color="`${voted === -1 ? 'primary' : 'default'}`"
           small
           :disabled="!canVote"
           @click="doVote(-1)"
    >
      <v-icon small>mdi-chevron-double-down</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import {nFormatter} from "../../filters";

  export default {
    name: "Vote",
    filters: {nFormatter},
    props: {
      endPoint: {
        type: String,
        required: true
      },
      totalVotes: {
        type: Number,
        default: 0
      },
      votedObject: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        totalVotes$: this.totalVotes,
        votedObject$: {...this.votedObject},
        submitting$: false
      }
    },
    computed: {
      canVote() {
        return this.submitting$ === false;
      },
      voted() {
        if (this.votedObject$ && this.votedObject$.pk) {
          return this.votedObject$.vote;
        }
      }
    },
    methods: {
      async doVote(direction) {
        let method, url, data;
        if (this.votedObject$ && this.votedObject$.pk) {
          url = `${this.endPoint}votes/${this.votedObject$.pk}/`;
          if (this.votedObject$.vote === direction) {
            // delete
            method = this.$api.delete;
          } else {
            // patch
            method = this.$api.patch;
            data = {vote: direction}
          }
        } else {
          // post
          url = `${this.endPoint}votes/`;
          method = this.$api.post;
          data = {vote: direction}
        }
        this.submitting$ = true;
        try {
          if (data === undefined) {
            await method(url);
            this.totalVotes$ -= this.votedObject$.vote
            this.votedObject$ = null;
          } else {
            let res = await method(url, data);
            let votedObject = res['data'];
            let totalVotes = this.totalVotes$ + votedObject.vote;
            if (votedObject.modified) {
              totalVotes = this.totalVotes$ + votedObject.vote * 2;
            }
            this.totalVotes$ = totalVotes;
            this.votedObject$ = votedObject;
          }
        } catch (e) {
        } finally {
          this.submitting$ = false;
        }
      }
    }
  }
</script>
<style>
  .vote_row {
    position: relative;
    /*border: solid 1px red;*/
  }
</style>

