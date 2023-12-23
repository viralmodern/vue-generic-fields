<template>
  <div class="px-3">
    <InputDescription label="Notes for client" value="Notes for client" class="py-2"/>
    <InputDescription label="Paymem terms" value="Paymem terms" class="py-2"/>
    <div>
      <InvoiceTimeEntries/>
    </div>
    <div>
      <InvoiceAmount/>
    </div>
    <div>
      <InvoiceExpenses/>
    </div>
  </div>
</template>
<script>
import InputDescription from "../../inputs/InputDescription";
import InvoiceAmount from "./InvoiceAmount";
import InvoiceTimeEntries from "./InvoiceTimeEntries";
import InvoiceExpenses from "./InvoiceExpenses";

export default {
  components: {
    InputDescription,
    InvoiceAmount,
    InvoiceExpenses,
    InvoiceTimeEntries
  }
};
</script>


