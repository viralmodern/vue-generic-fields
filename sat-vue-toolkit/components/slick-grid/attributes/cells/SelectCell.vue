<template>
  <div class="d-block w-100 fill-height">
    <div @click="$$openDropDownSource"
         class="text-border caption fill-height d-flex flex-wrap align-center cursor--pointer">
      <div class="text-left">
        <template v-if="$$attribute.multiple">
          <template v-for="(item, index) in convertValToValuesObject">
            <v-chip dark
                    flat
                    :color="colorValue(item)"
                    v-if="$$attribute.chips"
                    label
                    :key="index"
                    class="ma-1">
              <div class="pa-2">
                <template v-if="$$attribute.itemAvatar">
                  <v-avatar color="primary" size="25"
                            class="white--text"
                            :tile="item[$$attribute.itemText]">
                    <img v-if="item[$$attribute.itemAvatar]" :src="avatarValue(item)">
                    <span v-else>{{item[$$attribute.itemText] | $$strName}}</span>
                  </v-avatar>
                </template>
                <template v-else>
                  {{item[$$attribute.itemText]}}
                </template>
              </div>
            </v-chip>
            <span v-else :key="index" class="ma-1">
                <template v-if="$$attribute.itemAvatar">
                  <v-avatar color="primary" class="white--text" size="25" :title="item[$$attribute.itemText]">
                    <img v-if="item[$$attribute.itemAvatar]" :src="avatarValue(item)">
                    <span v-else>{{item[$$attribute.itemText] | $$strName}}</span>
                  </v-avatar>
                </template>
                <template v-else>
                  {{item[$$attribute.itemText]}}
                </template>
              </span>
          </template>
        </template>
        <template v-else>
          <template v-if="$$attribute.chips">
            <v-chip dark flat small>
              <div class="pa-2">
                {{textValue(val)}}
              </div>
            </v-chip>
          </template>
          <template v-else>
            {{textValue(val)}}
          </template>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import { $$strName } from "@/sat-vue-toolkit/functions"
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import mxAttributeItemList from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItemList"
  export default {
    name: "SelectCell",
    mixins: [mxAttributeItem, mxAttributeItemList],
    data () {
      return {
        val: null
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
    filters: {
      $$strName
    }

  }
</script>

<style scoped lang="scss">

</style>
