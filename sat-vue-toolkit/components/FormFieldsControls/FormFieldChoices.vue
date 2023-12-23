<template>
  <div>
<!--    {{typeOptionalConfig}}-->
<!--    {{combinedItems}}-->
<!--    {{typeOptionalConfig}}-->
    <v-autocomplete :label="label"
                    :filter="customFilter"
                    :items="combinedItems"
                    :multiple="multiple"
                    :search-input.sync="search"
                    return-object
                    :loading="isFetching"
                    :disabled="isFetching"
                    :value="value"
                    @blur="$emit('blur')"
                    @input="data => $emit('input', data)"
                    :item-value="typeOptionalConfig['itemValue']"
                    :item-text="typeOptionalConfig['itemText']" v-bind="vBind || {}">
      <template v-slot:selection="data">
        <v-chip v-bind="data.attrs"
                small
                @click="data.select"
                :input-value="data.selected">
          <template v-if="dotPropToAvatar(data.item)">
            <img width="15"
                 class="mr-2"
                 :src="`${dotPropToAvatar(data.item)}`" alt=""/>
          </template>
          <!--<template v-if="typeOptionalConfig.itemFavicon">
            <FaviconAvatar class="mr-2" :size="20" :value="data.item[typeOptionalConfig.itemFavicon]"/>
          </template>-->
          <!--{{ data.item[typeOptionalConfig.itemText] }}-->
          {{dotPropToText(data.item)}}
        </v-chip>
      </template>
      <template v-slot:prepend-item>
        <template v-if="typeOptionalConfig.tableFormat">
          <v-list-item dense class="mt-n2">
            <div class="choice-item-wrapper align-self-stretch mx-n4"> <!--mt-n2-->
<!--              grid-template-columns: 80px 120px 1fr;-->
              <div class="row-item-choice row-item-choice-header fill-height"
                   style="display: grid;"
                   :style="typeOptionalConfig['colHeaders'][0]['rowStyle']">
                <template v-for="header in typeOptionalConfig['colHeaders']">
                  <div class="row-item-choice--cell d-flex align-center">
                    <div class="th-item">
                      <strong style="font-weight: bold; font-size: 10px;">{{header.label}}</strong>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </v-list-item>
        </template>
      </template>
      <template v-slot:item="data">
        <template v-if="typeOptionalConfig.tableFormat">
          <div class="choice-item-wrapper mx-n4 align-self-stretch"> <!--mx-n4-->
            <div class="row-item-choice fill-height"
                 style="display: grid;"
                 :style="typeOptionalConfig['colHeaders'][0]['rowStyle']">
              <template v-for="header in typeOptionalConfig['colHeaders']">
                <div class="row-item-choice--cell">
                  <div class="th-item">
                      <span class="caption">
                        <TextHighlight :queries="queries"  :case-sensitive="caseSensitive" :diacritics-sensitive="diacriticsSensitive">
                          {{data.item[header.value]}}
                        </TextHighlight>
                      </span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-avatar v-if="isAvatar || data.item['avatar']">
              <template v-if="dotPropToAvatar(data.item)">
                <img :src="dotPropToAvatar(data.item)" alt=""/>
              </template>
              <template v-else>
                <span class="headline">
                  {{dotPropToText(data.item).substring(0,2)}}
                </span>
              </template>
            </v-list-item-avatar>
            <!--<v-list-item-action v-else-if="typeOptionalConfig.itemFavicon">
              <template v-if="typeOptionalConfig.itemFavicon">
                <FaviconAvatar :size="20" :value="data.item[typeOptionalConfig.itemFavicon]"/>
              </template>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title class="caption">
                <TextHighlight :queries="queries" :case-sensitive="caseSensitive" :diacritics-sensitive="diacriticsSensitive">
