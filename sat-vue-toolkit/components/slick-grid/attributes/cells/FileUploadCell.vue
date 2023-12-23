<template>
  <div class="d-block w-100 fill-height">
    <div class="d-flex fill-height" @click="$$openDropDownSource">
      <template v-if="$$attribute.innerScope">
        <div class="flex-grow-1 cursor--pointer w-100">
          <a :href="val"
             :title="val | $$fileName"
             target="_blank"
             style="word-break: break-all"
             class="d-inline-block file_item_icon text-decoration-unset">
                  <span class="file_type">
                    {{val | $$fileName | $$fileType}}
                  </span>
            <img :src="icon" alt=""/>
          </a>
        </div>
      </template>
      <template v-else>
        <div class="flex-grow-1 cursor--pointer"
             :title="$$fileCountLabel(val ? val.length : '')">
          <div class="d-flex align-center flex-wrap" v-if="validValue">
            <template v-for="attachment in val">
              <a :href="attachment.attachment"
                 :title="attachment.attachment | $$fileName"
                 target="_blank"
                 style="word-break: break-all"
                 class="d-block file_item_icon text-decoration-unset"
                 :key="attachment.pk">
                  <span class="file_type">
                    {{attachment.attachment | $$fileName | $$fileType}}
                  </span>
                <img :src="icon" alt=""/>
              </a>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { nFormatter } from "@/sat-vue-toolkit/filters"
  import { $$fileName, $$fileType, $$fileCountLabel } from "@/sat-vue-toolkit/functions"
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "FileUploadCell",
    mixins: [mxAttributeItem],
    data () {
      return {
        val: null,
      }
    },
    computed: {
      validValue () {
        try {
          return this.val && this.val.length
        } catch (e) {
          return false
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },
    methods: {
      $$fileCountLabel
    },
    filters: {
      nFormatter,
      $$fileName,
      $$fileType,
      $$fileCountLabel

    }
  }
</script>

<style scoped lang="scss">
  .file_item_icon {
    display: block;
    position: relative;
    /*width: 32px;*/
    /*height: 32px;*/
    padding: 2.5px;

    span.file_type {
      font-size: 45%;
      display: block;
      position: absolute;
      background: rgb(155, 156, 152);
      width: 85%;
      text-align: center;
      color: #ffffff;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 10px;
      line-height: 10px;
      transform: translateY(-50%) translateX(-50%);
      border-radius: 5px;
    }

    img {
      display: block;
      width: 30px;
      height: 30px;
    }
  }
</style>
