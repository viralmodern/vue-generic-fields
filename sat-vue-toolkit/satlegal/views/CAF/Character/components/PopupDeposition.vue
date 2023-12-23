<template>
  <div>
    <v-dialog :value="isShowPopup" @input="$emit('closePopup')" :width="width">
      <v-card>
        <v-card-text class="pa-4">
          <p class="black--text" style="font-size:18px">
            The list deposition relates to the
            <v-chip class="pa-2">
              <UserAvatar
                :imageUrl="character.avatar"
                :name="characterName"
                class="mr-2"
              />
              {{ characterName }}
            </v-chip>
          </p>
          <TableGrid
            hide-default-header
            hide-default-footer
            :fixedHeader="false"
            :headers="headers"
            :desserts="dataDepostion"
          >
            <template v-slot:item.time="{ props: { item } }">
              {{ item.time | formatDate("MM/DD/YYYY") }}
            </template>
            <template v-slot:item.upcoming_past="{ props: { item } }">
              <v-chip
                label
                :color="
                  item.upcoming_past === 'Past'
                    ? 'success white--text'
                    : item.upcoming_past === 'N/A'
                    ? ''
                    : 'orange white--text'
                "
                small
              >
                {{ item.upcoming_past }}
              </v-chip>
            </template>
          </TableGrid>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";

export default {
  components: {
    TableGrid,
    UserAvatar
  },
  props: {
    width: {
      type: Number,
      default: () => 900
    },
    isShowPopup: Boolean,
    dataDepostion: Array,
    character: Object
  },
  computed: {
    headers() {
      return [
        {
          text: "Deposition Name",
          value: "name",
          active: true
        },
        {
          text: "Deposition Date",
          value: "time",
          active: true
        },
        {
          text: "[Upcoming/Past]",
          value: "upcoming_past",
          active: true
        }
      ];
    },
    characterName() {
      return this.character.last_name + " " + this.character.first_name;
    }
  }
};
</script>
