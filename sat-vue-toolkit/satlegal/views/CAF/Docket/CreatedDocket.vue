<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>
      New Docket
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="2" class="pa-0 pr-2">
            <v-text-field
              v-model="number"
              autofocus
              class="custom ma-0 pa-0"
              placeholder="Number"
              type="number"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="desc"
              class="custom ma-0 pa-0"
              placeholder="Description"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <DateTimePicker2
            title="Choose date time"
            :isActions="true"
            :date="date"
            :time="time"
            :textTooltip="
              [date, time].some(x => !!x)
                ? `${$options.filters.formatShortDate(date)} ${time}`
                : 'Add date time'
            "
            :colorButton="`${[date, time].some(x => !!x) ? 'indigo' : ''}`"
            class="mx-2"
            @updateTime="(date = $event.date), (time = $event.time)"
          />
          <v-col>
            <v-btn
              small
              class="primary mx-1"
              @click="add"
              :loading="isLoadingAdd"
              >Add</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import DateTimePicker2 from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DateTimePicker2";

export default {
  components: {
    AddIcon,
    DateTimePicker2
  },
  data() {
    return {
      valid: false,
      number: "",
      desc: "",
      date: "",
      time: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          body: {
            number: this.number,
            desc: this.desc,
            date: new Date(this.date + " " + this.time).toISOString()
          }
        };
        this.isLoadingAdd = true;
        this.addDocketRequest(data)
          .then(() => {
            this.isLoadingAdd = false;
            this.isShowAdd = false;
          })
          .catch(() => {
            this.isLoadingAdd = false;
          });
      }
    },
    clearForm() {
      this.number = "";
      this.desc = "";
      this.date = "";
      this.time = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/docket", ["addDocketRequest"])
  },
  watch: {
    isShowAdd(val) {
      if (!val) {
        this.clearForm();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.custom {
  /deep/ .v-text-field__slot {
    font-size: 13px;
    width: 100px;
  }
}
</style>
