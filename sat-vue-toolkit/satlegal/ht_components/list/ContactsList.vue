<template>
  <div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="dataTable"
      :pagination.sync="pagination"
      :total-items="totals"
      class="elevation-1 filterable-table"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-row no-gutters class="align-center">
            <UserAvatar
              :imageUrl="props.item.avatar"
              :name="props.item.name"
              :avatarSize="32"
            />
            <router-link
              v-if="projectDetailType === 'byzantine'"
              :to="`${$route.path}/${props.item.id}`"
              class="pl-2"
              >{{ props.item.firstName }} {{ props.item.lastName }}</router-link
            >
            <span class="ml-2" v-else
              >{{ props.item.firstName }} {{ props.item.lastName }}</span
            >
          </v-row>
        </td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">
          <ChangeContact
            :name="props.item.role.name"
            :item="props.item"
            @changeRole="changeRole(props.item.id)"
          />
        </td>
        <td class="text-xs-left" v-if="projectDetailType === 'byzantine'">
          <Types :type="props.item.type" />
        </td>
        <td class="text-xs-left">
          <v-row no-gutters class="align-center">
            <v-btn
              class="ma-0"
              icon
              @click="updateRate(props.item.id, props.item.rate)"
            >
              <v-icon :color="props.item.rate ? 'primary' : 'default'">{{
                props.item.rate ? "star" : "star_border"
              }}</v-icon>
            </v-btn>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" class="ma-0" icon offset-x>
                  <v-icon class="text--secondary">more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editContact(props.item)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openRemoveItem(props.item.id)">
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </td>
      </template>
    </v-data-table>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="removeContact"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this contact?"
    />
    <div class="text-xs-right pt-2">
      <v-pagination
        v-model="pagination.page"
        :total-visible="7"
        :length="pages"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import Types from "../chips/ContactsType";
import ChangeContact from "../chips/ListRolesContactChange";
import UserAvatar from "../avatars/UserAvatar";
import ConfirmItem from "../dialogs/ConfirmItem";

export default {
  components: {
    Types,
    UserAvatar,
    ConfirmItem,
    ChangeContact
  },
  props: {
    dataTable: Array,
    loading: Boolean,
    totals: Number,
    projectDetailType: String
  },
  data() {
    return {
      pagination: {},
      isShowPopup: false,
      item: ""
    };
  },
  computed: {
    pages() {
      if (!this.pagination || !this.pagination.rowsPerPage || !this.totals)
        return 0;
      return Math.ceil(this.totals / this.pagination.rowsPerPage);
    },
    headers() {
      if (this.projectDetailType === "byzantine") {
        const headers = [
          { text: "Name", value: "name" },
          { text: "Email", value: "person" },
          { text: "Phone", value: "lead" },
          { text: "Role", value: "role" },
          { text: "Type", value: "team" },
          { text: "", value: "" }
        ];
        return headers;
      } else {
        const headers = [
          { text: "Name", value: "name" },
          { text: "Email", value: "person" },
          { text: "Phone", value: "lead" },
          { text: "Role", value: "role" },
          { text: "", value: "" }
        ];
        return headers;
      }
    }
  },
  methods: {
    editContact(val) {
      this.$emit("editContact", val);
    },
    removeContact() {
      this.$emit("removeContact", this.item);
      this.isShowPopup = false;
    },
    updateRate(id, rate) {
      const data = { id, rate: !rate };
      this.$emit("updateRate", data);
    },
    openRemoveItem(id) {
      this.item = id;
      this.isShowPopup = true;
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$emit("getData", this.pagination);
      },
      deep: true
    }
  }
};
</script>
