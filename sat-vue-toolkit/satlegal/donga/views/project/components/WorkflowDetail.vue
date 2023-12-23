<template>
  <v-scroll-y-transition mode="out-in">
    <div>
      <div class="px-3 py-2">
        <v-btn color="primary" small dense
               @click.stop="toggleAddNew(true)"
               v-if="!WF"
               class="white--text text-capitalize mx-0">
          <v-icon dark>add</v-icon>
          Add
        </v-btn>
        <div class="info_title" v-if="getWf">
          <div class="subheading font-weight-bold">
            <span class="color_picker" :style="'background: #'+ color"></span> {{WF.name}}
            <v-btn small color="rgba(109, 66, 199,0.12)" icon @click.stop="toggleAddNew(false)">
              <v-icon color="primary" size="15">edit</v-icon>
            </v-btn>
          </div>
          <div class="text-caption font-weight-light"> Last update&nbsp;<i>19 Feb 2015</i></div>
        </div>
      </div>
      <v-divider></v-divider>
      <WorkFlowColors v-if="isOpenColor"
                      :isOpenColor="isOpenColor"
                      @toggleModalColors="toggleModalColors"
                      :onSave="onSaveColor"/>
      <WorkFlowAddEdit ref="addWf"
                   :isEdit="isEditWf"
                   :WF="WF"
                   :title="isEditWf ? WF.name : ''"
                   :onSave="onSaveAddWf"/>
      <WorkflowStages v-if="getWf" :WF="WF"/>
    </div>
  </v-scroll-y-transition>
</template>

<script>
  import WorkFlowAddEdit from './WorkFlowAddEdit'
  import WorkFlowColors from './WorkFlowColors'
  import WorkflowStages from "./WorkflowStages";

  export default {
    name: "WorkflowDetail",
    components: {WorkflowStages, WorkFlowColors, WorkFlowAddEdit},
    data: () => {
      return {
        isEditWf: false,
        WF: {},
        projectId: null,
        color: '',
        isOpenColor: false
      }
    },
    created() {
      this.projectId = this.$route.params.matter || this.$route.params.projectId;
      let _url = '/api/workflows/?project=' + this.projectId;
      this.$http.get(_url).then(rs => {
        this.WF = rs.data[0];
      }).finally(() => {

      })
    },
    computed: {
      getWf() {
        return this.WF && this.WF.pk;
      }
    },
    methods: {

      toggleAddNew(isAdd) {
        this.$refs.addWf.toggleModal();
        this.isEditWf = !isAdd;
      },
      toggleModalColors() {
        this.isOpenColor = !this.isOpenColor;
      },
      onSaveColor(color) {
        this.color = color;
      },

      onSaveAddWf(wf) {
        this.WF = this.$underscore.assign({}, this.WF, wf);
        this.$refs.addWf.toggleModal();
      }

    }
  }
</script>

<style scoped>
  ._disabled {

  }

  ._move {
    cursor: pointer;
  }

  .theme--light.v-timeline:before {
    width: 1px;
  }

  .v-input__slot {
    border-width: 1px !important;
  }


</style>
