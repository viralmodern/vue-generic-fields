<template>
  <v-list fill-height>
    <v-list-item>
      <TreeviewMenuAdd
        requireName="Name topic is required"
        label="Topic"
        nameBtn="Add Topic"
        class="btn-add"
        @add="addTopic"
      />
    </v-list-item>
    <v-list-item>
      <TreeviewMenuAdd
        requireName="Name task is required"
        label="Task"
        nameBtn="Add Task"
        class="btn-add"
        @add="addTask"
        :stages="stages"
        :isSelect="true"
      />
    </v-list-item>
    <v-divider></v-divider>
    <draggable
      class="list-group"
      tag="div"
      v-model="stagesDrag"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <v-list-item
          :color="item.selected ? 'primary':'default'"
          v-for="item in stages"
          :key="item.id"
          @click.prevent="v=>toggleStage(item.id)"
        >
          <v-list-item-action>
            <v-icon :color="item.selected ? 'primary':'default'">drag_handle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="v-list-action">
            <EditListTaskBoard
              @editNameTaskboard="$emit('openModalEditTaskList',item)"
              @deleteItemTaskboard="$emit('opentModalDelete',item)"
              @click.native.stop
            />
          </v-list-item-content>
        </v-list-item>
      </transition-group>
    </draggable>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import TreeviewMenuAdd from "../menus/TreeviewMenuAdd";
import EditListTaskBoard from "../menus/EditListTaskBoard";
export default {
  components: {
    TreeviewMenuAdd,
    EditListTaskBoard,
    draggable
  },
  data() {
    return {
      drag: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", [
      "stages",
      "tasksInStages"
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "stages",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    stagesDrag: {
      get() {
        return this.tasksInStages.map(x => x.id);
      },
      set(value) {
        this.moveStage(value);
      }
    }
  },
  methods: {
    ...mapMutations("ht_store/matter/digitalHoweyChecklist/task", [
      "toggleStage",
      "moveStage"
    ]),
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task", [
      "addTopicTaskBoard",
      "addItemTaskBoard"
    ]),
    addTopic(topic) {
      const data = {
        id: Math.random(),
        name: topic.name,
        alias: topic.name.toLowerCase()
      };
      this.addTopicTaskBoard(data);
    },
    addTask(task) {
      const data = {
        id: Math.random(),
        activities: [
          {
            id: 1,
            executor: {
              name: "Thuan Ho",
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
              department: {
                link: "/department/1902",
                name: "htactive"
              }
            },
            task: "#12 - Add some color scheme",
            executedDate: "2019-01-20T17:00:00.000Z",
            destinationObject: {
              type: "task",
              link: "/task/18921",
              title: "Something Messes up the text color in chrome"
            },
            action: {
              text: "Modify on",
              icon: { name: "create", color: "default" },
              changes: [
                {
                  title: "Priority",
                  from: "4",
                  to: "3"
                },
                {
                  title: "Status",
                  from: "Todo",
                  to: "Doing"
                }
              ]
            }
          },
          {
            id: 2,
            executor: {
              name: "Thuan Ho",
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
              department: {
                link: "/department/1902",
                name: "htactive"
              }
            },
            task: "#12 - Add some color scheme",
            executedDate: "2019-01-20T17:00:00.000Z",
            destinationObject: {
              type: "task",
              link: "/task/18921",
              title: "Something Messes up the text color in chrome"
            },
            action: {
              text: "Modify on",
              icon: { name: "create", color: "default" },
              changes: [
                {
                  title: "Priority",
                  from: "4",
                  to: "3"
                },
                {
                  title: "Status",
                  from: "Todo",
                  to: "Doing"
                }
              ]
            }
          }
        ],
        attachment: 0,
        checkList: [],
        dataCitation: [],
        dueDate: new Date().toISOString(),
        startDate: new Date().toISOString(),
        estimation: null,
        favorable: null,
        hasDescription: false,
        labels: [],
        location: [],
        members: [],
        notes: 0,
        people: [],
        priority: 1,
        progress: 0,
        risk: null,
        worklogs: 0,
        vulnerability: null,
        treatment: null,
        ticketMessages: 0,
        tagging: [],
        subTasks: [],
        cardName: task.name,
        stage: {
          id: task.itemSelect.id
        }
      };
      this.addItemTaskBoard(data);
    }
  }
};
</script>
<style scoped>
.btn-add {
  width: 100%;
}
.v-list-action {
  position: absolute;
  right: 0px;
}
</style>
