<template>
  <v-card :loading="loading" width="100%" min-width="200px">
    <v-card-text class="pb-0">
      <v-text-field outlined
                    v-model="val"
                    autofocus
                    ref="flop"
                    clearable
                    :label="`Create new ${attribute.shortLabelTitle.toLowerCase()}`"
                    @keydown.enter="save"
                    dense>
        <template v-slot:append>
          <!--<v-menu :close-on-content-click="false">
            <template v-slot:activator="{on}">
              <v-btn icon small v-on="on" :color="color" title="Set color">
                <v-icon small>mdi-tag</v-icon>
              </v-btn>
            </template>
            <v-color-picker v-model="color"></v-color-picker>
          </v-menu>-->
          <v-btn small color="primary" icon @click="save" title="Create">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-card-text>
    <v-list dense>
      <template v-for="(item, index) in currentItems">
        <v-divider v-if="index !== 0" :key="`drv-${index}`"/>
        <v-hover v-slot:default="{hover}" :key="`lst-${index}`">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title>
                <template v-if="attribute.chips">
                  <v-chip>{{item | getTextTag}}</v-chip>
                </template>
                <template v-else>
                  {{item | getTextTag}}
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="delUrl(item)"
                     small
                     color="error">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-hover>
      </template>
      <v-list-item v-if="!currentItems || (currentItems && !currentItems.length)">
        <v-list-item-content>
          <v-list-item-subtitle>
            No {{` ${attribute.shortLabelTitle.toLowerCase()}`}} available
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"
  export default {
    name: "LabelsSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: "",
        createNew: false,
        loading: false,
        currentItems: []
      }
    },
    watch: {
      value: {
        immediate: true,
        deep: true,
        handler(v) {
          if(Boolean(v)) {
            this.currentItems = v
          }
        }
      }
    },
    methods: {
      async delUrl (url) {
        if (this.loading) {
          return
        }
        if (!window.confirm(`Want to delete ${url}?`)) {
          return
        }
        try {
          this.loading = true
          let {currentItems} = this
          let k = this.attribute.name
          let items = [...currentItems]
          let urls = items.filter(item => item !== url)
          let res = await this.$api.patch(this.endPoint, { [k]: urls })
          let data = res["data"]
          this.currentItems = data[k]
          this.$$execute({ val: data[k] })
        } catch (e) {

        } finally {
          this.loading = false
        }

      },
      async save (e) {
        let {loading, val, currentItems, createNew} = this
        if (loading) {
          return
        }
        let k = this.attribute.name
        try {
          if (!val.length) {
            return
          }
          this.loading = true
          let tag = `${val}`
          let urls = [...currentItems, tag]

          if (createNew) {
            // todo create new
            this.$$execute({ val: urls })
            this.currentItems = urls
            this.$refs.flop.reset()
          } else {
            // todo update
            let res = await this.$api.patch(this.endPoint, { [k]: urls })
            let data = res["data"]
            this.currentItems = data[k]
            this.$$execute({ val: data[k] })
            this.$refs.flop.reset()
          }
        } catch (e) {

        } finally {
          this.loading = false
        }
      },
      resetState (show) {
        if (!show) {
          this.loading = false
          this.createNew = false
          this.val = ""
        }
      },
      getColorTag (tag) {
        let colorList = tag.split("#")
        return `#${colorList[colorList.length - 1]}`

      }
    },
    filters: {
      getTextTag (tag) {
        let colorList = tag.split("#")
        return colorList[0].trim()

      },
      getColorTag (tag) {
        let colorList = tag.split("#")
        return `#${colorList[colorList.length - 1]}`
      },

    }
  }
</script>
<style scoped></style>


