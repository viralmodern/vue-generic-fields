<template>
  <div>
    <ChooseItems
      v-model="select"
      :items="list"
      multiple
      label-header="Emails"
      :create-new-search="false"
    >
      <template v-slot:content="props">
        <div class="d-flex align-center">
          <div>
            <div class="fa-user-plus1" title="Set Email" v-on="props.on">
              <v-icon x-small color="#c1c2c3">
                {{ attrType | getIcon }}
              </v-icon>
            </div>
          </div>
          <div class="flex-grow-1">
            <div style="min-width: 150px;">
              <template v-for="item in select">
                <v-chip small class="ma-1" :key="item[itemValue]">{{
                  item[itemText]
                }}</v-chip>
              </template>
            </div>
          </div>
        </div>
      </template>
    </ChooseItems>
  </div>
</template>

<script>
import ChooseItems from '../../../../components/utils/ChooseItems'
import { getAttributeByProp } from '../../fields_config'
import faker from 'faker'
import _ from 'lodash'
export default {
  name: 'AttributesEmailCell',
  components: { ChooseItems },
  props: {
    attrType: {}
  },
  data() {
    return {
      select: '',
      itemText: 'name',
      itemValue: 'pk'
    }
  },
  computed: {
    list: {
      get() {
        let _temp = [],
          _length = 5
        // _.forEach()
        for (let i = 0; i < _length; i++) {
          let _ob = {
            pk: faker.random.number(),
            name: faker.internet.email()
          }
          _temp.push(_ob)
        }
        return _temp
      }
    }
  },
  filters: {
    getIcon(type) {
      console.log('XO', getAttributeByProp({ type, prop: 'icon' }))
      return getAttributeByProp({ type, prop: 'icon' })
    }
  }
}
</script>

<style scoped></style>
