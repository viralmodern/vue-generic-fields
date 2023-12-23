<template>
  <td>
    <TextAreaInline :rows="1" class="ml-2" :value="dataRow.name" @onChange="onChange"/>
  </td>
</template>
<script>
import TextAreaInline from "../inputs/TextAreaInline";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    TextAreaInline
  },
  methods: {
    onChange(value){
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      }
      this.$emit('onChange', data)
    }
  }
};
</script>
