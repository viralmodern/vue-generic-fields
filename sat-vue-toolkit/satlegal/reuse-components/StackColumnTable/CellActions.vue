<template>
  <td class="td-action sticky_col">
    <v-row>
      <v-col cols="2">
        <v-btn small text icon style="cursor: move" class="drag-hander">
          <v-icon>mdi-drag</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10" justify="center" align="center">
        <slot name="action" />
      </v-col>
    </v-row>
  </td>
</template>
<style scoped lang="scss">
.drag-hander {
  transform: translateX(-10px);
}
.td-action {
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #D6D7D9;
}
.table-grid tbody tr:nth-child(even) {
  background: hsla(0, 0%, 100%, 0.1);

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: hsla(0, 0%, 100%, 1);
  }
}

.table-grid tbody tr:nth-child(odd) {
  background: #f4f5f7;

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: #f4f5f7;
  }
}

.sticky_col {
  position: sticky;
  left: 0;
  z-index: 3;
  background: hsla(0, 0%, 100%, 1);
}
</style>
