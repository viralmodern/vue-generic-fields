<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card :loading="loading">
        <v-list three-line dense>
          <v-subheader>
            Notes
            <v-spacer/>
            <v-btn text
                   small
                   class="text-capitalize caption"
                   color="primary"
                   @click="addNewNote">
              New Note
              <v-icon small right>mdi-plus</v-icon>
            </v-btn>
          </v-subheader>
          <template v-for="(note, index) in notes">
            <v-divider v-if="index !== 0"/>
            <v-list-item :key="`${note.pk}-card`" tile
                         @click="selectNote(index)"
                         active-class="primary--text"
                         :class="{'primary--text': index === selectedNote}">
              <v-list-item-content :title="note.title">
                {{note.title}}
                <v-list-item-subtitle>
                  <div class="d-flex align-center">
                    <TimeAgo class="text-caption d-block" live :datetime="note | timeAgo"/>
                    <div class="mx-1">—</div>
                    <UserDetail :pk="note.creator"/>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon
                       small
                       :id="`note_id_${note.pk}`"
                       :loading="hasDeleting(note.pk)"
                       :disabled="hasDeleting(note.pk)"
                       @click.stop="changeOptionNote($event, `note_id_${note.pk}`)">
                  <v-icon small>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="12" md="9">
      <FormModel @submitted="submitted"
                 :type="isCreated ? 'post' : 'patch'"
                 @errored="onError" :endpoint="isCreated ? endPoint : `${endPoint}${noteIdSelected}`">
        <template #default="{ submit: create, submitting, rules, error }">
          <v-card :loading="submitting" class="border-radius-none" flat>
            <div class="valpha-init">
              <v-text-field label="Title Note"
                            rounded
                            solo
                            flat
                            background-color="purple lighten-5"/>
            </div>
            <v-form @submit.prevent="create(post)">
              <template v-for="(attribute, index) in attributes">
                <component :key="`${attribute.name}-${index}`"
                           v-model="formModel[attribute.name]"
                           v-bind="attribute.vBind || {}"
                           :error-messages="error[attribute.name]"
                           :label="attribute.label"
                           :is="ATTRIBUTE_FIELDS[attribute['type']].MODEL_LAYOUT">
                  <template v-slot:label>
                    <template v-if="attribute.required">
                      {{attribute.label}} <strong class="error--text">*</strong>
                    </template>
                    <template v-else>
                      {{attribute.label}}
                    </template>
                  </template>
                </component>
              </template>
              <div class="d-flex">
                <div class="flex-grow-1"></div>
                <v-btn class="text-capitalize caption font-weight-bold"
                       type="submit" :loading="submitting" :disabled="submitting" color="primary">
                  {{isCreated ? "Create" : "Update"}}
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </template>
      </FormModel>
    </v-col>
    <MenuOptionsAbsolute :list="[{text: 'Delete', icon: 'mdi-delete'}]"
                         @click-item="clickMenuOption"
                         v-model="evtOptionNote"/>
  </v-row>
</template>

