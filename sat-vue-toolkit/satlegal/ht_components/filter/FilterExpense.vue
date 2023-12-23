<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilter" @click="openRight('filterExpense')">
      Filter is {{hasFilter ? 'on' : 'off'}}
      <v-icon right>filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterExpense'" right clipped app>
      <v-list dense>
        <div class="pa-2">
          <v-row no-gutters class="align-center">
            <h2>Filters</h2>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-0">
              <v-icon @click="close">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="pa-2">
          <div>
            <v-combobox
              :items="statusExpense"
              item-text="name"
              item-value="id"
              label="Status"
              prepend-icon="search"
              placeholder="Choose status"
              return-object
              @change="filterRequest('status', $event ? $event.id : undefined)"
            ></v-combobox>
            <div>
              <SelectMultipleUser
                placeholder="Choose created by"
                prepend-icon="search"
                label="Created by"
                :user="createdBy"
                :users="members"
                @change="filterRequest('createdBy', $event ? $event : undefined)"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
              />
            </div>
            <div>
              <v-row no-gutters class="align-center">
                <DateMonthPicker
                  placeholder="Choose date"
                  prepend-icon="search"
                  label="Date"
                  :value="date"
                  @change="filterRequest('date', $event ? $event : undefined)"
                />
                <v-btn @click="filterRequest('date', undefined)" class="ma-0" icon>
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-row>
            </div>
            <div>
            <v-row no-gutters class="align-center">
              <DateMonthPicker
                placeholder="Choose create date"
                prepend-icon="search"
                label="Create date"
                :value="createDate"
                @change="filterRequest('createDate', $event ? $event : undefined)"
              />
              <v-btn @click="filterRequest('createDate', undefined)" class="ma-0" icon>
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-row>
          </div>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { statusExpense } from "../../config";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    SelectMultipleUser,
    DateMonthPicker
  },
  data() {
    return {
      isShowFilter: false,
      createdBy: "",
      statusExpense,
      date: "",
      createDate: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/workspace/billing/expense", ["hasFilter"]),
    ...mapGetters("ht_store/workspace/member", ["members"])
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterExpenseRequest({ name, value });
    },
    close() {
      this.openRight("filterExpense");
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapActions("ht_store/workspace/billing/expense", ["filterExpenseRequest"])
  }
};
</script>
