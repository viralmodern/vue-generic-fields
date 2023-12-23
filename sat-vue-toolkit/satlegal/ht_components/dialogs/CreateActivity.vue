<template>
  <div class="text-xs-center">
    <v-dialog persistent :value="isShow" @input="cancel" width="500">
      <v-card>
        <div class="primary">
         <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create activity
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Activity name is required']"
              label="Activity name"
              required
              append-icon="person_outline"
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="characters"
              :items="members"
              label="Characters"
              item-text="name"
              item-value="id"
              return-object
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="item.avatar.imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.nickName }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ characters.length - 1 }} others)</span
                >
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="item.avatar.imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-textarea
              v-model="description"
              label="Description activity..."
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="dataTag"
              :items="tag"
              item-text="name"
              label="Tags"
              item-value="id"
              multiple
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ dataTag.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-menu
                v-model="menuStartDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="[v => !!v || 'This field is required']"
                    v-model="startDate"
                    readonly
                    label="Start date"
                    v-on="on"
                    append-icon="date_range"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="menuStartDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" class="pl-3">
              <v-menu
                ref="menu"
                v-model="menuStartTime"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startTime"
                    readonly
                    label="Start time"
                    v-on="on"
                    append-icon="access_time"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuStartTime"
                  v-model="startTime"
                  @click:minute="$refs.menu.save(startTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="6">
              <v-menu
                v-model="menuEndDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="[v => !!v || 'This field is required']"
                    v-model="endDate"
                    readonly
                    label="End date"
                    v-on="on"
                    append-icon="date_range"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="menuEndDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" class="pl-3">
              <v-menu
                ref="menuEndTime"
                v-model="menuEndTime"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="endTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endTime"
                    label="End time"
                    readonly
                    v-on="on"
                    append-icon="access_time"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuEndTime"
                  v-model="endTime"
                  @click:minute="$refs.menuEndTime.save(endTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  data() {
    return {
      valid: true,
      menu: false,
      name: "",
      description: "",
      characters: "",
      dataTag: "",
      menuStartDate: false,
      menuStartTime: false,
      menuEndDate: false,
      menuEndTime: false,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    };
  },
  props: {
    isShow: Boolean
  },
  components: {
    UserAvatar
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    add() {
      if (this.$refs.form.validate()) {
        const { projectId, timelineId } = this.$route.params;
        const data = {
          matterId: projectId,
          timelineId,
          body: {
            name: this.name,
            desc: this.description,
            members: this.characters.map(x => x.id),
            tags: this.dataTag,
            start: new Date(this.startDate).toISOString(),
            end: new Date(this.endDate).toISOString(),
            startTime: this.startTime,
            endTime: this.endTime
          }
        };
        this.$emit("addActivity", data);
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  }
};
</script>
