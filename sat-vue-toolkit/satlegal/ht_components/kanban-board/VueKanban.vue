<template>
  <draggable
    class="drag-container"
    tag="div"
    v-model="stagesIds"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <transition-group
      tag="ul"
      class="drag-list"
      type="transition"
      :name="!drag ? 'flip-list' : null"
    >
      <li
        v-for="stage in stages"
        class="drag-column"
        :class="{['drag-column-' + (stage.id||0)]: true, 'dont': !stage.id}"
        :key="stage.id || 0"
      >
        <span class="drag-column-header">
          <slot :name="`sl-stage-${stage.id}`"></slot>
        </span>
        <div class="drag-options"></div>
        <ul
          class="drag-inner-list"
          ref="list"
          :data-to-list="JSON.stringify(stage)"
          :data-status="stage.name"
        >
          <li
            class="drag-item"
            v-for="task in stage.tasks"
            :data-from-list="JSON.stringify(stage)"
            :data-from-task="JSON.stringify(task)"
            :key="task.id"
          >
            <slot name="taskTemplate" :stage="stage" :task="task">
              <strong>{{ task.status }}</strong>
              <div>{{ task.id }}</div>
            </slot>
          </li>
        </ul>
        <div class="drag-column-footer">
          <slot :name="`footer-${stage.id}`"></slot>
        </div>
      </li>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import dragula from "dragula";
export default {
  components: {
    draggable
  },
  props: {
    stages: Array
  },
  data() {
    return { drag: false };
  },
  mounted() {
    setTimeout(() => {
      dragula(this.$refs.list)
        .on("drag", el => {
          el.classList.add("is-moving");
        })
        .on("drop", (block, list) => {
          const fromTask = JSON.parse(block.dataset.fromTask);
          const fromList = JSON.parse(block.dataset.fromList);
          const toList = JSON.parse(list.dataset.toList);
          let newIndex;
          let oldIndex;
          for (newIndex = 0; newIndex < list.children.length; newIndex++) {
            if (list.children[newIndex].classList.contains("is-moving")) break;
          }
          for (oldIndex = 0; oldIndex < fromList.tasks.length; oldIndex++) {
            if (fromList.tasks[oldIndex].id === fromTask.id) break;
          }
          const fromListIndex = this.stages.findIndex(x => x.id == fromList.id);
          const toListIndex = this.stages.findIndex(x => x.id === toList.id);
          const toTask = toList.tasks[newIndex] || {
            priority: 1000
          };
          const begin = {
            fromList,
            fromListIndex,
            fromTask
          };
          const end = {
            toList,
            toTask,
            toListIndex
          };
          const position = {
            newIndex,
            oldIndex
          };
          this.$emit("update-block", begin, end, position);
        })
        .on("dragend", el => {
          el.classList.remove("is-moving");
          window.setTimeout(() => {
            el.classList.add("is-moved");
            window.setTimeout(() => {
              el.classList.remove("is-moved");
            }, 600);
          }, 100);
        });
    }, 1000);
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "stages",
        disabled: false,
        ghostClass: "ghost",
        filter: ".dont"
      };
    },
    stagesIds: {
      get() {
        return this.stages.map(x => x.id);
      },
      set(value) {
        this.$emit("moveStages", value.filter(x => !!x));
      }
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
