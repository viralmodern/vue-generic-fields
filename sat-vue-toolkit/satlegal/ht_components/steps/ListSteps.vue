<template>
  <div>
    <v-stepper alt-labels>
      <v-stepper-header>
        <v-row no-gutters v-for="(item, index) in items" :key="item.id">
          <ItemStep :item="item" :index="index" :total="items.length">
            <template slot="MilestoneContent">
              <slot
                name="MilestoneContent"
                :title="item.target.title"
                :content="item.target.content"
              ></slot>
            </template>
          </ItemStep>
        </v-row>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
<script>
import ItemStep from "./ItemStep";

export default {
  components: {
    ItemStep
  },
  props: {
    items: Array
  }
};
</script>
