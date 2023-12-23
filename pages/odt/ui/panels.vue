<template>
  <v-container>
    <div>Panels</div>
    <div>
      <!-- Module A -->
      <div>
        <p>
          <v-text-field label="Name" @keydown.enter="submit" v-model="name" />
        </p>
      </div>
      {{ messages }}
    </div>
  </v-container>
</template>

<script>
import { EventsPubSub } from '~/features/odt/helpers/Panels'

export default {
  data() {
    return {
      EventsPubSub: new EventsPubSub(),
      name: '',
      quantity: '',
      messages: [],
    }
  },
  mounted() {
    this.EventsPubSub.subscribe('addMessage', this.addMessage)
  },
  methods: {
    submit() {
      let { name } = this
      let message = {
        name,
      }
      this.EventsPubSub.emit('addMessage', message)
    },
    addMessage(message) {
      this.messages.push(message)
    },
  },
}
</script>

<style scoped></style>
