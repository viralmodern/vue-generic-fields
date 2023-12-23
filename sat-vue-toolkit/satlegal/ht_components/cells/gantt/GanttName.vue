<template>
  <div>
    <div
      v-if="dataRow.ctype === 'stage'"
      class="text-uppercase font-weight-bold"
    >
      {{ dataRow.object.name }}
    </div>
    <div
      style="cursor:pointer"
      @click="openDetail"
      v-if="dataRow.ctype === 'task'"
    >
      {{ dataRow.object.cardName }}
    </div>
    <div v-if="dataRow.ctype === 'add_stage' || dataRow.ctype === 'add_task'">
      <v-row
        no-gutters
        v-if="idAdd !== dataRow.id"
        style="cursor: pointer"
        class="align-center"
        @click="$emit('openAdd')"
      >
        <span class="primary--text">{{ nameAction }}</span>
        &nbsp;
        <v-icon small color="primary pa-0">mdi-add</v-icon>
      </v-row>
      <v-form ref="form" v-else>
        <v-row no-gutters>
          <v-text-field
            autofocus
            hide-details
            class="ma-0 pa-0"
            v-model="text"
            :rules="[v => !!v || 'This field is required']"
          />
          <v-btn
            @click="save(dataRow.ctype)"
            class="ma-0 custom"
            icon
            color="primary"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn @click="cancel" class="ma-0 custom" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object,
    idAdd: String
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    nameAction() {
      return this.dataRow.ctype === "add_stage"
        ? "Add list"
        : this.dataRow.ctype === "add_task"
        ? "Add task"
        : null;
    },
    routeForDetail() {
      return {
        name: "CardDetail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          cardId: 189
        }
      };
    }
  },
  methods: {
    save(ctype) {
      if (this.$refs.form.validate()) {
        let data = {};
        if (ctype === "add_stage") {
          data = {
            handle: "add_list",
            id: Math.random(),
            name: this.text,
            alias: this.text.toLowerCase()
          };
        }
        if (ctype === "add_task") {
          data = {
            handle: "add_task",
            id: Math.random(),
            activities: [],
            attachment: [],
            checkList: [],
            dataCitation: [],
            duaDate: new Date().toISOString(),
            estimation: null,
            favorable: null,
            hasDescription: false,
            labels: [],
            location: [],
            members: [],
            notes: [],
            people: [],
            priority: 1,
            progress: 20,
            risk: null,
            subTasks: [],
            worklogs: [],
            vulnerability: null,
            treatment: null,
            ticketMessages: [],
            tagging: [],
            cardName: this.text,
            stage: {
              id: this.dataRow.object.id
            }
          };
        }
        this.$emit("add", data);
        this.cancel();
      }
    },
    cancel() {
      this.clear();
      this.$emit("closeAdd");
    },
    clear() {
      this.text = "";
    },
    openDetail() {
      this.$router.push(this.routeForDetail);
    }
  },
  watch: {
    idAdd(id) {
      if (id !== this.dataRow.id) {
        this.text = "";
      }
    }
  }
};
</script>
