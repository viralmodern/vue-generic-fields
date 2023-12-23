<template>
  <v-row v-if="item" no-gutters>
    <v-col cols="12">
      <v-card>
        <v-col
          cols="12"
          v-if="cardTitle === item.title && item.isActive === true"
        >
          <CardMeetingDetailEdit
            :itemDuration="itemDuration"
            @click.native.stop
            class="mouse-card"
            :item="item"
            @emitDataCard="v => $emit('emitDataCard', v)"
            @updateWhenClickingOnTheCard="
              v => $emit('updateWhenClickingOnTheCard', v)
            "
          />
        </v-col>
        <v-col cols="12" v-else>
          <v-row
            no-gutters
            v-if="item"
            @click="$emit('editCard', item)"
            class="pa-2 ml-2"
          >
            <v-col cols="12">
              <v-row no-gutters class="justify-space-between">
                <v-col cols="10" align-center d-flex>
                  <span class="text-body-2">{{ item.title }}</span>
                </v-col>
                <v-col cols="2">
                  <v-row no-gutters class="justify-space-between align-center">
                    <v-col cols="10" class="text-xs-right">
                      <span
                        class="font-weight-medium"
                        v-if="item.duration.name !== 'no duration'"
                        >{{ item.duration.name }}</span
                      >
                    </v-col>
                    <v-col cols="2" class="mr-1">
                      <v-btn
                        small
                        icon
                        @click.native.stop="openModalDelete(item)"
                      >
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div v-html="item.content" class="mt-1"></div>
              <div>
                <v-row no-gutters>
                  <v-btn
                    depressed
                    small
                    v-for="v in item.arrFile"
                    :key="v.id"
                    :href="v.link"
                    target="blank"
                  >
                    <v-icon color="primary" v-if="v.type === 1" small
                      >image</v-icon
                    >
                    <v-icon color="light-blue" v-if="v.type === 2" small
                      >attachment</v-icon
                    >
                    <v-icon v-if="v.type === 3" small>insert_drive_file</v-icon>
                    <span class="ml-2 text-lowercase">{{ v.nameFile }}</span>
                  </v-btn>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this card?"
    />
  </v-row>
</template>
<script>
import CardMeetingDetailEdit from "../cards/CardMeetingDetailEdit";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  components: {
    CardMeetingDetailEdit,
    ConfirmItem
  },
  props: {
    item: Object,
    itemDuration: Array,
    cardTitle: String
  },
  data() {
    return {
      isShowPopup: false,
      objectCard: null
    };
  },
  methods: {
    openModalDelete(item) {
      this.objectCard = item;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      if (this.objectCard) {
        this.$emit("removeCard", this.objectCard);
        this.isShowPopup = false;
      }
    }
  }
};
</script>
<style scoped>
.mouse-card {
  cursor: pointer;
}
</style>
