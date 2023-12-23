<template>
  <div style="display: inline;">
    <v-btn
      class="ma-0"
      icon
      @click="
        commands.createTable({
          rowsCount: 3,
          colsCount: 3,
          withHeaderRow: false
        })
      "
    >
      <font-awesome-icon icon="table" />
    </v-btn>
    <span v-if="isActive.table()">
      <v-btn icon @click="commands.deleteTable">
        <div style="width:15px;heigth:15px">
          <IconSvg
            d="M19 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-2.5 5.938h5a.937.937 0 1 0 0-1.875h-5a.937.937 0 1 0 0 1.875zM12.29 17H9v5h3.674c.356.75.841 1.426 1.427 2H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v2.823a.843.843 0 0 1 0 .354V14.1a7.018 7.018 0 0 0-2-1.427V9h-5v3.29a6.972 6.972 0 0 0-2 .965V9H9v6h4.255a6.972 6.972 0 0 0-.965 2zM17 7h5V5a3 3 0 0 0-3-3h-2v5zm-2 0V2H9v5h6zM7 2H5a3 3 0 0 0-3 3v2h5V2zM2 9v6h5V9H2zm0 8v2a3 3 0 0 0 3 3h2v-5H2z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.addColumnBefore">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M19 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm2.5 5.938a.937.937 0 1 0 0-1.875h-1.25a.312.312 0 0 1-.313-.313V16.5a.937.937 0 1 0-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 1 0 0 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 1 0 1.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM2 19a3 3 0 0 0 6 0V5a3 3 0 1 0-6 0v14zm-2 0V5a5 5 0 1 1 10 0v14a5 5 0 0 1-10 0z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.addColumnAfter">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M5 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm2.5 5.938a.937.937 0 1 0 0-1.875H6.25a.312.312 0 0 1-.313-.313V16.5a.937.937 0 1 0-1.875 0v1.25c0 .173-.14.313-.312.313H2.5a.937.937 0 1 0 0 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 1 0 1.875 0v-1.25c0-.173.14-.313.312-.313H7.5zM16 19a3 3 0 0 0 6 0V5a3 3 0 0 0-6 0v14zm-2 0V5a5 5 0 0 1 10 0v14a5 5 0 0 1-10 0z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.deleteColumn">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M12.641 21.931a7.01 7.01 0 0 0 1.146 1.74A5 5 0 0 1 7 19V5a5 5 0 1 1 10 0v7.29a6.972 6.972 0 0 0-2 .965V5a3 3 0 0 0-6 0v14a3 3 0 0 0 3.641 2.931zM19 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-2.5 5.938h5a.937.937 0 1 0 0-1.875h-5a.937.937 0 1 0 0 1.875z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.addRowBefore">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M19 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm2.5 5.938a.937.937 0 1 0 0-1.875h-1.25a.312.312 0 0 1-.313-.313V16.5a.937.937 0 1 0-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 1 0 0 1.875h1.25c.173 0 .313.14.313.312v1.25a.937.937 0 1 0 1.875 0v-1.25c0-.173.14-.313.312-.313h1.25zM5 2a3 3 0 1 0 0 6h14a3 3 0 0 0 0-6H5zm0-2h14a5 5 0 0 1 0 10H5A5 5 0 1 1 5 0z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.addRowAfter">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M19 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm2.5 5.938a.937.937 0 1 0 0-1.875h-1.25a.312.312 0 0 1-.313-.313V2.5a.937.937 0 1 0-1.875 0v1.25c0 .173-.14.313-.312.313H16.5a.937.937 0 1 0 0 1.875h1.25c.173 0 .313.14.313.312V7.5a.937.937 0 1 0 1.875 0V6.25c0-.173.14-.313.312-.313h1.25zM5 16a3 3 0 0 0 0 6h14a3 3 0 0 0 0-6H5zm0-2h14a5 5 0 0 1 0 10H5a5 5 0 0 1 0-10z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.deleteRow">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M13.255 15a6.972 6.972 0 0 0-.965 2H5A5 5 0 0 1 5 7h14a5 5 0 0 1 4.671 6.787 7.01 7.01 0 0 0-1.74-1.146A3 3 0 0 0 19 9H5a3 3 0 0 0 0 6h8.255zM19 14a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-2.5 5.938h5a.937.937 0 1 0 0-1.875h-5a.937.937 0 1 0 0 1.875z"
          />
        </div>
      </v-btn>
      <v-btn icon @click="commands.toggleCellMerge">
        <div style="width:16px;heigth:16px">
          <IconSvg
            d="M2 19a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v14zm-2 0V5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5zm12-9a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0 6a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1zm0-13a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1z"
          />
        </div>
      </v-btn>
    </span>
  </div>
</template>

<script>
import IconSvg from "../icon/IconSvg";

export default {
  components: {
    IconSvg
  },
  props: {
    commands: Object,
    isActive: Object
  }
};
</script>
