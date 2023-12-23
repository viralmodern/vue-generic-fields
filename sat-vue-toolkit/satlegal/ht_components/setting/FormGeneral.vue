<template>
  <v-card>
    <v-col>
      <FormGeneralUser/>
    </v-col>
    <v-col>
      <FormUpdatePassword/>
    </v-col>
  </v-card>
</template>
<script>
import FormGeneralUser from "./FormGeneralUser";
import FormUpdatePassword from "./FormUpdatePassword";
export default {
  components: {
    FormUpdatePassword,
    FormGeneralUser
  }
};
</script>
