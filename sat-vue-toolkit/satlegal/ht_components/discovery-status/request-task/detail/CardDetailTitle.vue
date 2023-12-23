<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>list_alt</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row no-gutters class="justify-center">
            <span class="title mouse">
              <v-textarea
                hide-details
                auto-grow
                :value="title"
                @change="
                  $emit('update', { newValue: $event, columnName: 'name' })
                "
                class="ma-0 pa-0 custom-text-field"
                rows="1"
              ></v-textarea>
            </span>
            <span class="subheading text--secondary">{{
              date | formatDMY
            }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row right wrap>
        <MenuListMembers
          style="flex-wrap: unset;"
          title="List members"
          :value="detailMembers"
          :list="listMembers"
          name="members"
          keySearch="name"
          @select="$emit('update', { newValue: $event, columnName: 'members' })"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import MenuListMembers from "../../../menus/MenuListMembers";
export default {
  components: {
    MenuListMembers
  },
  props: {
    title: String,
    date: String,
    listMembers: Array,
    detailMembers: Array
  }
};
</script>

<style scoped>
.icon-mess {
  justify-content: center;
  align-items: center;
  display: flex;
}
.mouse {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.custom /deep/ .v-icon {
  padding: 0px;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 20px;
}
</style>
