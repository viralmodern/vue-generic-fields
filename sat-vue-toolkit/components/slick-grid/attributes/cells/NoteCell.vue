<template>
  <v-menu :close-on-content-click="false"
          v-model="uiShowNotes"
          offset-overflow
          offset-y
          allow-overflow
          open-delay="0"
          max-height="45vh">
    <template v-slot:activator="{on}">
      <div class="d-flex align-center">
        <v-btn small :title="text || ''" icon depressed v-on="on">
          <v-icon small>mdi-file-document</v-icon>
        </v-btn>
        <div class="flex-grow-1">
          {{text | $$totalNotes}}

        </div>
      </div>
    </template>
    <v-lazy>
      <NoteModel :end-point="endPoint" @submitted="submitted">
        <template #default="{ submit: create, submitting, rules, error, data: res }">
          <v-card flat :loading="submitting" light v-cloak max-width="350px">
            <v-subheader>
              Notes
            </v-subheader>
            <div>
              <template v-for="(note, index) in res['results']">
                <v-card :key="`note-card-${note['pk']}`" style="border-radius: 0px;">
                  <v-divider v-if="index !== 0"/>
                  <v-list-item dense two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{note["title"]}}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <TimeAgo :datetime="note.modified || note.created"/>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon small>
                        <v-icon small>mdi-link-variant</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-card>
              </template>
            </div>
            <v-card style="border-radius: 0px;" v-if="isOwnerRow">
              <v-divider/>
              <v-card-text>
                <v-text-field label="New Note"
                              placeholder="Enter note title"
                              :disabled="submitting"
                              clearable
                              v-model="noteName"
                              :error-messages="error['title'] || error['text']"
                              @keydown.enter="create(notePost)"/>
              </v-card-text>
            </v-card>
          </v-card>
        </template>
      </NoteModel>
    </v-lazy>
  </v-menu>
</template>

<script>
  import mx_notification from "@/sat-vue-toolkit/mixins/mxNotification"
  import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate"
  import NoteModel from "../notes/NoteModel"
  import TimeAgo from "../../../TimeAgo/TimeAgo"
  import { $$totalNotes } from "../../../../functions"
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "NoteCell",
    components: { TimeAgo, NoteModel },
    data () {
      return {
        text: "",
        val: "",
        uiShowNotes: false,
        noteName: ""

      }
    },
    mixins: [mx_notification, mx_validate, mxAttributeItem],
    computed: {
      notePost () {
        return {
          "title": this.noteName,
          "text": "string"
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.text = v
          this.val = v
        }
      }
    },
    methods: {
      change () {
        if (!this.isOwnerRow) {
          return
        }
      },
      submitted (data) {
        if (data) {
          if (data["totalNotes"]) {
            this.text = data["totalNotes"]
            this.val = data["totalNotes"]
            this.noteName = ""
          }
        }
      }
    },
    filters: {
      $$totalNotes
    }
  }
</script>

<style scoped lang="scss">

</style>
