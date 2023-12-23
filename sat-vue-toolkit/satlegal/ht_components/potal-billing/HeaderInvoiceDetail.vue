<template>
  <div>
    <v-row class="align-center" no-gutters>
      <v-col cols="4" class="pl-3">
        <span class="subheading font-weight-bold"
          >Invoice #{{ invoiceDetail.id }}</span
        >
        <v-btn

          icon
          color="primary"
          :to="{ name: 'PortalInvoiceDetailBuilder' }"
        >
          <v-icon>mdi-launch</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-menu
          v-model="menuIssueDate"
          transition="scale-transition"
          offset-y
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <span class="subheading font-weight-bold mr-2">Due date :</span>
              <span>{{ issueDate | formatMMDDYYYY }}</span>
            </div>
          </template>
          <v-date-picker
            @change="onChange('issueDate', $event)"
            no-title
            v-model="issueDate"
            width="290"
            class="elevation-3"
            @input="menuIssueDate = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="3">
        <v-menu
          v-model="menuDuedate"
          transition="scale-transition"
          offset-y
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <span class="subheading font-weight-bold mr-2">Issue date :</span>
              <span>{{ dueDate | formatMMDDYYYY }}</span>
            </div>
          </template>
          <v-date-picker
            @change="onChange('dueDate', $event)"
            no-title
            v-model="dueDate"
            width="290"
            class="elevation-3"
            @input="menuDuedate = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2" class="text-xs-right pr-3">
        <SelectInline
          v-if="clientJoin"
          :item="clientJoin"
          :items="dataClient"
          keyText="name"
          keyColor="color"
          class="select"
          @select="select"
          nudge-width="250"
        >
          <template slot="section" slot-scope="props">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <UserAvatar
                  v-on="on"
                  :avatarSize="32"
                  :imageUrl="(props.item.user || {}).imageUrl"
                  :name="(props.item.user || {}).name"
                />
              </template>
              <span>{{ props.item.user.name || "" }}</span>
            </v-tooltip>
          </template>
          <template slot="menu" slot-scope="props">
            <UserAvatar
              :avatarSize="32"
              :imageUrl="props.item.user.imageUrl || ''"
              :name="props.item.user.name || ''"
            />
            <span
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ props.item.user.name || "" }}</span
            >
            <v-spacer></v-spacer>
            <v-icon v-if="props.item.id === clientJoin.id">mdi-done</v-icon>
          </template>
        </SelectInline>
      </v-col>
    </v-row>
    <v-row no-gutters class="py-2">
      <v-textarea
        hide-details
        auto-grow
        :value="invoiceDetail.notes"
        @change="onChange('notes', $event)"
        class="mt-3 pa-2 custom-text-field fieldDes"
        rows="1"
      ></v-textarea>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import SelectInline from "../menus/SelectInline";
import UserAvatar from "../avatars/UserAvatar";
export default {
  data() {
    return {
      issueDate: "",
      dueDate: "",
      menuIssueDate: false,
      menuDuedate: false
    };
  },
  components: {
    UserAvatar,
    SelectInline
  },
  methods: {
    onChange(column, value) {
      const data = {
        column: column,
        value: value
      };
      this.$emit("updateInvoiceDetail", data);
    },
    select({ id }) {
      if (id !== this.invoiceDetail) {
        const data = {
          column: "client",
          value: id
        };
        this.$emit("updateInvoiceDetail", data);
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/detail", ["invoiceDetail"]),
    clientJoin() {
      return (this.dataClient || []).find(
        x => x.id === this.invoiceDetail.client
      );
    },
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  mounted() {
    this.issueDate = moment(this.invoiceDetail.issueDate).format("YYYY-MM-DD");
    this.dueDate = moment(this.invoiceDetail.dueDate).format("YYYY-MM-DD");
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
