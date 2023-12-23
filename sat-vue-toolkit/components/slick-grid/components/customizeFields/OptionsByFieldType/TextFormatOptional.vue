<template>
  <div class="optional-text-field mt-4">
    <v-card outlined flat class="pa-2">
      <div class="d-flex align-center">
        <div class="optional-text-decoration">
          <div class="d-flex align-center">
            <template v-for="text in textDecorations">
              <v-btn depressed
                     class="mr-2"
                     @click="setValueOptional({[types.textDecorations]: text.cln})"
                     small
                     :input-value="text.cln === optionalField[types.textDecorations]"
                     active-class="primary--text">
                <v-icon small>{{text.icon}}</v-icon>
              </v-btn>
            </template>
          </div>
        </div>
        <div class="optional-text-alignment">
          <div class="d-flex align-center">
            <template v-for="text in textAlignments">
              <v-btn depressed class="mr-2"
                     @click="setValueOptional({[types.textAlignments]: text.cln})"
                     small
                     :input-value="text.cln === optionalField[types.textAlignments]"
                     active-class="primary--text">
                <v-icon small>{{text.icon}}</v-icon>
              </v-btn>
            </template>
          </div>
        </div>
        <div class="flex-grow-1"></div>
        <v-btn title="Remove format" small depressed @click="clearFormat">
          <v-icon small color="red">mdi-format-clear</v-icon>
        </v-btn>
      </div>
      <div class="optional-text-preview mt-4"
           :class="textOptions">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, beatae blanditiis dicta dolores facere
        perspiciatis praesentium? Consectetur cupiditate dignissimos earum inventore minus nesciunt pariatur vel.
        Ducimus laudantium minima obcaecati quos.
      </div>
    </v-card>
  </div>
</template>

<script>
  import { optionalFieldOptionsMixin } from "./optionalFormatMixin"
  export default {
    name: "TextFormatOptional",
    mixins: [optionalFieldOptionsMixin],
    computed: {
      textOptions () {
        // let { textAlignment, textDecoration } = this
        // let { textDecorations, textAlignments } = this.types
        let { textDecorations, textAlignments } = this.optionalField
        return {
          [textDecorations]: textDecorations,
          [textAlignments]: textAlignments
        }
      }
    },
    data () {
      return {
        types: {
          textDecorations: 'textDecorations',
          textAlignments: 'textAlignments',
        },
        textDecorations: [
          {
            icon: "mdi-format-overline",
            cln: "text-decoration-overline"
          },
          {
            icon: "mdi-format-underline",
            cln: "text-decoration-underline"
          },
          {
            icon: "mdi-format-strikethrough",
            cln: "text-decoration-line-through"
          }
          /*{
            icon: '',
            cln: 'text-decoration-none'
          },*/
        ],
        textAlignments: [
          {
            icon: "mdi-format-align-left",
            cln: "text-start"
          },
          {
            icon: "mdi-format-align-center",
            cln: "text-center"
          },
          {
            icon: "mdi-format-align-right",
            cln: "text-sm-right"
          },
          {
            icon: "mdi-format-align-justify",
            cln: "text-sm-justify"
          }
        ],
      }
    },
    methods: {
      clearFormat() {
      }
    }

  }
</script>

<style scoped lang="scss">

</style>
