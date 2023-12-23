<template>
  <div class="d-block w-100 fill-height">
    <div @click="$$openDropDownSource"
         class="text-border caption fill-height d-flex flex-wrap align-center cursor--pointer">
      <div class="text-left field-cell-content">
        <!--        tooltipsValue-->
        <template v-for="(item, index) in convertValToValuesObject">
          <div class="d-inline-block field-cell-content--item" :key="index">
            <template v-if="$$attribute.chips">
              <v-chip dark small
                      flat
                      :color="colorValue(item)"
                      class="ma-1">
                <div class="py-2 d-flex align-center">
                  <template v-if="$$attribute.groupBy">
                    <router-link class="link-hover white--text"
                                 :to="chipLink(item[$$attribute.itemValue])">
                      <template v-if="isAvatar || item['avatar']">
                        <img width="15" class="mr-2" :src="avatarValue(item)" alt=""/>
                      </template>
                      <!--{{item[$$attribute.itemText]}}-->
                      {{textValue(item)}}
                    </router-link>
                  </template>
                  <template v-else>
                    <template v-if="isAvatar || item['avatar']">
                      <img width="15" class="mr-2" :src="avatarValue(item)" alt=""/>
                    </template>
                    <!--{{item[$$attribute.itemText]}}-->
                    {{textValue(item)}}
                  </template>
                  <template v-if="$$attribute.tooltipsValue">
                      <v-icon small right @mouseenter="$emit('showTooltip', {k: $$attribute.tooltipsValue, item,  evt: $event})">
                        mdi-help-circle
                      </v-icon>
                  </template>
                </div>
              </v-chip>
            </template>
            <template v-else>
              <div class="ma-1 text-small-item">
                <template v-if="isAvatar || item['avatar']">
                  <img width="25" class="mr-2" :src="avatarValue(item)" alt=""/>
                </template>
                <!--{{item[$$attribute.itemText]}}-->
                {{textValue(item)}}
                <i class="dot-space">,</i>
                <template v-if="$$attribute.tooltipsValue">
                  <sup class="help-tooltip">
                    <v-icon small @mouseenter="$emit('showTooltip', {k: $$attribute.tooltipsValue, item, evt: $event})">
                      mdi-help-circle
                    </v-icon>
                  </sup>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { $$strName } from "@/sat-vue-toolkit/functions"
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import mxAttributeItemList from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItemList"
  import FaviconAvatar from "~/sat-vue-toolkit/components/Common/FaviconAvatar"

  export default {
    name: "ListCell",
    components: { FaviconAvatar },
    mixins: [mxAttributeItem, mxAttributeItemList],
    data () {
      return {
        val: null
      }
    },
    methods: {
      chipLink (val) {
        let { $route: { query } } = this
        let { name } = this.$$attribute
        return {
          query: {
            ...query,
            "group_by": name,
            "group_items": val
          }
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

    filters: {
      $$strName
    }

  }
</script>

<style scoped lang="scss">
  .field-cell-content {
    .block-with-text {
      -webkit-line-clamp: 20;
    }
  }

  .app--compact {
    .field-cell-content {
      display: flex;
      flex-wrap: nowrap;

      .block-with-text {
        -webkit-line-clamp: 1;
      }

      .text-small-item {
        white-space: nowrap;
      }
    }
  }

  .link-hover {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  .field-cell-content--item {
    &:last-child {
      .text-small-item {
        i.dot-space {
          opacity: 0;
        }
      }
    }
  }
  .text-small-item {
    /*border: solid 1px red;*/
    display: flex;
    align-items: center;
    .help-tooltip {
      opacity: 0;
      transition: opacity 0.25s linear;
      /*margin-left: 5px;*/
    }
    &:hover {
      .help-tooltip {
        opacity: 1;
      }
    }
  }
</style>
