<template>
  <v-timeline dense clipped>
    <v-slide-x-transition group>
      <template v-for="event in timeline">
        <v-timeline-item
          :key="event.id"
          class="mb-4"
          color="pink"
          fill-dot
          large
          small
        >
          <template v-slot:icon>
            <v-icon>mdi-link-variant</v-icon>
          </template>
          <v-row justify="space-between">
            <v-col cols="9" v-text="event.text"></v-col>
            <v-col class="text-right" cols="3" v-text="event.time"></v-col>
          </v-row>
        </v-timeline-item>
      </template>
    </v-slide-x-transition>

    <v-timeline-item hide-dot>
      <span>Activities</span>
    </v-timeline-item>
    <v-timeline-item color="default" fill-dot icon-color="grey lighten-2">
      <template v-slot:icon>
        <v-icon>mdi-link-variant</v-icon>
      </template>
      <v-row justify="space-between">
        <v-col cols="9">
          <nuxt-link to="#">Nha Nguyen</nuxt-link>
          @nhand changed milestone to <nuxt-link to="#">First demo</nuxt-link>
        </v-col>
        <v-col class="text-right" cols="3">
          <v-chip label small>
            <time-ago :datetime="date_time" />
          </v-chip>
        </v-col>
      </v-row>
    </v-timeline-item>

    <v-timeline-item fill-dot color="default">
      <template v-slot:icon>
        <v-icon small>mdi-pencil-box-outline</v-icon>
      </template>
      <v-row justify="space-between">
        <v-col cols="9">
          <nuxt-link to="#">John</nuxt-link> @jp changed title from
          <strong>Matter - Matter Detail</strong>
          to
          <strong>Matter - Matter Detail Default CAF</strong>
        </v-col>
        <v-col class="text-right" cols="3">
          <v-chip label small>
            <time-ago :datetime="date_time" />
          </v-chip>
        </v-col>
      </v-row>
    </v-timeline-item>

    <v-timeline-item color="default" fill-dot>
      <template v-slot:icon>
        <v-icon small>mdi-account</v-icon>
      </template>
      <v-row justify="space-between">
        <v-col cols="9">
          <nuxt-link to="#">John</nuxt-link> @jp assigned to
          <nuxt-link to="#">@ducvietsqt</nuxt-link>
        </v-col>
        <v-col class="text-right" cols="3">
          <v-chip label small>
            <time-ago :datetime="date_time" />
          </v-chip>
        </v-col>
      </v-row>
    </v-timeline-item>

    <v-timeline-item hide-dot>
      <nuxt-link to="#">ducvietsqt</nuxt-link> created task
      <nuxt-link to="#">#45</nuxt-link> in matter
      <nuxt-link to="#fs">Introduce caf default</nuxt-link>
    </v-timeline-item>

    <v-timeline-item color="default">
      <template v-slot:icon>
        <v-icon small>mdi-comment</v-icon>
      </template>
      <v-row justify="space-between">
        <v-col cols="9">
          A $15.00 USD payment was processed on PayPal Express Checkout
        </v-col>
        <v-col class="text-right" cols="3">
          <v-chip label small>
            <TimeAgo :datetime="date_time" />
          </v-chip>
        </v-col>
      </v-row>
    </v-timeline-item>

    <v-timeline-item color="default" fill-dot>
      <template v-slot:icon>
        <v-icon small>mdi-label</v-icon>
      </template>
      <v-row justify="space-between">
        <v-col cols="9">
          <nuxt-link to="#">John Leider</nuxt-link> has been update matter types
          <v-chip label small color="red">judge</v-chip>
          <v-chip label small color="primary">processed</v-chip>
          <strong class="mx-2">to</strong>
          <v-chip label small color="success">Express Checkout</v-chip>
          <v-chip label small>Order confirmation </v-chip>
        </v-col>
        <v-col class="text-right" cols="3">
          <v-chip label small>
            <time-ago :datetime="date_time" />
          </v-chip>
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import TimeAgo from '@/sat-vue-toolkit/components/TimeAgo/TimeAgo.vue'
export default {
  name: 'ActivitiesStream',
  components: { TimeAgo },
  data: () => ({
    events: [],
    input: null,
    nonce: 0,

    date_time: new Date(),
  }),

  computed: {
    timeline() {
      return this.events.slice().reverse()
    },
  },

  methods: {
    comment() {
      const time = new Date().toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(
          /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
          (match, contents, offset) => {
            return ` ${contents
              .split(' ')
              .map((v) => v.charAt(0))
              .join('')}`
          }
        ),
      })

      this.input = null
    },
  },
}
</script>

<style scoped></style>
