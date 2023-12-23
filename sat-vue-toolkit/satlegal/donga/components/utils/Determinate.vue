<template>
  <div v-if="isOpen" class="fixed_line">
    <v-progress-linear class="ma-0" height="4" color="green"
                       v-model="value"
                       :active="show"
                       :query="true"
    ></v-progress-linear>
  </div>
</template>

<script>
  export default {
    name: "Determinate",
    data() {
      return {
        value: 0,
        query: false,
        show: true,
        interval: 0,

        isOpen: false
      }
    },

    mounted() {
      this.queryAndIndeterminate()
    },

    beforeDestroy() {
      clearInterval(this.interval)
    },

    methods: {
      queryAndIndeterminate() {
        this.query = true;
        this.show = true;
        this.value = 0;

        setTimeout(() => {
          this.query = false;

          this.interval = setInterval(() => {
            if (this.value === 100) {
              clearInterval(this.interval);
              this.show = false;
              this.isOpen = false;
              return setTimeout(this.queryAndIndeterminate, 500)
            }
            this.value += 25
          }, 200)
        }, 200)
      }
    },
    created() {
      this.$eventHub.$on(this.$eventTypes.DeterminateProgress, () => {
        this.isOpen = true;
      })
    }
  }
</script>

<style scoped>

</style>
