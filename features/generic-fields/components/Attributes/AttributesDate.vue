<template>
  <div>
    <v-select :items="items" outlined clearable dense label="Format" />
  </div>
</template>

<script>
export default {
  name: 'AttributesDate',
  data() {
    return {
      items: [
        {
          text: 'October 29th 2019',
          value: 'MMMM Do YYYY'
        },
        {
          text: 'Oct 29th 19',
          value: 'MMM Do YY'
        },
        {
          text: '2020/12/08',
          value: 'YYYY/MM/DD'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
