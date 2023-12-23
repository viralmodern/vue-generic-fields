<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-plus</v-icon>
      New Histories
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
        <v-row class="ma-0 mt-2">
          <v-col cols="4" class="pa-0 pr-2">
            <v-textarea
              v-model="desc"
              class="custom ma-0 pa-0"
              placeholder="Description"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <DateTimePicker
            title="Choose date time"
            :valid="this.errorsForm.time.valid"
            :isActions="true"
            :date="date"
            :time="time"
            :textTooltip="
              [date, time].some(x => !!x)
                ? `${$options.filters.formatShortDate(date)} ${time}`
                : 'Add date time'
            "
            @updateDate="date = $event"
            @updateTime="time = $event; validForm()"
            :colorButton="`${[date, time].some(x => !!x) ? 'indigo' : ''}`"
            class="mt-2 mx-2"
            @clear="
              date = '';
              time = '';
            "
          />
          <v-col class="pa-0 mt-2">
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
import { mapActions, mapGetters } from "vuex";
import AddIcon from "../../common/buttons/AddIcon";
import DateTimePicker from "../../common/menus/DateTimePicker";
import { formatDateTime } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon,
    DateTimePicker
  },
  data() {
    return {
      valid: false,
      number: "",
      desc: "",
      date: "",
      time: "",
      errorsForm: {
        time: {
          messages: "",
          valid: false,
        },
      },
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["characterDetail"])
  },
  methods: {
    validForm() {
      const errors = {
        time: {
          messages: "",
          valid: false,
        }
      };
      if(!this.time) {
        errors.time.messages = "required";
        errors.time.valid = true;
      }
      const valid = !Object.keys(errors).some(key => errors[key].valid === true);
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    add() {
      if (this.validForm()) {
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId: this.characterDetail.pk,
          body: {
            desc: this.desc,
            date: formatDateTime(this.date, this.time)
          }
        };
        this.isLoadingAdd = true;
        this.postHistoriesCharacters(data)
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
    ...mapActions("ht_store/matter/character2", ["postHistoriesCharacters"])
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
