<template>
  <v-list-item :to="to" class="board-item">
    <v-row no-gutters class="d-flex justify-center align-center">
      <v-col cols="11">
        <v-row no-gutters class="text-body-2">
          {{ name }}
          <v-spacer></v-spacer>
          <span>&nbsp;&nbsp;{{ done }}/{{ total }}</span>
        </v-row>
        <div>
          <ProgressBar :name="name" :done="done" :total="total" />
        </div>
      </v-col>
      <v-col cols="1">
        <MenuProjectCheckList
          @click.native.stop
          @deleteBoard="$emit('deleteBoard')"
        />
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import ProgressBar from "../inputs/ProgressBar";
import MenuProjectCheckList from "../menus/MenuProjectCheckList";
export default {
  components: {
    ProgressBar,
    MenuProjectCheckList
  },
  props: {
    to: Object,
    name: String,
    done: Number,
    total: Number
  }
};
</script>

<style scoped>
.board-item {
  height: 60px;
}
.board-item /deep/ a {
  display: block;
  height: 100%;
}
.d-flex {
  display: flex;
}
</style>
