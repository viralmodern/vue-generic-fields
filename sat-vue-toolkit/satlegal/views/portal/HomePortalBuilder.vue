<template>
  <div>
    <v-dialog :value="true" @input="close" width="1100">
      <InvoiceBuiderCard/>
    </v-dialog>
  </div>
</template>

<script>
import InvoiceBuiderCard from "../../ht_components/dialogs/InvoiceBuilderCard";
export default {
  components: {
    InvoiceBuiderCard
  },
  methods: {
    /* CHƯA TẠO MODULE ĐÚNG ĐANG COPY MODULE ĐỂ NÓ CHẠY ĐƯỢC */
    close() {
      const { id } = this.$route.params;
      this.$router.push({
        name: "PortalInvoiceDetail",
        params: {
          id
        }
      });
    }
  }
};
</script>
