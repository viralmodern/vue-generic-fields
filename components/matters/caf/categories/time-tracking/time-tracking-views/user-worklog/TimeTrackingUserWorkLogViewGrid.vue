<template>
  <div>
    <TableGrid
      :headers="headersItem"
      :desserts="desserts"
      hide-default-header
      @clickCellItem="clickCellItem"
    >
      <template v-slot:item.user="{ props: { row, item } }">
        <div class="text-no-wrap d-flex align-center">
          <v-avatar :size="20">
            <img :src="item.user.avatar" :alt="item.user.name" />
          </v-avatar>
          &nbsp;{{ item.user.name }}
        </div>
      </template>
      <template v-slot:item.total_time="{ props: { row, item } }">
        <v-edit-dialog>
          <div class="text-no-wrap">
            <strong>
              {{ item.total_time }}
            </strong>
          </div>
          <template v-slot:input>
            <div class="" style="max-width: 600px;">
              <v-list dense>
                <template v-for="(item, index) in entries">
                  <v-list-item :key="`l-${index}`">
                    <v-list-item-action>
                      <v-icon>mdi-drag</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.words }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>
                        <strong>{{ item.hours }}</strong> hours
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider
                    v-if="index !== entries.length - 1"
                    :key="`d-${index}`"
                  />
                </template>
              </v-list>
            </div>
          </template>
        </v-edit-dialog>
      </template>
      <template v-for="(header, idx) in headersItem">
        <!--        <div :slot="`item.${header.value}`" slot-scope="data">-->
        <!--<div :slot="`item.${header.value}`" :slot-scope="props">
          &lt;!&ndash;{{props}}&ndash;&gt;
          {{props}}
        </div>-->
      </template>
    </TableGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../../utils/TableGrid'
import dateTime from '../../../../../../../mixins/mx_dateTime'
import _ from 'lodash'
import faker from 'faker'

let dummyData = 5
export default {
  name: 'TimeTrackingUserWorkLogViewGrid',
  components: { TableGrid },
  mixins: [dateTime],
  data() {
    return {}
  },
  props: {
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    type: {
      type: String,
      default: 'week' // month | day | week
    }
  },
  computed: {
    headersItem() {
      return [
        {
          text: 'User',
          align: 'left',
          sortable: false,
          value: 'user',
          active: true
        },
        {
          text: 'Total',
          align: 'left',
          sortable: false,
          value: 'total_time',
          active: true
        },
        ...this.uniqTimes()
      ]
    },
    desserts() {
      return this.genericDesserts()
    },
    entries() {
      return [1, 2, 3, 4, 5].map((i) => ({
        text: faker.lorem.slug(),
        word: faker.lorem.word(),
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        url: faker.internet.url(),
        hours: faker.random.number()
      }))
    }
  },
  methods: {
    uniqTimes() {
      return _.uniqBy(
        this.$$enumerateDaysBetweenDates({
          startDate: this.startDate,
          endDate: this.endDate
        }).map((i) => {
          return {
            text: this.strHead(i),
            value: this.strHead(i)
          }
        }),
        'value'
      )
    },
    strHead(objDate) {
      switch (this.type) {
        case 'week':
          try {
            // return `week ${objDate.week}, ${objDate.year}`
            return `week ${objDate.date.format('w, YYYY')}`
          } catch (e) {
            throw e.message
          }
        case 'day':
          try {
            return `${objDate.date.format('dd, DD MMMM, YYYY')}`
          } catch (e) {
            throw e.message
          }
        default:
          try {
            // MMMM
            return `${objDate.date.format('MMMM, YYYY')}`
          } catch (e) {
            throw e.message
          }
      }
    },
    genericDesserts() {
      let data = []
      for (let i = 0; i < dummyData; i++) {
        let temp = {}
        this.uniqTimes().forEach((i, k) => {
          temp[i.value] = faker.random.number() + ' h'
          temp['total_time'] = faker.random.number() + ' h'
          temp['user'] = {
            name: faker.name.findName(),
            avatar: faker.internet.avatar()
          }
        })
        data.push(temp)
      }
      return data
    },
    clickCellItem() {
      // alert(1)
    }
  }
}
</script>

<style scoped></style>
