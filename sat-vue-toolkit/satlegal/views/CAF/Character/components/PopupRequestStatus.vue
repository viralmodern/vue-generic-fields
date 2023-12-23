<template>
  <div>
    <v-dialog :value="isShowPopup" @input="$emit('closePopup')" :width="width">
      <v-card>
        <v-card-text class="pa-4">
          <p class="black--text" style="font-size:18px">
            The list request set relates to the
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
            :desserts="dataRequestStatus"
          >
            <template v-slot:item.type="{ props: { item } }">
              <LabelColor
                :color="joinRequestSetType(item.type).color"
                :text="joinRequestSetType(item.type).name"
              />
            </template>
          </TableGrid>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
import LabelColor from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/LabelColor";

export default {
  components: {
    TableGrid,
    UserAvatar,
    LabelColor
  },
  props: {
    width: {
      type: Number,
      default: () => 900
    },
    isShowPopup: Boolean,
    dataRequestStatus: Array,
    character: Object
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name",
          active: true
        },
        {
          text: "Type",
          value: "type",
          active: true
        },
        {
          text: "Deadline",
          value: "deadline",
          active: true
        }
      ];
    },
    characterName() {
      return this.character.last_name + " " + this.character.first_name;
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    joinRequestSetType(type) {
      const findType =
        this.appConfigs.requestType.find(x => x.value === type) || {};
      return findType;
    }
  }
};
</script>