<script>
  import keyBy from "lodash/keyBy"
  import FormModel from "@/sat-vue-toolkit/components/FormModel"
  import { ATTRIBUTE_FIELDS } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import NoteContentItem from "@/sat-vue-toolkit/components/slick-grid/attributes/forms/NoteContentItem.vue"
  import MenuOptionsAbsolute from "@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue"
  import NotesFormList from "@/sat-vue-toolkit/components/slick-grid/attributes/notes/NotesFormList.vue"
  import UserDetail from "@/sat-vue-toolkit/components/UserDetail/UserDetail.vue"
  import TimeAgo from "@/sat-vue-toolkit/components/TimeAgo/TimeAgo.vue";
  import UserModel from "@/sat-vue-toolkit/components/UserModel"
  import { $$strName } from "@/sat-vue-toolkit/functions"

  export default {
    name: "NotesForm",
    components: {
      UserModel,
      TimeAgo,
      UserDetail,
      NotesFormList,
      MenuOptionsAbsolute,
      NoteContentItem,
      FormModel
    },
    props: {
      labelForm: {
        type: String,
        default: () => "Create New Note"
      },
      endPoint: {
        type: String
      },
      matter: {},
      docketEntry: {},
      value: {}

    },
    data () {
      return {
        ATTRIBUTE_FIELDS,
        formModel: {},
        notes: [],
        selectedNote: null,
        loading: false,
        evtOptionNote: null,
        deleting: []
      }
    },
    mounted () {
      this.fetchNotes()
    },
    computed: {
      attributesByName () {
        try {
          let attributes = this.attributes
          return keyBy(attributes, "name")
        } catch (e) {
          return {}
        }
      },
      isCreated () {
        return [null, undefined, "", " ", false, true].includes(this.selectedNote)
      },
      noteIdSelected () {
        try {
          return this.notes[this.selectedNote]["pk"]
        } catch (e) {
          return null
        }
      },
      post () {
        let form = { ...this.formModel }
        let formData = new FormData()
        let jsonData = {}
        for (let item in form) {
          if (typeof form[item] !== "object") {
            formData.append([item], form[item])
            jsonData[item] = form[item]
          } else if (this.attributesByName[item].isFileAttachment) {
            // todo check type file upload
            let attachments = form[item]
            for (let i = 0; i < attachments.length; i++) {
              formData.append([item], attachments[i])
              jsonData[item] = attachments[item]
            }
          } else {
            formData.append([item], JSON.stringify(form[item]))
            jsonData[item] = JSON.stringify(form[item])
          }
        }
        return jsonData
      },
      attributes () {
        return [
          {
            label: "Title Note",
            name: "title",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            disabledContent: true,
            groupBy: false,
            required: true,
            vBind: {
              rounded: true,
              solo: true,
              flat: true,
              backgroundColor: "purple lighten-5",
            }
          },
          {
            label: "Description",
            name: "text",
            type: ATTRIBUTE_FIELDS.NOTE_CONTENT.TYPE,
            width: 200,
            list: [],
            readOnly: true,
            groupBy: false,
            disabledContent: true
          }
        ]
      }
    },
    watch: {
      selectedNote: {
        immediate: true,
        handler (v) {
          if (![null, undefined, "", " ", false, true].includes(v)) {
            this.initNoteModel()
          }
        }
      }
    },
    methods: {
      async fetchNotes () {
        try {
          this.loading = true
          let res = await this.$api.get(this.endPoint)
          let data = { ...res["data"] }
          let results = data["results"]
          this.notes = [...results]
        } catch (e) {
          console.log("ERROR", e.message)
        } finally {
          this.loading = false
        }
      },
      selectNote (index) {
        this.selectedNote = index
      },
      initNoteModel () {
        try {
          let note = this.notes[this.selectedNote]
          let formModel = { ...this.formModel }
          if (formModel.hasOwnProperty("title")) {
            formModel["title"] = note["title"]
          } else {
            formModel.title = note["title"]
          }
          if (formModel.hasOwnProperty("text")) {
            formModel["text"] = note["text"]
          } else {
            formModel.text = note["text"]
          }

          this.formModel = { ...formModel }
        } catch (e) {

        }
      },
      addNewNote () {
        this.selectedNote = null
        this.formModel = {}
      },
      submitted (row) {
        let notes = [...this.notes]
        if (this.isCreated) {
          this.notes = [row, ...notes]
          this.formModel = {}
          this.selectedNote = row["pk"]
        } else {
          let idx = notes.findIndex(note => note.pk == row.pk)
          if (idx >= 0) {
            notes[idx] = row
            this.notes = [...notes]
          }
        }

        this.$emit("uploaded", row)
      },
      onError () {
      },
      changeOptionNote (e, id) {
        this.evtOptionNote = `#${id}`
      },
      clickMenuOption (d) {
        if (d) {
          if (d.activatorId) {
            // let activatorId = note_id_${note.pk}
            let idNoteStr = d.activatorId.replace("#", "").split("_")
            let id = idNoteStr[idNoteStr.length - 1]
            this.deleteNote(id)
          }
        }
      },
      setDeleting (id) {
        let deleting = [...this.deleting]
        if (deleting.includes(id)) {
          return
        }
        deleting.push(id)
        this.deleting = [...deleting]
      },
      removeDeleting (id) {
        this.deleting = [...this.deleting.filter(temp => temp != id)]
      },
      hasDeleting (id) {
        return this.deleting.findIndex(temp => temp == id) >= 0
      },
      async deleteNote (idNote) {
        try {
          // deleting
          this.setDeleting(idNote)
          let notes = [...this.notes]
          let idx = notes.findIndex(note => note.pk == idNote)
          if (idx >= 0) {
            await this.$api.delete(`${this.endPoint}${idNote}`)
            notes.splice(idx, 1)
            this.notes = [...notes]
            console.log("CAVE_PUB", this.selectedNote, idx)
            if (this.selectedNote === idx) {
              this.selectedNote = null
              this.formModel = {}
            }
          }
        } catch (e) {

        } finally {
          this.removeDeleting(idNote)
        }
      }

    },
    filters: {
      $$strName,
      timeAgo (note) {
        try {
          return note.modified ? note.modified : note.created
        } catch (e) {
          return null
        }
      }
    }
  }
</script>

<style scoped>

</style>
