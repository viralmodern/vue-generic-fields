<template>
  <div class="d-block w-100 fill-height">
    <div class="d-flex align-center cursor--pointer fill-height"
         :title="val.length | $$getCountLabelTag"
         @click="change">
      <div class="d-flex justify-start flex-wrap field-cell-content">
        <template v-for="(label, index) in val">
          <v-hover v-slot:default="{hover}" v-if="index < showTotal">
            <div class="position-relative" :key="`${label}-${index}`">
              <v-btn absolute
                     v-if="isOwnerRow && hover"
                     top @click.stop="delLabel(label)"
                     right
                     x-small
                     icon :width="15" :height="15"
                     style="z-index: 2; top: 0px; right: 0px; background: #000"
                     dark
                     color="#000">
                <v-icon x-small color="white">
                  mdi-close
                </v-icon>
              </v-btn>
              <v-chip :color="label | $$getBgColorTag"
                      :title="label | $$getTextTag"
                      x-small class="ma-1">
                {{label}}
              </v-chip>
            </div>
          </v-hover>
        </template>
        <template v-if="val.length - showTotal > 0">
          <v-chip label x-small color="primary" depressed class="ma-1" @click="change">
            +{{val.length - showTotal}}
          </v-chip>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
  import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { $$getBgColorTag, $$getColorTag, $$getTextTag, $$getCountLabelTag } from "@/sat-vue-toolkit/functions"

  export default {
    name: "LabelsCell",
    mixins: [mx_validate, mxAttributeItem],
    data() {
      return {
        val: [],
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v || []
        }
      }
    },
    methods: {
      change(e) {
        this.$$openDropDownSource(e, {items: [...this.val]})
      },
      async delLabel(label) {
        if (!window.confirm(`Want to delete ${label.split('#')[0]}?`)) return
        try {
          let val = [...this.val].filter(lb => lb !== label)
          this.$emit('updateContent', {val: val})
        } catch (e) {

        }
      },

    },
    filters: {
      $$getCountLabelTag,
      $$getTextTag, $$getColorTag, $$getBgColorTag,

    }

  }
</script>

<style scoped lang="scss">
  .app--compact {
    .field-cell-content {
      flex-wrap: nowrap !important;
    }
  }
</style>

