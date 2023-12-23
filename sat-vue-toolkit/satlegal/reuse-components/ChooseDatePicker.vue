<template>
  <div style="width: 150px">
    <v-edit-dialog>
      <span class="text-caption mr-2">
        {{date}}
      </span>
      <v-icon x-small class="fa-user-plus1" color="#dcdcdc">mdi-calendar</v-icon>
      <template v-slot:input>
        <v-date-picker v-model="date"
                       no-title
                       scrollable
        ></v-date-picker>
      </template>
    </v-edit-dialog>
  </div>
</template>

<script>
  export default {
    name: "ChooseDatePicker",
    data() {
      return {
        date: null
      }
    }
  }
</script>

<style lang="scss">
  .fa-user-plus1,
  .fa-map-marker,
  .fa-cell-icon {
    color: #7a797e;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: all 0.25s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: dashed 1px #c1c2c3;
    color: #dcdcdc;

    &:hover,
    &.active {
      background: rgba(17, 205, 239, 0.5);
      color: #fff;

      * {
        color: #fff !important;
      }
    }
  }
</style>
