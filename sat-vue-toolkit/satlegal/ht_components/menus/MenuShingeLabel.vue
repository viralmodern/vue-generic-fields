<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-x
    top
    :close-on-content-click="false"
    max-width="250px"
    min-width="250px"
  >
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: onTooltip }">
          <AddIcon
            :on="{ ...onMenu, ...onTooltip }"
            @onClickIcon="$emit('onOpenMenu')"
            :icon="icon"
          />
        </template>
        <span>{{ textTooltip }}</span>
      </v-tooltip>
    </template>
    <div>
      <v-card>
        <v-card-title>
          <span class="title">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-btn @click="menu = false" class="ma-0" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <LabelColor
            width="220px"
            v-for="(item, index) in labelComputed"
            :key="index"
            :color="item[keyColor]"
            :text="item[keyText]"
            :check="item.check"
            @choseLabel="$emit('chooseLabel', item)"
          />
        </v-card-text>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import LabelColor from "../chips/LabelColor2";
import AddIcon from "../common/buttons/AddIcon";
export default {
  components: {
    LabelColor,
    AddIcon
  },
  props: {
    labels: Array,
    value: Array,
    title: String,
    keyColor: String,
    keyText: String,
    icon: String,
    textTooltip: String
  },
  computed: {
    labelComputed() {
      return (this.labels || []).map(x => {
        if (this.value.includes(x.id)) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
    }
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
