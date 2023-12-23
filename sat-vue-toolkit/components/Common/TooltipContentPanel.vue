<template>
  <v-card flat>
    <v-card-text>
      <template v-for="(item, index) in items">
        <div class="row">
          <template v-if="index !== 0">
            <v-col cols="12">
              <v-divider/>
            </v-col>
          </template>
          <v-col cols="12" md="3" class="py-0">
            <div class="d-flex align-center">
              <v-icon small>
                {{item.icon}}
              </v-icon>
              <div class="mx-1"></div>
              <div class="caption">
                {{item.label}}
              </div>
            </div>
          </v-col>
          <!--<v-col cols="12" md="6" class="py-0">
            <div>
              {{item.value}}
            </div>
          </v-col>-->
          <v-col cols="12" md="6" class="py-0">
            <!--<p>
              {{item['k']}}
            </p>-->
            <div class="mt-n2">
              <template v-for="v in item['value']">
                <div class="my-2">
                  <template v-for="k in item['k']">
                    <div>
                      <strong class="caption font-weight-bold">{{k}}</strong>:
                      <span class="caption">{{v[k]}}</span>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </v-col>

        </div>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
  import dotProp from "dot-prop"

  export default {
    name: "TooltipContentPanel",
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      row: {
        type: Object,
        default: () => ({})
      },
      attributes: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      attributeHasTooltip () {
        return this.attributes.filter(attribute => attribute.tooltipsValue)
      },
      items () {
        let { attributes, row } = this
        return attributes.map(attribute => {
          let temp = {}
          let name = attribute["name"]
          let label = attribute["label"]
          let k = attribute["tooltipsValue"]
          let value = row[name]
          value = Array.isArray(value) ? value : [value]
          k = typeof k === "string" ? [k] : k
          temp['text'] = this.getTextTooltip(k, value)
          temp["label"] = label
          temp["value"] = value
          temp["k"] = k
          temp["icon"] = attribute["icon"]
          return temp
        })
      }
    },
    methods: {
      dotPropText(k = [], item = {}) {
        return k.map(value => {
          let text = dotProp.get(item, value)
          let textValue = value.toString()
          let strValue = textValue.split(".")
          return {
            value: strValue[0],
            text
          }
        })
      },
      getTextTooltip(k = [], items = []) {
        let results = []
        items.forEach(item => {
          let val = k.map(value => {
            let text = dotProp.get(item, value)
            let textValue = value.toString()
            let strValue = textValue.split(".")
            return {
              value: strValue[0],
              text
            }
          })
          results = [...results, ...val]
        })
        return results
      }
    }
  }
</script>

<style scoped>

</style>
