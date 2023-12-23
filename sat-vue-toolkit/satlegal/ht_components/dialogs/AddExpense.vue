<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new expense</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Expense name is required']"
              label="Expense name"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="date"
                  readonly
                  label="Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="createBy"
              :items="members"
              item-text="name"
              label="Create by"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="status"
              :rules="[v => !!v || 'This field is required']"
              :items="statusExpense"
              attach
              chips
              label="Status"
              item-value="id"
              item-text="name"
            ></v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="contact"
              :items="members"
              item-text="name"
              label="Create by"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="amount"
              mask="#############"
              :rules="[v => !!v || 'This field is required']"
              label="Amount"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="billedBy"
              :items="members"
              item-text="name"
              label="Billed by"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuCreateDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="createDate"
                  readonly
                  label="Create date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="createDate"
                @input="menuCreateDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters>
            <TimePicker
              :rules="[v => !!v || 'This field is required']"
              :value="createTime"
              @change="createTime = $event"
            />
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { statusExpense } from "../../config";
import UserAvatar from "../avatars/UserAvatar";
import TimePicker from "../menus/TimePicker";
export default {
  props: {
    isShow: Boolean
  },
  components: {
    UserAvatar,
    TimePicker
  },
  data() {
    return {
      statusExpense,
      valid: true,
      name: "",
      menu: false,
      menuCreateDate: false,
      menuCreateTime: false,
      date: "",
      createBy: "",
      status: "",
      amount: "",
      contact: "",
      billedBy: "",
      createDate: "",
      createTime: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          date: this.date,
          createBy: this.createBy,
          status: this.status,
          amount: this.amount,
          contact: this.contact,
          billedBy: this.billedBy,
          createDate: this.createDate,
          createTime: this.createTime
        };
        this.$emit("addExpense", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
