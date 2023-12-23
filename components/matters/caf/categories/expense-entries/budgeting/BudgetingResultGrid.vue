<template>
  <div>
    <TableGrid
      @resetFields="({ fields }) => (headers = fields)"
      hide-default-header
      hide-default-footer
      :desserts="desserts"
      :headers="reduceHeaders"
      @click-header="clickHeader"
    >
      <template v-slot:header.actual>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <div class="d-flex align-center" v-on="on">
              Expense Actual
              <v-icon class="ml-1">mdi-menu-down</v-icon>
            </div>
          </template>
          <v-card flat max-width="250" class="mx-auto">
            <v-list two-line dense>
              <v-subheader>Expense Logs</v-subheader>
              <v-list-item-group
                v-model="selected"
                active-class="primary--text"
              >
                <template v-for="(item, index) in items">
                  <v-list-item style="min-height: unset" :key="item.title">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon v-if="active" color="success">
                          mdi-check
                        </v-icon>
                        <v-icon v-else style="opacity: 0;" color="grey">
                          mdi-check
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider
                    v-if="index + 1 < items.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
            <v-list-item link>
              <small>
                <v-icon>mdi-magnify</v-icon>
                Show in expense logs
              </small>
            </v-list-item>
          </v-card>
        </v-menu>
      </template>
      <template v-slot:item.members="{ props: { row, item } }">
        <div class="d-flex align-center">
          <AvatarItem :title="item.members.name" :src="item.members.avatar" />
          <div class="px-2">
            {{ item.members.name }}
          </div>
        </div>
      </template>
      <template v-slot:item.variance="{ props: { row, item } }">
        <v-chip color="primary" small
          >{{ $formatTimeToDay(item.variance) }}
        </v-chip>
      </template>
      <template v-slot:item.remaining="{ props: { row, item } }">
        <v-chip color="primary" small
          >{{ $formatTimeToDay(item.remaining) }}
        </v-chip>
      </template>
      <template v-slot:item.estimate="{ props: { row, item } }">
        <v-chip color="primary" small
          >{{ $formatTimeToDay(item.estimate) }}
        </v-chip>
      </template>
      <template v-slot:item.variance="{ props: { row, item } }">
        <v-chip color="primary" small
          >{{ $formatTimeToDay(item.variance) }}
        </v-chip>
      </template>
      <template v-slot:item.actual="{ props: { row, item } }">
        <v-chip color="primary" small
          >{{ $formatTimeToDay(item.actual) }}
        </v-chip>
      </template>
      <template v-slot:foot-rows>
        <tr style="background: #f4f5f7">
          <template v-for="(header, index1) in headers">
            <td :key="'fox-foo-' + index1" v-if="header['active']">
              <template v-if="index1 === 0">
                <div class="text-right font-weight-bold">Total:</div>
              </template>
              <template v-else>
                <strong>16d 6h</strong>
              </template>
            </td>
          </template>
        </tr>
      </template>
    </TableGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import AvatarItem from '../../../../../utils/AvatarItem'
import dateTime from '../../../../../../mixins/mx_dateTime'
import DialogPicker from '../../../../../utils/DialogPicker'

export default {
  name: 'BudgetingResultGrid',
  components: { DialogPicker, AvatarItem, TableGrid },
  mixins: [dateTime],
  data() {
    return {
      headers: [
        {
          text: 'Members',
          align: 'left',
          sortable: false,
          value: 'members',
          active: true
        },
        { text: 'Actual Expense', value: 'actual', active: true },
        { text: 'Original Estimate', value: 'estimate', active: true },
        { text: 'Est. Expense Remaining', value: 'remaining', active: true },
        { text: 'Variance', value: 'variance', active: true }
      ],
      desserts: [
        {
          variance: 159,
          remaining: 159,
          estimate: 159,
          actual: 35,
          members: {
            pk: 1,
            avatar: null,
            first_name: 'Vio',
            last_name: 'Let',
            name: 'Violet',
            username: 'violet',
            email: 'violet@mailinator.com'
          }
        },
        {
          variance: 159,
          remaining: 159,
          estimate: 159,
          actual: 35,
          members: {
            pk: 1,
            avatar: null,
            first_name: 'Viet',
            last_name: 'Duc',
            name: 'Viet Duc',
            username: 'vietho',
            email: 'viet@mailinator.com'
          }
        }
      ],

      uiShowDialogActual: false,

      selected: [0],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend."
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?'
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?'
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
        }
      ]
    }
  },
  computed: {
    reduceHeaders() {
      return this.headers.filter((h) => h.active)
    }
  },
  methods: {
    clickHeader(header) {
      if (header === 'actual') {
        // this.uiShowDialogActual = true
      }
    },
    submit() {}
  }
}
</script>

<style scoped></style>
<style>
.v-small-dialog__content {
  max-height: 90vh;
  padding: 0px;
}
</style>
