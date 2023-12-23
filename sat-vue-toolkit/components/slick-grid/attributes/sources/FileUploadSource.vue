<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-file-input outlined
                    placeholder="Select your files"
                    dense
                    :multiple="attribute.multiple"
                    small-chips
                    v-model="attachments"
                    :error-messages="errorsMessages"
                    label="Attachments">
      </v-file-input>
      <v-btn block
             small
             depressed
             color="primary"
             :disabled="loading || !validAttachments"
             :loading="loading"
             @click="uploadFile">{{titleBtn}}
      </v-btn>
    </v-card-text>
    <template v-if="attribute.innerScope"></template>
    <template v-else>
      <v-list v-if="val && val.length">
        <v-subheader>Files</v-subheader>
        <template v-for="(v, idx) in val">
          <v-divider v-if="idx !== 0" :key="`vd-${v.attachment}`"/>
          <v-hover v-slot:default="{hover}" :key="`${v.pk}`">
            <v-list-item link two-line>
              <template v-if="existFileEdit(v.pk)">
                <v-list-item-content>
                  <v-file-input outlined
                                placeholder="Select file"
                                dense
                                :multiple="false"
                                hide-details
                                :id="`file-${v.pk}`"
                                small-chips
                                :loading="existFileEditing(v.pk)"
                                :error="existFileError(v.pk)"
                                append-icon="mdi-check"
                                append-outer-icon="mdi-close"
                                @click:append="updateFileEdit(v.pk)"
                                @click:append-outer="cancelFileEdit(v.pk)"
                                label="Attachments"/>
                </v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link :to="`/${v.attachment}`"
                                 class="text-decoration-unset caption"
                                 :href="v.attachment"
                                 target="_blank">
                      {{v.attachment | $$fileName}}
                    </router-link>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <TimeAgo :datetime="v.created"/>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action :class="{hide_base: !hover && !existFileEditing(v.pk), show_base: hover}"
                                    @click="delFile(v.attachment, v.pk)">
                  <v-btn icon
                         small
                         color="red"
                         title="Delete"
                         :loading="existFileEditing(v.pk)">
                    <v-icon dense small>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action :class="{hide_base: !hover, show_base: hover}"
                                    @click="editFile(v.pk)">
                  <v-btn icon small title="Edit">
                    <v-icon dense small>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-hover>
        </template>
      </v-list>
    </template>
  </v-card>
</template>

<script>
    import TimeAgo from "@/sat-vue-toolkit/components/TimeAgo/TimeAgo.vue";
    import {$$fileName} from "@/sat-vue-toolkit/functions";
    import baseSourceProps from '../../configs/props/baseSourceProps'
    export default {
        name: "FileUploadSource",
        components: {TimeAgo},
        props: {
          ...baseSourceProps,
        },
        data() {
            return {
                uiShowMenu: false,
                attachments: null,
                loading: false,
                errorsMessages: '',
                val: [],
                listEdit: [],
                listEditing: [],
                listError: [],

            }
        },
        computed: {
            validAttachments() {
                try {
                    return this.attachments && this.attachments.length
                } catch (e) {
                    return false
                }
            },
            mth() {
              return this.attribute.innerScope ? 'patch' : 'post'
            },
            titleBtn() {
              return this.attribute.innerScope ? 'Update' : 'Upload'
            },
            convertValToValuesObject() {
              return 1
            }
        },
        watch: {
          value: {
            deep: true,
            immediate: true,
            handler (val) {
              console.error("FILE_UPLOAD", val)
              this.val = val
            }
          }
        },
        methods: {
            async uploadFile() {
                this.loading = true
                try {
                    let formData = new FormData(),
                      attributeName = this.attribute.name,
                      innerScope = this.attribute.innerScope,
                      multiple = this.attribute.multiple,
                      mth = this.mth;
                    // multiple
                    if(multiple) {
                      if (this.attachments.length) {
                        for (let i = 0; i < this.attachments.length; i++) {
                          formData.append(attributeName, this.attachments[i])
                        }
                      }
                    }else {
                      formData.append(attributeName, this.attachments[0])
                    }
                    let _res = await this.$api[mth](this.endPoint, formData)
                    let row;
                    if(innerScope) {
                      row = _res['data'][attributeName]
                      // this.$eventHub.$emit(`choose-cell-fileUpload-${this.k}`, {value: row, k: this.k})
                      this.val = row
                      this.$$execute({ fieldData: row })
                    }else {
                      row = _res['data']
                      // this.$eventHub.$emit(`choose-cell-fileUpload-${this.k}`, {value: [...row, ...this.val], k: this.k})
                      let v = [...row, ...this.val]
                      this.val = v
                      console.log(v);
                      this.$$execute({ fieldData:  v})
                    }
                    this.attachments = []
                } catch (e) {

                }finally {
                  this.loading = false
                }

            },
            async delFile(file, fileId) {
                try {
                    if(this.existFileEditing(fileId)) return
                    let fileName = $$fileName(file)
                    if (!window.confirm(`Want to delete ${fileName}?`)) return
                    this.listEditing.push(fileId)
                    await this.$api.delete(`${this.endPoint}${fileId}`)
                    let res = [...this.val].filter(file => file.pk !== fileId)
                    this.val = res
                    // this.$eventHub.$emit(`choose-cell-fileUpload-${this.k}`, {value: res, k: this.k})
                    this.$$execute({ fieldData: res })

                } catch (e) {

                } finally {
                    this.listEditing = [...this.listEditing].filter(file => file !== fileId)
                }
            },
            editFile(fileId) {
                this.listEdit.push(fileId)
            },
            cancelFileEdit(fileId) {
                this.listEdit = [...this.listEdit].filter(file => file !== fileId)
                this.listError = [...this.listError].filter(file => file !== fileId)
            },
            async updateFileEdit(fileId) {
                if(this.existFileEditing(fileId)) return
                let file = document.querySelector(`#file-${fileId}`).files[0]
                if (!file || !window.confirm(`Want to update file?`)) return
                try {
                    this.listEditing.push(fileId)
                    let formData = new FormData();
                    formData.append('attachment', file)
                    let _res = await this.$api.patch(`${this.endPoint}${fileId}`, formData)
                    let rs = _res['data']
                    this.cancelFileEdit(fileId)
                    let res = [...this.val].map(file => {
                        let temp;
                        if(file.pk === rs['pk']) {
                            temp = rs
                        }else {
                            temp = file
                        }
                        return temp
                    })
                    this.val = res
                    this.$$execute({ fieldData: res })
                }catch (e) {
                  this.listError.push(fileId)
                }finally {
                    this.listEditing = [...this.listEditing].filter(file => file !== fileId)
                }
            },
            existFileEdit(fileId) {
                return this.listEdit.includes(fileId)
            },
            existFileEditing(fileId) {
                return this.listEditing.includes(fileId)
            },
            existFileError(fileId) {
                return this.listError.includes(fileId)
            },


            resetState(v) {
                if (!v) {
                    this.attachments = null
                    this.val = []
                    this.errorsMessages = ''
                    this.loading = false
                    this.listEdit = []
                    this.listEditing = []
                    this.listError = []
                }
            }
        },
        destroyed() {

        },
        filters: {
            $$fileName
        }
    }
</script>

<style scoped>

</style>
