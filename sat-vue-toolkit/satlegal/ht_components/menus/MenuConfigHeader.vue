<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-0 text--white" color="primary">
        <v-icon>settings</v-icon>
        <span>&nbsp;config</span>
      </v-btn>
    </template>
    <v-list class="px-3" style="width:300px">
      <v-row no-gutters>
        <v-col v-for="(item, index) in headers" :key="index" cols="6">
          <v-row no-gutters class="align-center">
            <CheckBox
              :status="item.check"
              @checkbox="$emit('checkbox', { id: item.id, check: $event })"
            />
            <strong>{{ item.text }}</strong>
          </v-row>
        </v-col>
      </v-row>
    </v-list>
  </v-menu>
</template>

<script>
import CheckBox from "../inputs/ByzantineItemCheckBox";

export default {
  components: {
    CheckBox
  },
  props: {
    headers: Array
  }
};
</script>
