<template>
  <div>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search expense" />
        <v-spacer />
        <MenuGroupByExpenseLogs />
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            @resetFields="({ fields }) => (headers = fields)"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <TableGrid
      to-model="expenses.expense"
      :search="search"
      :headers="fields"
      hide-default-footer
      hide-default-header
      :desserts="desserts"
    >
      <template v-slot:item.action="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Action</v-subheader>
              <v-list-item link exact color="error">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link exact>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link exact>
                <v-list-item-content>
                  <v-list-item-title>View detail</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.receipt="{ props: { row, item } }">
        <v-edit-dialog
          cancel-text="Cancel"
          large
          :return-value.sync="item.expense_description"
        >
          <div style="width: 200px">
            <v-btn
              depressed
              title="Attachment"
              class="text-capitalize text-caption"
            >
              <!--                mdi-paperclip-->
              Add receipt
              <v-icon right small>mdi-plus</v-icon>
            </v-btn>
          </div>
          <template v-slot:input>
            <v-card flat>
              <v-card-text>
                <v-file-input
                  hide-details
                  small-chips
                  multiple
                  label="Receipt"
                ></v-file-input>
              </v-card-text>
            </v-card>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.expense_name="{ props: { row, item } }">
        <div class="d-flex align-center">
          {{ item.expense_name }}
        </div>
      </template>
      <template v-slot:item.reference="{ props: { row, item } }">
        {{ item.reference }}
      </template>

      <template v-slot:item.expense_category="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center justify-space-between">
            <span>{{ getCate(item.expense_category) }}</span>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Category</v-subheader>
              <v-list-item
                @click="item.expense_category = cate.value"
                v-for="(cate, index1) in category"
                link
                :input-value="item.expense_category === cate.value"
                :key="index1"
                exact
              >
                <v-list-item-content>
                  <v-list-item-title>{{ cate.text }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon
                    color="success"
                    v-if="item.expense_category === cate.value"
                    >mdi-check
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.activities_code="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center justify-space-between text-no-wrap">
            <span>{{ getActivitiesCode(item.activities_code)['text'] }}</span>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Activities</v-subheader>
              <v-list-item
                @click="item.activities_code = cate.code"
                v-for="(cate, index1) in activities_code"
                link
                :input-value="item.activities_code === cate.code"
                :key="index1"
                exact
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ cate.text }}
                    <span class="grey--text">({{ cate.code }})</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon
                    color="success"
                    v-if="item.activities_code === cate.code"
                    >mdi-check
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.expense_code="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center justify-space-between text-no-wrap">
            <span>{{ getExpensesCode(item.expense_code)['text'] }}</span>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Expenses</v-subheader>
              <v-list-item
                @click="item.expense_code = cate.code"
                v-for="(cate, index1) in expenses_code"
                link
                :input-value="item.expense_code === cate.code"
                :key="index1"
                exact
                color="primary"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ cate.text }}
                    <span class="grey--text">({{ cate.code }})</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon color="success" v-if="item.expense_code === cate.code"
                    >mdi-check
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.expense_description="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div
            class="text-no-wrap"
            style="max-width: 300px; overflow: hidden; text-overflow: ellipsis"
          >
            {{ item.expense_description }}
          </div>
          <template v-slot:input>
            <v-textarea
              hide-details
              v-model="item.expense_description"
            ></v-textarea>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.billable="{ props: { row, item } }">
        <div class="dialog_center">
          <v-edit-dialog
            :return-value.sync="item.expense_description"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <v-chip
              class="d-flex text-center justify-center cusor--pointer"
              dark
              :color="billable(item.billable).color"
            >
              {{ billable(item.billable).text }}
            </v-chip>

            <template v-slot:input>
              <v-list dense shaped>
                <v-subheader>Billable</v-subheader>
                <v-list-item
                  @click="item.billable = item1.code"
                  :color="item1.color"
                  link
                  :input-value="item.billable === item1.code"
                  v-for="item1 in billables"
                  :key="item1.code"
                  exact
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item1.text }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon v-if="item.billable === item1.code" color="success"
                      >mdi-check
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </template>
          </v-edit-dialog>
        </div>
      </template>
      <template v-slot:item.paid_status="{ props: { row, item } }">
        <div class="dialog_center">
          <v-edit-dialog
            :return-value.sync="item.expense_description"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <v-chip
              class="d-flex text-center justify-center cusor--pointer"
              dark
              :color="paidStatus(item.paid_status).color"
            >
              {{ paidStatus(item.paid_status).text }}
            </v-chip>
            <template v-slot:input>
              <v-list dense shaped>
                <v-subheader>Paid status</v-subheader>
                <v-list-item
                  @click="item.paid_status = item1.code"
                  :color="item1.color"
                  link
                  :input-value="item.paid_status === item1.code"
                  v-for="item1 in paid_status"
                  :key="item1.code"
                  exact
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item1.text }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon
                      v-if="item.paid_status === item1.code"
                      color="success"
                      >mdi-check
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </template>
          </v-edit-dialog>
        </div>
      </template>
      <template v-slot:item.expense_amount="{ props: { row, item } }">
        <v-edit-dialog :return-value.sync="item.expense_amount">
          <div class="text-no-wrap">
            <span class="text-subtitle-1 font-weight-bold">{{ currency }}</span>
            <strong class="text-subtitle-1">{{ item.expense_amount }}</strong>
          </div>
          <template v-slot:input>
            <v-card-title>
              <v-text-field
                :value="item.expense_amount"
                title="Expense Amount"
                prepend-icon="mdi-currency-usd"
                type="number"
                label="Expense amount"
                flat
              ></v-text-field>
            </v-card-title>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.total_tax="{ props: { row, item } }">
        <div class="text-no-wrap">
          <span class="text-subtitle-1 font-weight-bold">{{ currency }}</span>
          <strong class="text-subtitle-1">{{ item.total_tax }}</strong>
        </div>
      </template>
      <template v-slot:item.amount_tax="{ props: { row, item } }">
        <div class="text-no-wrap">
          <span class="text-subtitle-1 font-weight-bold">{{ currency }}</span>
          <strong class="text-subtitle-1">{{ item.amount_tax }}</strong>
        </div>
      </template>
      <template v-slot:item.tax_1="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center justify-space-between text-no-wrap">
            <strong>{{ getTaxCode(item.tax_1)['text'] }}</strong>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Tax</v-subheader>
              <v-list-item
                @click="item.tax_1 = cate.code"
                v-for="(cate, index1) in tax"
                link
                :input-value="item.tax_1 === cate.code"
                :key="index1"
                exact
                color="primary"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ cate.text }}
                    <span class="grey--text">({{ cate.code }})</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon color="success" v-if="item.tax_1 === cate.code"
                    >mdi-check
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.tax_2="{ props: { row, item } }">
        <v-edit-dialog
          :return-value.sync="item.expense_description"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center justify-space-between text-no-wrap">
            <strong>{{ getTaxCode(item.tax_2)['text'] }}</strong>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
          <template v-slot:input>
            <v-list dense shaped>
              <v-subheader>Tax</v-subheader>
              <v-list-item
                @click="item.tax_2 = cate.code"
                v-for="(cate, index1) in tax"
                link
                :input-value="item.tax_2 === cate.code"
                :key="index1 + '-' + cate.code"
                exact
                color="primary"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ cate.text }}
                    <span class="grey--text">({{ cate.code }})</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon color="success" v-if="item.tax_2 === cate.code"
                    >mdi-check
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.created_by="{ props: { row, item } }">
        <link-member :ID="4">
          <div title="john@gmail.com">
            <v-avatar :size="25">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
        </link-member>
      </template>
      <template v-slot:item.source="{ props: { row, item } }">
        <v-chip-group>
          <v-chip
            small
            v-for="(source, index) in item.source"
            :key="'src-' + index"
          >
            {{ source.name }}
          </v-chip>
        </v-chip-group>
      </template>
    </TableGrid>
    <QuickViewRowGrid
      :open="uiShowQuickView"
      @close="uiShowQuickView = false"
    />
    <CreateNewRowGrid title="Expense" class="mt-2">
      <template v-slot:append-inner>
        <v-text-field
          dense
          outlined
          hide-details
          title="Expense Amount"
          prefix="$"
          type="number"
          placeholder="Expense Amount"
          flat
        ></v-text-field>
        <ChooseItems
          class="ml-2"
          :items="category"
          title="Expense category"
          :show-label-header="false"
          label-header="Expense category"
          item-text="text"
          item-value="value"
        >
        </ChooseItems>
      </template>
    </CreateNewRowGrid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import LinkMember from '../../../../../utils/LinkMember'
