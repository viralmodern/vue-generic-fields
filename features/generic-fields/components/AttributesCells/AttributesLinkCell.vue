<template>
  <div>
    <v-form ref="formLinkCell" @submit.prevent="addNew">
      <v-text-field
        :rules="linkRules"
        label="Add a new link"
        v-model="text"
        dense
        outlined
        append-outer-icon="mdi-plus"
        @keyup.enter="addNew"
        @click:append-outer="addNew"
        hide-details
      />
    </v-form>
    <v-list dense shaped v-if="list.length">
      <v-subheader>Links</v-subheader>
      <template v-if="multiple">
        <template v-for="item in list">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>
                <nuxt-link to="#link" v-text="item" />
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon @click="clearLink(item)">
              <v-icon small>mdi-close</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </template>
      <template v-else>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link to="#link" v-text="list" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon @click="list = ''">
            <v-icon small>mdi-close</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import mx_emailRules from '../../../../mixins/mx_emailRules'

export default {
  name: 'AttributesLinkCell',
  mixins: [mx_emailRules],
  data() {
    return {
      text: '',
      list: []
    }
  },
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addNew() {
      if (!this.text) return
      if (this.multiple) {
        console.log('addNew', arguments)
        this.list.push(this.text)
      } else {
        this.list = this.text
      }
      // this.text = ''
      this.$refs.formLinkCell.reset()
      return false
    },
    clearLink(item) {
      console.log(item, typeof item, this.list)
      try {
        let _index = this.list.findIndex((i) => i === item)
        this.list.splice(_index, 1)
      } catch (e) {
        console.log('clearLink', e.message)
      }
    }
  },
  watch: {
    list: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
