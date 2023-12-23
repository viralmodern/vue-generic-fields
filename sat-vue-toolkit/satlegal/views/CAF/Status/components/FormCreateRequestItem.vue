<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>New Request Set Item
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
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="4" class="pa-0 pr-2">
                <v-text-field
                  v-model="name"
                  autofocus
                  class="custom ma-0 pa-0"
                  placeholder="Name"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <Members
                  class="mr-2"
                  :value="members"
                  @update="onChangeInputNullAbleNumbers('members', $event)"
                />
              </v-col>
              <v-col cols="4">
                <SelectChip
                  class="mr-2"
                  placeholder="Select Priority"
                  :items="appConfigs.listPriority"
                  label="Type"
                  item-text="name"
                  item-value="value"
                  item-color="color"
                  :value="priority"
                  @change="priority = $event"
                />
              </v-col>
            </v-row>
            <v-row class="ma-0" style="margin-left:-5px !important;">
              <div class="d-flex align-center">
                <SelectChip
                  class="mr-2"
                  placeholder="Select response status"
                  :items="appConfigs.responseStatus"
                  label="Type"
                  item-text="name"
                  item-value="value"
                  item-color="color"
                  :value="response_status"
                  @change="response_status = $event"
                />
                <SelectChip
                  class="mr-2"
                  placeholder="Select request status"
                  :items="appConfigs.requestStatus"
                  label="Type"
                  item-text="name"
                  item-value="value"
                  item-color="color"
                  :value="request_status"
                  @change="request_status = $event"
                />
                <div class="mr-2">{{deadline | formatShortDate}}</div>
                <DatePicker
                  title="Deadline"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="deadline"
                  :textTooltip="
                  [deadline].some(x => !!x)
                    ? `${$options.filters.formatShortDate(deadline)}`
                    : 'Add Deadline'
                "
                  :colorButton="`${[deadline].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="deadline=$event.date"
                />
              </div>
            </v-row>
          </v-col>
          <v-col cols="1" class="pa-0 pr-2 mt-2">
            <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon,
    Members,
    SelectChip,
    DatePicker
  },
  props: {
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    },
    isLoadingGetCharacter: Boolean,
    isLoadingGetSubject: Boolean
  },
  data() {
    return {
      valid: false,
      name: "",
      priority: undefined,
      response_status: undefined,
      request_status: undefined,
      deadline: undefined,
      isLoadingAdd: false,
      isShowAdd: false,
      members: []
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onChangeInputNullAbleNumbers(key, value) {
      const findObjectNullAble = this[key].find(x => x.id === 0);
      if (findObjectNullAble) {
        this[key] = value;
        this[key] = [findObjectNullAble, ...value];
        return;
      }
      return (this[key] = value);
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            rSId: this.$route.params.requestSetId
          },
          body: {
            name: this.name,
            priority: this.priority,
            response_status: this.response_status,
            request_status: this.request_status,
            deadline: this.deadline
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addRequestItemRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.priority = undefined;
      this.response_status = undefined;
      this.request_status = undefined;
      this.deadline = undefined;
      this.members = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "addRequestItemRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  watch: {
    groupBy(val, oldVal) {
      if (val.field !== oldVal.field) {
        this.isShowAdd = false;
      }
    },
    isShowAdd(open) {
      if (open) {
        if (this.groupBy.field !== "all") {
          if (Array.isArray(this[this.groupBy.field])) {
            this[this.groupBy.field] = [this.groupBy.value];
          } else {
            this[this.groupBy.field] = this.groupBy.value;
          }
        }
      } else {
        this.clearForm();
      }
    }
  },
  mounted() {
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
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
