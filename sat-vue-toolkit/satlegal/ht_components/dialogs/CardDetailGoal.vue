<template>
  <v-dialog :value="isShow" @input="$emit('closeModel')" width="700" persistent>
    <v-card>
      <div :style="{ backgroundColor: item.color }">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <v-row no-gutters>
            <v-col cols="10">
              <v-row no-gutters class="align-center">
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    :value="item.title"
                    dark
                    class="ma-0 pa-0 custom-text-field title font-weight-bold"
                    @change="changeValue('title', $event)"
                    light
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2">
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
          <v-btn class="ma-0" icon @click="$emit('closeModel')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-row no-gutters class="my-3 pa-3">
        <span class="text-caption font-weight-bold">Notes</span>
        <v-col>
          <v-textarea
            hide-details
            auto-grow
            :value="item.description"
            @change="changeValue('description', $event)"
            class="ma-0 pa-0 custom-text-field"
            rows="1"
          ></v-textarea>
        </v-col>
      </v-row>
      <div
        class="pa-2 pa-3"
        v-for="(val, index) in item.keyResults"
        :key="index"
      >
        <v-row no-gutters class="align-center">
          <v-col cols="2">
            <span class="text-caption font-weight-bold"
              >Key Result #{{ index + 1 }}</span
            >
          </v-col>
          <v-col cols="8" class="pl-2">
            <v-slider
              :thumb-size="18"
              thumb-label="always"
              :value="val.progress"
              class="pt-1"
              @change="changeItemProgress(val.id, $event)"
            ></v-slider>
          </v-col>
        </v-row>
        <v-textarea
          hide-details
          auto-grow
          :value="val.result"
          @change="changeDesCriptionKey(val.id, $event)"
          class="ma-0 pa-0 custom-text-field text-secondary"
          rows="1"
        ></v-textarea>
      </div>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="$emit('closeModel')">Close</v-btn>
        <FormKeyResult @addKeyResult="addKeyResult" :item="item" />
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import FormKeyResult from "../menus/FormKeyResult";
export default {
  data() {
    return {
      valid: false
    };
  },
  components: {
    FormKeyResult
  },
  props: {
    isShow: Boolean,
    item: Object
  },
  methods: {
    addKeyResult(data) {
      this.$emit("addKeyResult", data);
    },
    changeValue(name, value) {
      const data = {
        id: this.item.id,
        nameColumn: name,
        newValue: value
      };
      this.$emit("changeInfor", data);
    },
    changeItemProgress(id, value) {
      const data = {
        parentId: this.item.id,
        id: id,
        value: value
      };
      this.$emit("changeProgressItem", data);
    },
    changeDesCriptionKey(keyId, value) {
      const data = {
        parentId: this.item.id,
        keyId: keyId,
        newValue: value
      };
      this.$emit("changeDesCriptionKey", data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
