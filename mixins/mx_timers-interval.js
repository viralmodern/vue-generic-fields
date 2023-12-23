const COUNT_START = 0
export default {
  data() {
    return {
      timer: null,
      totalTime: COUNT_START * 60,
      resetButton: false
    }
  },
  methods: {
    $startTimer: function() {
      this.timer = setInterval(() => this.$countup(), 1000)
      this.resetButton = true
    },
    $stopTimer: function() {
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = true
    },
    $resetTimer: function() {
      clearInterval(this.timer)
      this.totalTime = COUNT_START * 60
      this.resetButton = false
      this.timer = null
    },
    $padTime: function(time) {
      return (time < 10 ? '0' : '') + time
    },
    $countup: function() {
      this.totalTime++
    }
  },
  computed: {
    $$minutes: function() {
      return this.$padTime(Math.floor(this.totalTime / 60))
    },
    $$seconds: function() {
      return this.$padTime(this.totalTime - this.$$minutes * 60)
    },
    $$hours: function() {
      return this.$padTime(Math.floor(this.totalTime / 3600))
    }
  }
}
