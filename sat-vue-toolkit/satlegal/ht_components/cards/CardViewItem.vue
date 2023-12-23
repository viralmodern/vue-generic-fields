<template>
  <v-card class="py-2">
    <v-row no-gutters class="px-3" v-if="items">
      <v-col cols="10" lg="2" class="py-1">
        <v-row
          no-gutters
          :class="
            `card-group mr-3 title white--text align-center justify-center`
          "
          :style="{ background: dataFilterType.color }"
          >{{ items.title }}</v-row
        >
      </v-col>
      <v-col cols="12" lg="1" class="py-1">
        <div
          class="card-title mr-3 subheading white--text"
          :style="{ background: dataFilterType.color }"
        >
          <v-row no-gutters class="rotate-90 justify-center align-center">{{
            dataFilterType.name
          }}</v-row>
        </div>
      </v-col>
      <v-col cols="12" lg="9" class="py-1">
        <v-row style="height:100%" no-gutters>
          <v-col cols="6" sm="3" class="border-right pl-3">
            <v-row no-gutters>
              <v-col cols="2" class="text-xs-center">
                <v-icon :style="{ color: dataFilterType.color }" small
                  >mdi-event_note</v-icon
                >
              </v-col>
              <v-col cols="10" class="mb-1">
                <b>Date</b>
                <div>{{ items.dateTime.from | formatMMDDYYYY }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="text-xs-center">
                <v-icon :style="{ color: dataFilterType.color }" small
                  >mdi-bookmark_border</v-icon
                >
              </v-col>
              <v-col cols="10">
                <b>Creator</b>
                <div>{{ dataCreator.name || "" }}</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" sm="3" class="border-right pl-3">
            <v-row no-gutters>
              <v-col cols="2">
                <v-icon :style="{ color: dataFilterType.color }" small
                  >mdi-person</v-icon
                >
              </v-col>
              <v-col cols="10" class="mb-1">
                <b>Character</b>
                <div v-for="(v, index) in dataFilterCharacter" :key="index">
                  {{ v.name }}
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                <v-icon :style="{ color: dataFilterType.color }" small
                  >mdi-texture</v-icon
                >
              </v-col>
              <v-col cols="10">
                <b>Location</b>
                <div class="caption font-weight-bold">
                  {{ dataLocation.name }}
                </div>
                <div class="caption text--secondary">
                  {{ dataLocation.address }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" class="pl-3">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon :style="{ color: dataFilterType.color }" small
                  >mdi-message</v-icon
                >
              </v-col>
              <v-col cols="11">
                <b>Description</b>
                <div>{{ items.reliefSought }}</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    types: Array,
    items: Object,
    character: Array,
    creator: Array,
    location: Array
  },
  computed: {
    dataFilterCharacter() {
      return this.character.filter(e => {
        return this.items.characters.includes(e.id);
      });
    },
    dataFilterType() {
      return this.types.find(x => x.id === this.items.type) || {};
    },
    dataCreator() {
      return this.creator.find(x => x.id === this.items.creator) || {};
    },
    dataLocation() {
      return (
        this.location.find(x => {
          return x.id === this.items.location;
        }) || {}
      );
    }
  }
};
</script>

<style scoped>
.card-group {
  min-height: 180px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  text-align: center;
}
.card-title {
  height: 100%;
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
}
.border-right {
  border-right: 1px solid #c3bebe;
}
.rotate-90 {
  transform: rotate(-90deg);
  height: 100%;
}
.bg-evidentiary {
  background: #6fdad6;
}
.bg-ultimate {
  background: #f35959de;
}
.cl-evidentiary {
  color: #6fdad6;
}
.cl-ultimate {
  color: #f35959de;
}
</style>
