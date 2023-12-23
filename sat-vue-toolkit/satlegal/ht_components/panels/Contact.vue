<template>
  <MaterialPanel panelTitle="Contact" @edit="openModal">
    <v-row no-gutters class="px-4 py-2" v-if="dataContact">
      <div class="py-1">
        <h3 class="pb-1">Address</h3>
        <div v-html="addressHtml" style="word-break: break-all"></div>
      </div>
      <div class="py-1">
        <h3 class="pb-1">Website</h3>
        <div>{{ dataContact.website }}</div>
      </div>
      <div class="py-1">
        <h3 class="pb-1">Tel.</h3>
        <div v-for="(item, index) in dataContact.phones" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="py-1">
        <h3 class="pb-1">Emails</h3>
        <div v-for="(item, index) in dataContact.emails" :key="index">
          {{ item }}
        </div>
      </div>
    </v-row>
    <EditContact
      title="Update Contact"
      :isShow="isShow"
      :itemEdit="itemEdit"
      @closeModal="closeModal"
      @edit="edit"
    />
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "./MaterialPanel";
import EditContact from "../dialogs/EditContact";

export default {
  props: {
    dataContact: Object
  },
  components: {
    MaterialPanel,
    EditContact
  },
  data() {
    return {
      isShow: false,
      itemEdit: {}
    };
  },
  computed: {
    addressHtml() {
      if (!this.dataContact.address) return "";
      let text = this.dataContact.address.replace(/ /g, "&nbsp;");
      return text.replace(/\n/g, "<br/>");
    }
  },
  methods: {
    edit(data) {
      this.$emit("updateContact", data);
    },
    openModal() {
      this.isShow = true;
      this.itemEdit = this.dataContact;
    },
    closeModal() {
      this.isShow = false;
      this.itemEdit = {};
    }
  }
};
</script>
