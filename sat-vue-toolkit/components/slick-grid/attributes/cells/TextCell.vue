<template>
  <v-card tile flat
          class="d-block w-100 fill-height box_text_hover d-flex align-center"
          v-bind="optionalField.attrsCard">
    <template v-if="editableCell">
      <template v-if="!editable">
        <div @click="change"
             v-html="text"
             :title="text"
             class="w-100 cursor--pointer text-left block-with-text"
             v-bind="optionalField.attrs">
        </div>
      </template>
      <template v-if="editable">
        <div class="w-100 d-flex flex-wrap align-center fill-height">
          <template v-if="$$attribute.type === $ATTRIBUTE_FIELDS.LONG_TEXT.TYPE">
            <v-textarea hide-details
                        outlined
                        v-model="text"
                        @keydown.enter="saveText"
                        @blur="blurText"
                        dense
                        :placeholder="$$attribute.label"
                        autofocus
                        required/>
          </template>
          <template v-else>
            <v-text-field hide-details
                          :type="typeFile"
                          outlined
                          dense
                          autofocus
                          v-model="text"
                          required
                          :placeholder="$$attribute.label"
                          @keydown.enter="saveText"
                          @blur="blurText"></v-text-field>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="field-cell-content text-left fill-height d-flex align-center flex-wrap">
        <template v-if="fieldOptionReduce">
          <div :title="text">
            <div class="d-flex align-center">
              <v-icon v-if="fieldOptionReduce.icon" left small :color="fieldOptionReduce.colorIcon">
                {{fieldOptionReduce.icon}}
              </v-icon>
              <div class="caption block-with-text" v-html="text"></div>
            </div>
            <div class="mt-1 d-flex" v-if="fieldOptionReduce.icons">
              <v-spacer/>
              <template v-for="icon in fieldOptionReduce.icons">
                <v-icon small class="mr-1" :color="icon.color">{{icon.icon}}</v-icon>
              </template>
            </div>
          </div>
        </template>
        <div v-else
             class="text-left block-with-text" v-bind="optionalField.attrs"
             v-html="text" :title="text"/>
      </div>
    </template>
  </v-card>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "TextCell",
    data () {
      return {
        editable: false,
        text: "",
        val: ""

      }
    },
    mixins: [mxAttributeItem],
    computed: {
      typeFile () {
        let {type} = this
        let {EMAIL, INTEGER} = this.$ATTRIBUTE_FIELDS
        return type === EMAIL.TYPE ? "email" : type === INTEGER.TYPE ? "number" : "text"
      },
      fieldOptionReduce () {
        let { reduceOptionsAttribute, $$attribute } = this
        let field = `${$$attribute.type}_${$$attribute.name}`
        if (reduceOptionsAttribute.reduce) {
          return reduceOptionsAttribute[field]
        }
        return false
      },
      optionalField() {
        let {optionalField = {}, colorField, darkField} = this.$$attribute
        return {
          attrsCard: {
            color: colorField,
            dark: darkField
          },
          attrs: {
            class: {
              [optionalField.textDecorations]: [optionalField.textDecorations],
              [optionalField.textAlignments]: [optionalField.textAlignments],
            }
          }
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
      isUrl (val) {
        let l = new URL(val)
        return !isNaN(l)
      },
      change () {
        if (!this.editableCell) {
          return
        }
        this.editable = !this.editable
      },
      async saveText (e) {
        await this.updateContent(e.target.value)
        this.editable = false
      },
      blurText () {
        if (this.editable) {
          this.editable = false
          this.text = this.val
        }
      },
      async updateContent (val) {
        try {
          if (this.type === this.$ATTRIBUTE_FIELDS.INTEGER.TYPE) {
            val = parseInt(val)
          }
          return this.$emit("updateContent", { val })
        } catch (e) {
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .field-cell-content {
    /*border: solid 1px red;*/
    .block-with-text {
      -webkit-line-clamp: 20;
    }
  }
  .app--compact {
    .block-with-text {
      -webkit-line-clamp: 1;
    }
    .field-cell-content {
      /*border: solid 1px red;*/
      .block-with-text {
        -webkit-line-clamp: 1;
      }
    }
  }
</style>
