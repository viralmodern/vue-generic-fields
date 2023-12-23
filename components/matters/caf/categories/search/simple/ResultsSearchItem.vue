<template>
  <v-card elevation="0">
    <v-card-text>
      <div class="d-flex">
        <div>
          <div class="text-subtitle-2 black--text d-flex before-dot">
            <span
              class="dot_bg mr-2 mt-1"
              :style="{ background: item.color }"
            ></span>
            {{ item.title }}
          </div>
          <div class="text-caption">
            In <strong>OPL</strong> Nov 27 at 1:28 pm
          </div>
          <div class="mt-2 grey--text" v-if="item.ders">
            {{ item.ders }}
          </div>
          <div class="mt-2" v-if="item.breadcrumbs">
            <v-breadcrumbs :items="item.breadcrumbs">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </div>
        </div>
        <div class="flex-grow-1"></div>
        <div class="d-flex">
          <v-btn icon>
            <v-icon small>mdi-open-in-new</v-icon>
          </v-btn>
          <!--<v-icon small>fas fa-external-link-alt</v-icon>-->
          <v-btn icon>
            <v-icon small>mdi-link-variant</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ResultsSearchItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return { title: 'result' }
      },
    },
  },
}
</script>

<style scoped lang="scss">
.before-dot {
  .dot_bg {
    width: 10px;
    height: 10px;
    border-radius: 2.5px;
    background: red;
    display: block;
  }
}
</style>
