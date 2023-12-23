<template>
  <div class="text-xs-center" @click="e => e.stopPropagation()">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon small>
          <v-icon>mdi-filter_list</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-icon>mdi-filter_list</v-icon>
            <v-list-item-content>
              <v-list-item-title>PROGRESS FILTER</v-list-item-title>
            </v-list-item-content>
            <v-chip>2</v-chip>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-radio-group
                v-model="radios"
                :mandatory="false"
                @change="changeRadio"
              >
                <v-radio label="Ahead/on schedule" :value="true" />
                <v-radio label="Out of schedule" :value="false" />
              </v-radio-group>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-slider
          class="ml-2"
          style="width: 90%;"
          v-model="slider"
          thumb-label
          @change="changeSlider"
        ></v-slider>
        <v-col text-xs-center>
          <v-btn
            @click="applyFilter"
            style="width: 90%;"
            depressed
            small
            color="primary"
            >Apply</v-btn
          >
        </v-col>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    menu: false,
    slider: 45,
    radios: true
  }),
  methods: {
    applyFilter() {
      const data = {
        radios: this.radios,
        slider: this.slider
      };
      return data;
    },
    changeRadio(e) {
      this.radios = e;
    },
    changeSlider(e) {
      this.slider = e;
    }
  }
};
</script>
