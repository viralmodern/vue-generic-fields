<template>
  <v-autocomplete
    v-model="selected"
    :items="items"
    dense
    :solo="solo"
    :outlined="outlined"
    :multiple="multiple"
    hide-details
    return-object
    color="blue-grey lighten-2"
    :label="placeholder"
    :item-text="text"
    :item-value="val"
    @change="change"
  >
    <template v-slot:selection="data">
      <v-avatar v-bind="data.attrs" left color="teal" size="25" class="mr-2">
        <v-img v-if="data.item.avatar" :src="data.item.avatar"></v-img>
        <span
          v-else
          class="white--text text-uppercase"
          style="font-size: 75%;"
          >{{ data.item.name | $$strName }}</span
        >
      </v-avatar>
    </template>
    <template v-slot:item="data">
      <v-list-item-avatar color="primary">
        <span class="white--text text-uppercase" style="font-size: 75%;">{{
          data.item.name | $$strName
        }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span
            style="
              max-width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
            "
            >{{ data.item.username }}</span
          >
        </v-list-item-title>
        <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'autocomplete-list',
  data: () => ({
    showMenu: false,
    selected: null,
  }),
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'title',
    },
    text: {
      type: String,
      required: false,
      default: 'name',
    },
    val: {
      type: String,
      required: false,
      default: 'pk',
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    solo: {
      type: Boolean,
      default: () => true,
    },
    outlined: {
      type: Boolean,
      default: () => false,
    },
  },
  mounted() {
    try {
      if (this.multiple) {
        this.selected = this.value
      } else {
        this.selected = this.value[0]
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  computed: {
    ...mapGetters({
      list: 'workspace/workspaceMembers',
      findMemberByID: 'workspace/findMemberByID',
      pending: 'workspace/pending',
    }),
  },
  methods: {
    remove() {},
    change(item) {
      try {
        // no props
        if (this.value.length === 0)
          return this.$emit('change', { items: item })
        // has props
        let members = _.differenceBy([...this.value], [...item], this.val)
        if (members.length === 0) return this.$emit('change', { items: [] })
        this.$emit('change', { items: members })
      } catch (e) {
        console.log('update_members', e.message, item)
        this.$emit('change', { items: item })
      }
    },
  },
  watch: {
    value(n) {
      console.log('showMenu', n)
      this.selected = n
    },
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped></style>
