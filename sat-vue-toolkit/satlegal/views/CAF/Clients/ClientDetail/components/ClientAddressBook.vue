<template>
  <v-container fluid class="pa-0">
    <TableGrid
      hide-default-header
      hide-default-footer
      :headers="headers.filter(h => h.active)"
      :desserts="dataAdressBook"
      :loading="isLoadingGet"
    >
      <template v-slot:item.first_name="{ props: { item } }">
        <TextArea
          :value="item.first_name"
          @update="updateAddressBook(item.pk, 'first_name', $event)"
        />
      </template>
      <template v-slot:item.last_name="{ props: { item } }">
        <TextArea
          :value="item.last_name"
          @update="updateAddressBook(item.pk, 'last_name', $event)"
        />
      </template>
      <template v-slot:item.email="{ props: { item } }">
        <EmailOrPhoneSingle
          :value="item.email"
          name="email"
          @update="updateAddressBook(item.pk, $event)"
        />
      </template>
      <template v-slot:item.phone_number="{ props: { item } }">
        <EmailOrPhoneSingle
          :value="item.phone_number"
          name="phone_number"
          @update="updateAddressBook(item.pk, $event)"
        />
      </template>
      <template v-slot:item.address="{ props: { item } }">
        <Location
          :value="(item.address && item.address.raw)"
          @onChange="onChangeLocation(item.pk, $event)"
          @placechanged="getAddressData(item.pk, $event)"
          :extra="{required: true,
            rules: [v => !!v || 'Address is required'],
            errorMessage: ''}"
          placeholder="Address"
          class="custom-address"
        />
        <!-- <div class="custom-address">

        </div>-->
      </template>
      <template v-slot:item.relationship="{ props: { item } }">
        <SelectCheckBox
          title="Client relationship"
          keyText="label"
          keyValue="value"
          :value="item.relationship"
          :dataList="appConfigChoices[appConfigConstants.CLIENTS_ADDRESS_BOOK]"
          @update="updateAddressBook(item.pk, 'relationship', $event.value)"
        />
      </template>
      <template v-slot:item.action="{ props: { item } }">
        <div class="d-flex align-center">
          <BookmarkOrFlag
            :valueBookmark="item.bookmarked_pk"
            :endpoint="`/api/clients/${clientId}/address-books/${item.pk}`"
            routerMutation="ht_store/clients/addressBook/update"
            :pk="item.pk"
            :valueFlag="item.reported_object && item.reported_object.pk"
          />
          <Action :item="item" @remove="removeAddressBook(item.pk, $event)" />
        </div>
      </template>
    </TableGrid>
    <div class="d-flex align-center">
      <v-col cols="10" class="pa-0">
        <CreatedAddressBook :clientId="clientId" />
      </v-col>
      <v-col cols="2 text-right">
        <ButtonLoadMore
          v-if="totals > 20 && totals > dataAdressBook.length"
          ref="refLoadMore"
          :loading="isLoadingGet"
          @onPageChanged="paginationAddressBook"
        />
      </v-col>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import CreatedAddressBook from "./CreatedAddressBook";
import Location from "@/sat-vue-toolkit/components/Location/Location";

// Cell
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import EmailOrPhoneSingle from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/EmailOrPhoneSingle";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import { $$STORE_PREFIX } from "@/sat-vue-toolkit/satlegal/utils";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

let timeout;
export default {
  components: {
    TableGrid,
    ButtonLoadMore,
    EmailOrPhoneSingle,
    SelectCheckBox,
    CreatedAddressBook,
    TextArea,
    Action,
    Location,
    BookmarkOrFlag
  },
  props: {
    clientId: String
  },
  data() {
    return {
      isLoadingComment: false,
      isLoadingSendComment: false,
      isLoadingUpdate: false,
      headers: [
        { text: "First name", value: "first_name", active: true },
        { text: "Last name", value: "last_name", active: true },
        { text: "Phone Number", value: "phone_number", active: true },
        { text: "Email ", value: "email", active: true },
        { text: "Address", value: "address", active: true },
        { text: "Relationship", value: "relationship", active: true },
        { text: "Action", value: "action", active: true }
      ],
      address: {}
    };
  },
  computed: {
    ...mapGetters("ht_store/clients/addressBook", [
      "dataAdressBook",
      "isLoadingGet",
      "totals"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    onChangeLocation(pk, value) {
      let data = {};
      if (pk === this.address.pk) {
        data = this.address.address;
        this.address = {};
      } else {
        data = {
          raw: value
        };
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.updateAddressBook(pk, "address", data);
      }, 500);
    },
    getAddressData(pk, address) {
      this.address = { pk, address };
    },

    ...mapActions("ht_store/clients/addressBook", [
      "updateAddressBookRequest",
      "removeAddressBookRequest",
      "getAdressBookRequest"
    ]),
    async paginationAddressBook({ page, setLoading }) {
      setLoading(true);
      const payload = {
        pk: this.clientId,
        searchObject: {
          page
        }
      };
      await this.getAdressBookRequest(payload);
      setLoading(false);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateAddressBook(pk, name, value) {
      const data = {
        idParams: {
          pk,
          clientId: this.clientId
        },
        body: {
          [name]: value
        }
      };
      this.updateAddressBookRequest(data);
    },
    async removeAddressBook(pk, close) {
      const data = {
        clientId: this.clientId,
        pk
      };
      try {
        await this.removeAddressBookRequest(data);
        close();
      } catch (error) {
        close();
      }
    }
  }
};
</script>
<style scoped>
.custom-address {
  justify-content: center;
  width: 200px;
  align-items: center;
  padding-top: 20px;
}
</style>