import { v4 as uuid } from 'uuid'
import {
  ACTIVITIES_CODE,
  BILLABLE,
  EXPENSES_CODE,
  getCodeFields,
  PAID_STATUS,
  TAX,
} from '../../../../../../mock/fields'
import MenuGroupByExpenseLogs from './MenuGroupByExpenseLogs.vue'
import SearchInput from '../../../../../utils/SearchInput.vue'
import MenuShowHideFields from '../../../../controls/MenuShowHideFields.vue'
import CustomizeFieldsTableGrid from '../../../../controls/CustomizeFieldsTableGrid.vue'
import QuickViewRowGrid from './QuickViewRowGrid.vue'
import CreateNewRowGrid from '@/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid.vue'
import ChooseItems from '../../../../../utils/ChooseItems.vue'

export default {
  name: 'TableExpenseLogs',
  components: {
    ChooseItems,
    CreateNewRowGrid,
    QuickViewRowGrid,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    SearchInput,
    MenuGroupByExpenseLogs,
    LinkMember,
    TableGrid,
  },
  data() {
    return {
      search: '',
      currency: '$',
      headers: [
        // {isDrag: true, value: "drag"},
        { text: 'Expense Name', value: 'expense_name', active: true },
        { text: 'Source', value: 'source', active: true },
        { text: 'Expense Category', value: 'expense_category', active: true },
        { text: 'Expense Code', value: 'expense_code', active: true },
        { text: 'Created by', value: 'created_by', active: true },
        { text: 'Expense Amount', value: 'expense_amount', active: true },
        {
          text: 'Expense Description',
          value: 'expense_description',
          active: true,
        },
        { text: 'Tax 1', value: 'tax_1', active: true },
        { text: 'Tax 2', value: 'tax_2', active: true },
        { text: 'Total Tax', value: 'total_tax', active: true },
        { text: 'Amount with tax', value: 'amount_tax', active: true },
        { text: 'Billable', value: 'billable', active: true },
        { text: 'Activities Code ', value: 'activities_code', active: true },
        { text: 'Reference', value: 'reference', active: true },
        { text: 'Paid Status', value: 'paid_status', active: true },
        { text: 'Expense Receipt', value: 'receipt', active: true },
        { text: 'Bill To', value: 'bill_to', active: true },
        { text: 'Action', value: 'action', active: true },
      ],
      desserts: [
        {
          // Fixed, Flat, Counseling
          pk: uuid(),
          expense_category: 2,
          expense_code: 'E103',
          created_by: 4,
          expense_amount: 1548963,
          expense_name: 'Expense Taskboard',
          expense_description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
            '      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
          source: [
            {
              content_type: 21,
              obj_id: 12,
              name: 'Card log',
            },
            {
              content_type: 21,
              obj_id: 12,
              name: 'Taskboard',
            },
          ],
          tax_1: '0',
          tax_2: '5',
          total_tax: 2562,
          amount_tax: 9603,
          billable: 2,
          activities_code: 'A101',
          reference: 'asfdgh',
          paid_status: 1,
          receipt: [{}],
          action: 'asfdgh',
        },
        {
          // Fixed, Flat, Counseling
          pk: uuid(),
          expense_category: 1,
          expense_code: 'E110',
          created_by: 4,
          expense_amount: 1548963,
          expense_name: 'Expense Entries 1',
          expense_description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
            '      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
          source: [
            {
              content_type: 21,
              obj_id: 12,
              name: 'Card log',
            },
            {
              content_type: 21,
              obj_id: 12,
              name: 'Expense',
            },
          ],
          tax_1: '10',
          tax_2: '5',
          total_tax: 1024,
          amount_tax: 108179,
          billable: 1,
          activities_code: 'A102',
          reference: 'asfdgh',
          paid_status: 2,
          action: 'asfdgh',
        },
        {
          pk: uuid(),
          schedule_name: 'Frozen Yogurt',
          upcoming: true,
          date_time: '2021-11-25 03:07:22.772471+00:00',
          description: 'Frozen Yogurt',
          // Fixed, Flat, Counseling
          expense_category: 3,
          expense_code: 'E111',
          created_by: 4,
          expense_amount: 1548963,
          expense_name: 'Expense Docket',
          expense_description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
            'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
          source: [
            {
              content_type: 21,
              obj_id: 12,
              name: 'Card log',
            },
            {
              content_type: 21,
              obj_id: 12,
              name: 'Docket',
            },
          ],
          tax_1: '18',
          tax_2: '0',
          total_tax: 15789,
          amount_tax: 8899,
          billable: 3,
          activities_code: 'A1053',
          reference: 'asfdgh',
          paid_status: 3,
          action: 'asfdgh',
        },
      ],
      billables: BILLABLE,
      paid_status: PAID_STATUS,
      category: [
        // Fixed, Flat, Counseling
        {
          text: 'Fixed',
          value: 1,
        },
        {
          text: 'Flat',
          value: 2,
        },
        {
          text: 'Counseling',
          value: 3,
        },
      ],
      activities_code: ACTIVITIES_CODE,
      expenses_code: EXPENSES_CODE,
      tax: TAX,
      uiShowQuickView: false,
      pick: false,
    }
  },
  computed: {
    fields: {
      get() {
        return this.headers.filter((h) => h.active)
      },
      set() {},
    },
  },
  // Recurring, Not-invoiced, Invoiced, Non-billable, Billable, N/A
  mounted() {
    this.$eventHub.$on('add-expense-log', (data) => {
      console.log('add-expense-log', data)
      this.desserts.unshift(data)
    })
  },
  methods: {
    save() {},
    cancel() {},
    open() {},
    close() {},
    getActivitiesCode(code) {
      return getCodeFields({ code, list: this.activities_code })
    },
    getExpensesCode(code) {
      return getCodeFields({ code, list: this.expenses_code })
    },
    getTaxCode(code) {
      return getCodeFields({ code, list: this.tax })
    },

    getCate(val) {
      switch (val) {
        case 1:
          return 'Fixed'
        case 2:
          return 'Flat'
        default:
          return 'Counseling'
      }
    },
    billable(code) {
      return getCodeFields({ code, list: BILLABLE })
    },
    paidStatus(code) {
      return getCodeFields({ code, list: PAID_STATUS })
    },
    updateFields({ field }) {
      let fields = [...this.headers]
      let index = fields.findIndex((f) => f.value === field.value)
      if (index >= 0) {
        fields[index] = field
        this.headers = [...fields]
      }
    },
  },
}
</script>

<style scoped>
.text_name {
  max-width: 200px;
  min-width: 150px;
}

.dialog_center >>> .v-small-dialog__activator {
  font-size: 0px;
}

.dialog_center
  >>> .v-small-dialog__activator
  .v-small-dialog__activator__content {
  display: block;
}

.dialog_center {
}

.btn_hover {
  opacity: 0;
}

.on-hover {
  /*border: solid 1px red !important;*/
  opacity: 1;
}
</style>
<style>
.v-small-dialog__content {
  max-height: 90vh;
  padding: 0px;
}
</style>
