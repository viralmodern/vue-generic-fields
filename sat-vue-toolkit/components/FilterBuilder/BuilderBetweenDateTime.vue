<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center">
        <v-text-field v-bind="vBind"
                      ref="da∂te1"
                      readonly
                      v-model="value.valueBefore"
                      v-on="on">
        </v-text-field>
        <div class="mx-2">And</div>
        <v-text-field v-bind="vBind"
                      ref="dateAfter"
                      readonly
                      v-on="on"
                      @click="changeDate('dateAfter')"
                      v-model="value.valueAfter">
        </v-text-field>
      </div>
    </template>
    <div>
      <v-date-picker v-model="date" no-title scrollable>
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="saveDate">OK</v-btn>
      </v-date-picker>
    </div>

  </v-menu>
</template>

<script>
  import { vBindField } from "./configs"
  import builderProps from "./builderProps"
  export default {
    name: "BuilderBetweenDateTime",
    props: {
      vBind: {
        ...vBindField,
      },
      ...builderProps
    },
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      isFocused: null
    }),
    methods: {
      saveDate() {
        this.$refs.menu.save(this.date)
        let v = {
          valueBefore: this.value.valueBefore,
          valueAfter: this.value.valueAfter,
        }
        if(this.isFocused === 'dateAfter') {
          v.valueAfter = this.date
        }else {
          v.valueBefore = this.date
        }
        this.$emit('input', v)
      },
      changeDate(direction) {
        this.isFocused = direction
      }
    }
  }
</script>

<style scoped></style>

