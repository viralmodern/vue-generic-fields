<template>
  <div style="width: 200px">
    <v-row no-gutters class=" align-center">
      <span class="text-caption mr-2" v-if="date != null">
        {{ new Date(date).getFullYear() }}
      </span>
      <div class="d-flex align-center no-gutters">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="ma-0 btn-custom" icon small>
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </template>
          <v-date-picker
            ref="picker"
            :max="max"
            :min="min"
            v-model="birthday"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </div>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "ChooseDatePicker",
  props: {
    date: String,
    title: String,
    isActions: Boolean,
    max: String,
    min: String,
  },
  data() {
    return {
      menu: false,
      dialog: false,
      birthday: ""
    };
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$emit('update', date)
    }
  },
  mounted(){
    this.birthday = this.date;
  },
  watch: {
    menu(val) {
      this.$nextTick(() => {
        this.birthday = this.date;
        this.$refs.picker.activePicker = "YEAR"
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.btn-custom {
  border: 1px dashed #c1c2c3;

  &:hover {
    background: rgba(17,205,239,.5);

    /deep/ .v-icon {
      color: white;
    }
  }

  &:before {
    content: unset;
  }

  /deep/ .v-icon {
    font-size: 16px;
    color: rgb(210, 213, 226);
    caret-color: rgb(210, 213, 226);
  }

  /deep/ .v-ripple__container {
    display: none;
  }
}
</style>
