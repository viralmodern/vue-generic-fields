<template>
  <div>
    <ListOfThreeLevel
      :fontStyle="fontStyle"
      :countLength="countLength"
      class="ml-1"
      :items="items"
      @updateItem="data =>$emit('updateItem', {data, items})"
      @removeItem="id => $emit('removeItem',{id, items})"
    />
  </div>
</template>
<script>
import ListOfThreeLevel from "./ListOfThreeLevel";
export default {
  components: {
    ListOfThreeLevel
  },
  props: {
    items: Object,
    nameBtnAdd: String,
    hint: String,
    fontStyle: String,
    itemList: Object,
    countLength: String
  },
  data() {
    return {
      isShow: false
    };
  }
};
</script>
