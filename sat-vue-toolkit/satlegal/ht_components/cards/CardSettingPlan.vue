<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-row class="justify-space-between align-center" no-gutters>
            <strong class="title">Front project - Aug 2018</strong>
            <v-btn class="ml-0" small rounded color="success" outlined>{{
              item.price
            }}</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <span>License purchased:&nbsp;</span>
          <strong class="text--secondary">{{ item.purchased }}</strong>
        </v-col>
        <v-col>
          <span>License assigned:&nbsp;</span>
          <strong class="text--secondary">{{ item.assigned }}</strong>
        </v-col>
        <v-col class="mt-2">
          <v-btn color="primary ml-0">Change plan</v-btn>
          <v-btn color="default ml-0">Edit/Remove</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
