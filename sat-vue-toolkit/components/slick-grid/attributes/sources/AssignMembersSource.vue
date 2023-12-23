<template>
  <v-autocomplete placeholder="Members"
                  v-model="val"
                  :items="attribute.list"
                  single-line
                  @blur="change"
                  multiple
                  solo
                  :menu-props="{'close-on-content-click': false}"
                  :item-value="attribute.itemValue"
                  :item-text="attribute.itemText"
                  cache-items
                  hide-selected
                  hide-details>
    <!--<template v-slot:selection="data">
      <v-avatar left color="primary" :title="data.item | getName"
                :size="25"
                class="ma-1">
        <v-img v-if="data.item.avatar" :src="data.item | getAvatar"></v-img>
        <span v-else class="white&#45;&#45;text" style="font-size: 75%">
            {{data.item | getName | $$strName}}
          </span>
      </v-avatar>
    </template>-->

    <!--<template v-slot:item="data">
      <v-list-item-avatar color="primary" class="dark">
        <img v-if="data.item.avatar" :src="data.item | getAvatar">
        <span v-else class="white&#45;&#45;text">
            {{data.item | getName | $$strName}}
          </span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{data.item | getName}}
        </v-list-item-title>
      </v-list-item-content>
    </template>-->
  </v-autocomplete>
</template>
<script>
  import { $$strName } from "@/sat-vue-toolkit/functions"
  import baseSourceProps from "../../configs/props/baseSourceProps"

  export default {
    name: "AssignMembersSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: ""
      }
    },
    watch: {
      value: {
        immediate: true,
        deep: true,
        handler (v) {
          this.val = v
        }
      }
    },
    methods: {
      change (val) {
        try {
          this.$$execute({ value: this.val })
          // this.uiShowMenu = false
        } catch (e) {

        }
      }
    },
    filters: {
      label (v) {
        try {
          return v.name
        } catch (e) {
          return v
        }
      },
      getAvatar (item) {
        let avatar = item.avatar,
          pk = item.pk,
          name = `${item.first_name}${item.last_name}`
        pk = pk.toString()
        name = name.length ? name : pk
        return avatar ? avatar : name
      },
      getName (item) {
        let pk = item.pk,
          name = `${item.first_name}${item.last_name}`
        pk = pk.toString()
        name = name.length ? `${item.first_name} ${item.last_name}` : pk
        return name
      },
      $$strName
    }
  }
</script>
<style scoped></style>


