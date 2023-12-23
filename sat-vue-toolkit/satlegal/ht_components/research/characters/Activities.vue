<template>
  <v-row fill-height no-gutters>
    <v-row fill-height no-gutters class="pt-2">
      <v-col cols="12">
        <CharacterTableGrid v-if="type === 1" />
        <CharacterTimeLine v-if="type === 2" />
      </v-col>
      <slot></slot>
    </v-row>
  </v-row>
</template>
<script>
import CharacterTableGrid from "./CharacterTableGrid";
import CharacterTimeLine from "./CharacterTimeLine";
export default {
  components: {
    CharacterTableGrid,
    CharacterTimeLine
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  }
};
</script>
