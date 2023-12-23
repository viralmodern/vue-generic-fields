<template>
  <v-row column class="right-border-solid">
    <v-divider></v-divider>
    <v-list>
      <v-row no-gutters class="justify-center align-center">
        <v-col cols="2" class="div-tag">
          <span :style="{ color: color }" class="span-tag font-weight-bold"
            >#</span
          >
        </v-col>
        <v-col cols="1" 0>
          <div :style="{ color: color }" class="text-body-1 font-weight-bold">
            {{ board.title }}
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-2">
        <v-col cols="12">
          <v-row no-gutters>
            <span class="ml-2">Tasks resolved</span>
            <span class="title ml-2">
              {{ board.tasksCounts.done }}
              <span class="text-body-1 text--secondary"
                >of {{ board.tasksCounts.all }}</span
              >
            </span>
            <v-row row class="justify-center align-center">
              <v-col class="ml-1 mr-1 st-progress">
                <v-progress-linear
                  :color="color"
                  :size="100"
                  v-model="percentTasks"
                ></v-progress-linear>
              </v-col>
              <span :style="{ color: color }" class="caption mr-2"
                >{{ percentTasks }}%</span
              >
            </v-row>
          </v-row>
        </v-col>

        <v-col cols="12" class="mt-2">
          <v-row no-gutters>
            <span class="ml-2">Hours committed</span>
            <span class="title ml-2">
              {{ board.hours.spent }}
              <span class="text-body-1 text--secondary"
                >of {{ board.hours.committed }}</span
              >
            </span>
            <v-row row class="justify-center align-center">
              <v-col class="ml-1 mr-1 st-progress">
                <v-progress-linear
                  :color="color"
                  :size="100"
                  :value="percentHours"
                ></v-progress-linear>
              </v-col>
              <span :style="{ color: color }" class="caption mr-2"
                >{{ percentHours }}%</span
              >
            </v-row>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row no-gutters>
            <v-row row justify-space-between class="pl-2 pr-2">
              <span class="text--secondary">Resoucre used</span>
              <span>{{ board.resources.length }} team members</span>
            </v-row>
            <div class="ml-1 mt-1">
              <v-tooltip
                bottom
                v-for="(item, index) in board.resources.slice(0, checkHasMore)"
                :key="index"
              >
                <template v-slot:activator="{ on }">
                  <UserAvatar
                    :avatarSize="30"
                    :imageUrl="(item.resource.avatar || {}).imageUrl"
                    :name="item.resource.name"
                    class="ml-1"
                    v-on="on"
                  />
                </template>
                <span>@{{ item.resource.name }}</span>
              </v-tooltip>
              <v-avatar
                class="ml-1"
                size="30px"
                color="primary"
                v-if="board.resources.length > checkHasMore"
              >
                <span class="white--text text-body-2">{{ nameSymbol }}</span>
              </v-avatar>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-list>
  </v-row>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    board: Object,
    color: String
  },
  computed: {
    percentTasks() {
      var resultPercentTasks =
        (this.board.tasksCounts.done / this.board.tasksCounts.all) * 100;
      return resultPercentTasks.toFixed(0);
    },
    percentHours() {
      var resultPercentHours =
        (this.board.hours.spent / this.board.hours.committed) * 100;
      return resultPercentHours.toFixed(0);
    },
    checkHasMore() {
      return this.board.resources.length === 5 ? 5 : 6;
    },
    nameSymbol: function() {
      let countRest = this.board.resources.length - this.checkHasMore;
      if (countRest < 99) {
        return "+" + countRest;
      }
      return 99 + "+";
    }
  }
};
</script>
<style scoped>
.span-tag {
  background: #dce1fe;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 16px;
  font-size: 22px;
  color: #6b7cc8;
}
.div-tag {
  justify-content: center;
  display: flex;
}
.st-progress {
  height: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.right-border-solid {
  border-right: 1px solid silver;
}
</style>
