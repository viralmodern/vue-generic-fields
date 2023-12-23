<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <IndexTitle
              :nameTab="dataIndexDetail.nameTab"
              :title="dataIndexDetail.name"
              :date="dataIndexDetail.creataAt"
              :characters="dataIndexDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Fact">{{dataIndexDetail.nameTab}}</v-tab>
              <v-tab key="Linked">Linked</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="Worklog">Worklog</v-tab>
              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab key="Attachment">Attachment</v-tab>
              <v-tab-item class="pa-3" key="index">
                <HomeDocument
                  :dataIndexDocument="dataIndexDetail.indexDetail.terminology"
                  :dataHightLight="dataHightLight"
                  v-if="dataIndexDetail.nameTab === 'Index Document'"
                />
                <HomePhoto
                  :dataHappened="dataIndexDetail.indexDetail.happened"
                  v-if="dataIndexDetail.nameTab === 'Index Photo'"
                />
                <HomeAudio
                  v-if="dataIndexDetail.nameTab === 'Index Audio'"
                  :dataAudio="dataIndexDetail.indexDetail.audioDetail"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Worklog">
                <WorkLog :worklog="dataIndexDetail.worklog" />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Checklist">
                <CheckList />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Notes">
                <Notes />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Attachment">
                <Attachment />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <IndexRight :items="dataIndexDetail" />
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import IndexTitle from "../discovery-index/IndexTitle";
import IndexRight from "../discovery-index/IndexRight";
import WorkLog from "../discovery-index/WorkLog";
import CheckList from "../discovery-index/CheckList";
import Notes from "../discovery-index/Notes";
import Comment from "../discovery-index/Comment";
import Attachment from "../discovery-index/Attachment";
import HomeDocument from "../discovery-index/HomeDocument";
import HomePhoto from "../discovery-index/HomePhoto";
import HomeAudio from "../discovery-index/HomeAudio";

export default {
  components: {
    IndexTitle,
    IndexRight,
    WorkLog,
    CheckList,
    Notes,
    Comment,
    Attachment,
    HomeDocument,
    HomePhoto,
    HomeAudio
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/linkedCharacter", ["dataLinkedCharacter"]),
    ...mapGetters("ht_store/matter/discovery/index/detailIndex", ["dataIndexDetail"]),
    dataHightLight() {
      return this.dataIndexDetail.indexDetail.hightLight.map(x => {
        const listSupported = this.dataLinkedCharacter.filter(y =>
          x.listSupported.includes(y.id)
        );
        return { ...x, listSupported };
      });
    }
  }
};
</script>
