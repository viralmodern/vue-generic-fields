<template>
  <div>
    <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="true"
      :wordClick="wordClickHandler"
    >
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import faker from 'faker'
export default {
  name: 'DocketViewWorldCloud',
  components: {
    wordcloud
  },
  data() {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      defaultWords: [
        {
          name: 'Cat',
          value: 26
        },
        {
          name: faker.lorem.word(),
          // faker
          value: 19
        },
        {
          name: faker.lorem.words(),
          value: 18
        },
        {
          name: faker.lorem.text(),
          value: 16
        },
        {
          name: faker.lorem.lines(),
          value: 15
        },
        {
          name: faker.lorem.sentence(),
          value: 9
        },
        {
          name: faker.name.jobDescriptor(),
          value: 9
        },
        {
          name: faker.lorem.words(),
          value: 9
        },
        {
          name: faker.lorem.paragraph(),
          value: 6
        },
        {
          name: 'Cat',
          value: 26
        },
        {
          name: faker.lorem.word(),
          // faker
          value: 19
        },
        {
          name: faker.lorem.words(),
          value: 18
        },
        {
          name: faker.lorem.text(),
          value: 16
        },
        {
          name: faker.lorem.lines(),
          value: 15
        },
        {
          name: faker.lorem.sentence(),
          value: 9
        },
        {
          name: faker.name.jobDescriptor(),
          value: 9
        },
        {
          name: faker.lorem.words(),
          value: 9
        },
        {
          name: faker.lorem.paragraph(),
          value: 6
        }
      ]
    }
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm)
    }
  }
}
</script>

<style scoped></style>
