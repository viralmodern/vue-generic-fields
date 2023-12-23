<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="55%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>{{ title }}</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn
            text
            icon
            color="white"
            @click="$emit('closeMenuRight', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div>
        <v-list dense>
          <v-tabs :centered="true" :grow="true" v-model="tab">
            <v-tab>
              About
            </v-tab>
            <v-tab>
              Message
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat :disabled="isLoadingGetDetail">
                <v-progress-linear
                  v-if="isLoadingGetDetail"
                  class="mt-1"
                  indeterminate
                  rounded
                ></v-progress-linear>
                <v-card-text>
                  <About/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="pa-0">
                  <TopicMessage ref="refTopicMessage"/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TopicMessage from "./TopicMessage";
import About from "./About";
export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean
  },
  components: {
    About,
    TopicMessage
  },
  data() {
    return {
      valid: false,
      detailCharacter: {
        name: ""
      },
      tab: null,
      laodingUpdate: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character2", [
      "updatecharacterDetailRequest"
    ]),
    save() {
      if (this.$refs.form.validate()) {
        this.laodingUpdate = true;
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          item: this.detailCharacter,
          pk: this.characterDetail.pk
        };
        this.updatecharacterDetailRequest(data).then(() => {
          this.laodingUpdate = false;
        });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["characterDetail"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  watch: {
    characterDetail: {
      handler(val) {
        if (val) {
          this.detailCharacter = {
            name: val.name
          };
        }
      }
    },
    isShow: {
      handler(val) {
        if (!val) {
          const el = this.$refs.refTopicMessage;
          if (el) {
            el.clearPage();
            el.clearDataFormTopicMessge();
            el.clearCommentInput();
          }
        }
      }
    },
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
