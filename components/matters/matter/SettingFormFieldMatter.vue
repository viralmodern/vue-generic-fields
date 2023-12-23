<template>
  <v-navigation-drawer
    fixed
    right
    width="45vw"
    @input="input"
    v-model="uiShowModal"
  >
    <v-lazy>
      <v-card flat>
        <v-card-text class="px-0">
          <FormFieldsMatter
            v-if="matterId"
            v-model="uiShowModal"
            :matter-id="matterId"
            @close="close"
          />
        </v-card-text>
      </v-card>
    </v-lazy>
  </v-navigation-drawer>
</template>

<script>
import FormFieldsMatter from './FormFieldsMatter'

export default {
  name: 'SettingMatterDrawer',
  components: { FormFieldsMatter },
  props: {
    matterId: {
      type: [String, Number],
      default: () => '',
    },
  },
  data() {
    return {
      uiShowModal: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    }
  },
  mounted() {
    this.$eventHub.$on('drawer-matter-setting', () => {
      console.log('drawer', this.drawer)
      this.uiShowModal = true
      document.documentElement.classList.add('no_scroll')
    })
  },
  methods: {
    close() {
      this.uiShowModal = false
      try {
        if (!document.querySelector('.slickGridApp')) {
          document.documentElement.classList.remove('no_scroll')
        }
      } catch (e) {}
    },
    input() {},
  },
}
</script>

<style scoped></style>
