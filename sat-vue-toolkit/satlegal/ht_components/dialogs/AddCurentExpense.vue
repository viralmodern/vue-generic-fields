<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" scrollable @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Add New Curent Expense
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-text id="content">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-text-field
                class="py-1"
                v-model="name"
                :rules="[v => !!v || 'This field is required']"
                label="Name curent expense"
                required
                append-icon="person_outline"
              ></v-text-field>
            </v-row>
            <v-row>
              <SelectMultipleUser
                label="Members"
                :user="members"
                :users="dataMembers.filter(x => x.id !== currentUser.pk)"
                @change="members = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-row>

            <v-row no-gutters>
              <v-textarea
                v-model="description"
                name="input-7-1"
                label="Description"
              ></v-textarea>
            </v-row>

            <v-row no-gutters>
              <v-select
                :items="appConfigs.expenseCode"
                v-model="expense_code"
                label="Expense code"
                item-text="title"
                item-value="code"
                :rules="[v => !!v || 'This field is required']"
              ></v-select>
            </v-row>
          </v-form>
        </v-card-text>
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
import SelectMultipleUser from "../inputs/SelectMultipleUser";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      valid: true,
      name: "",
      members: [],
      description: "",
      expense_code: "",
      menu: false
    };
  },
  components: {
    SelectMultipleUser
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
          members: this.members,
          description: this.description,
          expense_code: this.expense_code
        };
        this.$emit("add", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    ...mapGetters("ht_store/user", ["currentUser"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  }
};
</script>
