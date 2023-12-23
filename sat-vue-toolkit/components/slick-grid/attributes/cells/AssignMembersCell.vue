<template>
  <div class="d-flex justify-center align-center w-100" title="Assign members">
    <v-btn small icon @click="change">
      <v-icon small class="cursor--pointer">
        mdi-account-multiple-plus
      </v-icon>
    </v-btn>
    <div class="flex-grow-1 text-left d-flex flex-wrap" style="border: solid 1px transparent">
      <template v-if="val">
        <template v-for="(member, index) in convertValToValuesObject">
          <v-hover :key="`mb-cell-item-${index}`" v-slot:default="{hover}">
            <div class="ma-1 position-relative" :title="member | l_name">
              <v-btn v-if="isOwnerRow"
                     absolute
                     top
                     right
                     x-small
                     @click.stop="delMember(member)"
                     :class="{hide_base: !hover, show_base: hover}"
                     icon :width="15" :height="15"
                     style="z-index: 2; top: -5px; right: -5px; background: #000"
                     dark
                     color="#000">
                <v-icon x-small color="white">
                  mdi-close
                </v-icon>
              </v-btn>
              <!--              <UserDetail :pk="member"/>-->
              <v-avatar color="primary" size="25">
                <template v-if="getAvatar(member)">
                  <img :src="getAvatar(member)">
                </template>
                <span v-else class="text-uppercase white--text">
                  {{member | l_name | $$strName}}
                </span>
              </v-avatar>

            </div>
          </v-hover>
        </template>
      </template>
    </div>

  </div>
</template>

<script>
  import difference from 'lodash/difference'
  import {$$strName} from "@/sat-vue-toolkit/functions";
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "AssignMembersCell",
    mixins: [mxAttributeItem],
    data() {
      return {
        val: null
      }
    },
    computed: {
      convertValToValuesObject() {
        // todo return object value
        let {val} = this
        let {itemValue, returnObject, list} = this.$$attribute
        if(returnObject) return val.map(v => {
          let item;
          item = list.filter(t => t[itemValue] == v[itemValue])[0]
          return item
        })
        // todo return flat value
        return val.map(v => {
          // todo if typeof v is object
          let isObject = false, item;
          isObject = typeof v === "object"
          if(isObject) {
            item = list.filter(t => t[itemValue] == v[itemValue])[0]
          }else {
            item = list.filter(t => t[itemValue] == v)[0]
          }
          return item
        })
      },
      mth() {
        let {innerScope} = this.$$attribute
        return innerScope ? 'patch' : 'post'
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          try {
            this.val = v
          }catch (e) {
          }
        }
      }
    },
    methods: {
      getAvatar(mb) {
        try {
          let {itemAvatar} = this.$$attribute
          return mb[itemAvatar] || mb['avatar']
        }catch (e) {
          return false
        }
      },
      change(e) {
        this.$$openDropDownSource(e, {$$execute: this.updateMember})
      },
      async updateMember(data) {
        try {
          let {val, value, mth, endPoint} = this
          let {returnObject, name, innerScope} = this.$$attribute
          const vm = this
          let current_val = val
          let new_val = value
          let res_val = difference(new_val, current_val);
          if(!res_val.length) return
          if(returnObject) {
            res_val = res_val.map(pk => ({
              user: pk
            }))
          }
          let res = await vm.$api[mth](endPoint, {[name]: val})
          if(innerScope) {
            let row = res['data'][name]
            vm.$$execute({fieldData: row})
          }else {
            let row = res['data']
            vm.$$execute({fieldData: row})
          }
        } catch (e) {
          console.log(e.message)
        }
      },
      async delMember(mb) {
        try {
          let {returnObject, name, innerScope, itemValue} = this.$$attribute
          let {endPoint, mth, $api, convertValToValuesObject} = this
          if(innerScope) {
            let val = [...convertValToValuesObject].filter(user => user[itemValue] !== mb[itemValue])
            if(returnObject) {
              val = val.map(u => ({
                user: u[itemValue]
              }))
            }else {
              val = val.map(u => u[itemValue])
            }
            let res = await $api[mth](`${endPoint}`, {[name]: val})
            let row = res['data'][name]
            // this.val = row
            this.$$execute({fieldData: row})
          }else {
            let row = [...convertValToValuesObject].filter(user => user[itemValue] !== mb[itemValue])
            await $api.delete(`${endPoint}${mb[itemValue]}`)
            // this.val = row
            this.$$execute({fieldData: row})
          }

        } catch (e) {

        }
      }
    },
    filters: {
      $$strName,
      l_name(mb) {
        try {
          return mb['name']
        }catch (e) {
          return ''
        }
      },

    }
  }
</script>

<style scoped>

</style>