<!--                  {{ data.item[typeOptionalConfig.itemText] }}-->
                  {{dotPropToText(data.item)}}
                </TextHighlight>
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
  import TextHighlight from "vue-text-highlight"
  import dotProp from "dot-prop"
  import Wk from "~/sat-vue-toolkit/workers/choices.worker"
  import FaviconAvatar from "~/sat-vue-toolkit/components/Common/FaviconAvatar"
  // let worker = new Worker()
  export default {
    name: "FormFieldChoices",
    props: {
      vBind: {
        type: Object,
        default: () => ({})
      },
      label: {},
      items: {
        type: Array,
        default: () => [],
        validator: (value) => {
          return Array.isArray(value)
        }
      },
      value: {},
      multiple: {
        type: Boolean,
        default: () => false
      },
      limitCount: {
        type: Number,
        default: () => 2
      },
      typeOptionalConfig: {
        type: Object,
        default: () => ({
          itemText: "label",
          itemValue: "value",
          tableFormat: false,
          colHeaders: []
        })
      }
    },
    components: {
      FaviconAvatar,
      TextHighlight
    },
    data () {
      return {
        search: "",
        asyncItems: [],
        w: new Wk(),
        caseSensitive: false,
        diacriticsSensitive: false,
        isFetching: false

      }
    },
    created () {

    },
    mounted () {
      this.w.onmessage = this.onReceived
    },
    computed: {
      queries () {
        let { search } = this
        let query = search || ''
        query = query.toString()
        return query.split(/\s+/) || []
      },
      urlJson() {
        let {typeOptionalConfig = {}} = this
        return typeOptionalConfig.urlJson
      },
      combinedItems() {
        let { typeOptionalConfig: { asyncData, urlJson }, items, asyncItems } = this
        console.error('combinedItems',asyncData , urlJson)
        if (asyncData && urlJson) {
          return this.asyncItems
        }
        return this.items
      },
      isAvatar() {
        let {typeOptionalConfig: { itemAvatar, itemFavicon }} = this
        return itemAvatar || itemFavicon
      }
    },
    methods: {
      dotPropToText(item) {
        let {typeOptionalConfig: {dotPropText, itemText}} = this
        if(dotPropText && Array.isArray(dotPropText)) { // [ "name.first", "name.last" ]
          return dotPropText.map(d => {
            return `${dotProp.get(item, d)}`
          }).join(' ')
        }
        return item[itemText] || ''
      },
      dotPropToAvatar(item) {
        let {typeOptionalConfig: { itemAvatar, itemFavicon }} = this
        let urlAvatar = false
        if(item['avatar']) {
          urlAvatar = dotProp.get(item, 'avatar')
        }else if(itemAvatar) {
          urlAvatar = dotProp.get(item, itemAvatar)
        }else if(itemFavicon) {
          urlAvatar = dotProp.get(item, itemFavicon)
          if(Boolean(urlAvatar)) {
            urlAvatar = `https://www.google.com/s2/favicons?domain_url=${urlAvatar}`
          }
        }
        return urlAvatar
        /*let isValidAvatar = Boolean(urlAvatar)
        let isAvatar = Boolean(itemAvatar) || Boolean(itemFavicon)
        let strText = dotProp.get(item, itemText)
        strText = strText || ''
        let subStrText = strText.substring(0,2)
        return  {
          urlAvatar, isValidAvatar, isAvatar, subStrText
        }
        return urlAvatar*/
      },
      fetchAsyncJson(v) {
        // asyncData

        let { typeOptionalConfig: { asyncData, urlJson, headerJson = {} } } = this
        if (asyncData && urlJson) {
          this.w.postMessage({ url: urlJson, headerJson, type: urlJson })
        }
      },
      onReceived ({ data }) {
        if(data['type'] === this.urlJson) {
          console.error('RECEIVED', { typeOptionalConfig: this.typeOptionalConfig })
          this.asyncItems = JSON.parse(data["stringData"])
          // this.isFetching = true
        }else if(data['type'] === 200) {
          this.isFetching = false
        }else if(data['type'] === 'fetching') {
          this.isFetching = true
        }
      },
      customFilter (item, queryText, itemValueText) {
        let {typeOptionalConfig: {itemValue, itemText, dotPropText}} = this
        const searchText = queryText.toLowerCase()
        if(dotPropText && Array.isArray(dotPropText)) {
          let allText = dotPropText.map(t => `${dotProp.get(item, t)}`)
          return allText.filter(t => {
            let str = t.toString() || ''
            str = str.toLowerCase()
            return str.indexOf(searchText) > -1
          }).length > 0
        }
        const textOne = item[itemText].toString().toLowerCase()
        // textOne = textOne.toString()
        // textOne = textOne.toLowerCase()
        const textTwo = item[itemValue].toString().toLowerCase()
        // textTwo = textTwo.toString()
        // textTwo = textTwo.toLowerCase()
        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
    },
    watch: {
      urlJson: {
        immediate: true,
        handler: 'fetchAsyncJson'
      }
    },
    beforeDestroy () {
      this.w.terminate()
      this.w = undefined
    }
  }
</script>

<style scoped lang="scss">
  .choice-item-wrapper {
    /*border: solid 1px red;*/
    max-width: 45vw;
  }

  .row-item-choice {
    /*border: solid 1px red;*/
    /*width: 450px;*/
    border-left: solid 1px rgba(0, 0, 0, 0.05);
    border-top: solid 1px rgba(0, 0, 0, 0.05);
    flex: 1;
    display: flex;
    display: grid;
    margin-top: -1px;
    /*grid-template-columns: 80px 120px 1fr;*/
    &.row-item-choice-header {
      border-top: none;

      .row-item-choice--cell {
        border-top: solid 1px rgba(0, 0, 0, 0.05);
        padding: 0;
      }
    }

    .row-item-choice--cell {
      border: solid 1px rgba(0, 0, 0, 0.05);
      border-left: none;
      border-top: none;

      .th-item {
        padding: 5px;
      }

      &:last-child {
        border-right: none;
      }

    }
  }
</style>
