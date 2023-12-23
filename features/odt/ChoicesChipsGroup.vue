<template>
  <div>
    <div class="d-flex align-center">
      <template v-if="multiple">
        <v-checkbox
          hide-details
          :ripple="false"
          dense
          class="ma-0"
          color="indigo"
          v-model="isCheckedAll"
          :disabled="disabled"
        >
          <template v-slot:label>
            <strong>{{ category['label'] }}</strong>
          </template>
        </v-checkbox>
      </template>
      <template v-else>
        <strong>{{ category['label'] }}</strong>
      </template>
      <v-spacer />
    </div>
    <v-chip-group
      :value="value"
      active-class="primary--text"
      column
      multiple
      @change="handleChange"
    >
      <template v-for="(choice, index) in list">
        <v-chip filter outlined :value="choice[itemValue]">
          {{ choice[itemText] }}
        </v-chip>
      </template>
    </v-chip-group>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  name: 'ChoicesChipsGroup',
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: () => false,
    },
    category: {
      type: Object,
      default: () => ({}),
    },
    list: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: () => 'label',
    },
    itemValue: {
      type: String,
      default: () => 'value',
    },
  },
  data() {
    return {
      isCheckedAll: false,
    }
  },
  mounted() {
    this.$watch('isCheckedAll', this.handleCheckAll)
  },
  computed: {
    disabled() {
      let { list } = this
      return Boolean(list && list.length <= 0)
    },
    choseAll() {
      let { list, itemValue } = this
      return [...list].map((l) => l[itemValue])
    },
    clearAll() {
      let { multiple } = this
      return (multiple && []) || ''
    },
  },
  methods: {
    handleChange(v) {
      let { choseAll } = this
      let s1 = md5(v.sort())
      let s2 = md5(choseAll.sort())
      // console.log({s1, s2, v, choseAll})
      // todo emit value
      this.$emit('input', v)
      // todo check map is selected all value
      let isCheckedAll = s1.localeCompare(s2) === 0
      this.isCheckedAll = isCheckedAll
    },
    handleCheckAll(ev) {
      let { isCheckedAll, choseAll, clearAll, value } = this
      if (isCheckedAll) {
        this.$emit('input', choseAll)
      } else {
        if (md5(value).localeCompare(md5(choseAll)) === 0) {
          // todo if selected equal to with all value of list props
          this.$emit('input', clearAll)
        } else {
          this.$emit('input', value)
        }
      }
    },
  },
}
</script>

<style scoped></style>
