<template>
  <v-card class="pa-2">
    <v-row no-gutters>
      <v-col>
        <v-select
          item-text="name"
          :items="typeFact"
          chips
          multiple
          return-object
          label="Fact type"
          placeholder="Select to search"
          v-model="filter"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption"
              >(+{{ filter.length - 1 }} others)</span
            >
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-select
          item-text="name"
          :items="favorableFact"
          chips
          multiple
          return-object
          label="Favorable"
          placeholder="Select to search"
          v-model="filter"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption"
              >(+{{ filter.length - 1 }} others)</span
            >
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-row no-gutters class="my-1 align-center">
          <v-col
            cols="6"
            class="text-xs-center"
            v-for="(item, index) in progressFact"
            :key="index"
          >
            <v-col class="text-xs-center mb-1">
              <span class="text-secondary text-caption mr-2">{{ item.name }}</span>
            </v-col>
            <v-menu
              transition="scale-transition"
              offset-x
              right
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-progress-circular
                  v-on="on"
                  :size="45"
                  :value="item.value"
                  :width="5"
                  :rotate="-90"
                  :color="item.color"
                  >{{ item.value }}%</v-progress-circular
                >
              </template>
              <v-card>
                <v-card-text>
                  <v-slider
                    :value="item.value"
                    :thumb-size="24"
                    thumb-label="always"
                  ></v-slider>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-select
          :items="disputeFact"
          item-text="name"
          chips
          multiple
          return-object
          label="Dispute"
          placeholder="Select to search"
          v-model="filter"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption"
              >(+{{ filter.length - 1 }} others)</span
            >
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-select
          item-text="name"
          :items="recordFact"
          chips
          multiple
          return-object
          label="Linked records"
          placeholder="Select to search"
          v-model="filter"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption"
              >(+{{ filter.length - 1 }} others)</span
            >
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-select
          item-text="name"
          :items="tagsFact"
          chips
          multiple
          return-object
          label="Tags"
          placeholder="Select to search"
          v-model="filter"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip
              v-if="index === 0"
              :color="item.color"
              class="white--text"
              small
            >
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption"
              >(+{{ filter.length - 1 }} others)</span
            >
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import {
  typeFact,
  favorableFact,
  progressFact,
  disputeFact,
  recordFact,
  tagsFact
} from "../../config.js";
export default {
  data() {
    return {
      typeFact,
      favorableFact,
      progressFact,
      disputeFact,
      recordFact,
      tagsFact,
      filter: "",
      slider: ""
    };
  }
};
</script>
