<template>
  <div>{{dataRow.name}}</div>
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
