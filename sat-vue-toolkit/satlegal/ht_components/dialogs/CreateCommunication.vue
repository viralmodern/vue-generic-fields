<template>
  <v-dialog :value="isShow" @input="cancel" width="500" persistent>
    <v-card class="pa-3">
      <v-card-title>
        <span class="text-h5">Add log communication</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Privilege name is required']"
              label="Communication name"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="date"
                  readonly
                  label="Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuTime"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="time"
                  readonly
                  label="Time"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker no-title v-if="menuTime" v-model="time">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="cancel">Cancel</v-btn>
                <v-btn color="primary" @click="menuTime = false">OK</v-btn>
              </v-time-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-textarea
              v-model="description"
              label="Description..."
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="tag"
              :items="tags"
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
                  >(+{{ tag.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="from"
              :items="character"
              item-text="name"
              label="From"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ filters.value.length - 1 }} others)</span
                >
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="to"
              :items="character"
              item-text="name"
              label="To"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ filters.value.length - 1 }} others)</span
                >
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" @click="cancel">Cancel</v-btn>
        <v-btn color="primary darken-1" @click="add">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { privilegeType } from "../../config.js";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      privilegeType,
      name: "",
      menuDate: false,
      menuTime: false,
      date: "",
      time: "",
      description: "",
      tag: "",
      from: "",
      to: ""
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          date: this.date,
          time: this.time,
          description: this.description,
          tags: this.tag,
          from: this.from,
          to: this.to
        };
        this.$emit("addLogType", data);
        this.$refs.form.reset();
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/tag", ["tags"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
