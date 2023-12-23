<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-row no-gutters class="justify-center">
            <h1 class="text-uppercase">Create Master</h1>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              v-model="nameMaster"
              :rules="[v => !!v || 'Please provide master name']"
              label="Master name"
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="justify-center align-center">
            <v-col cols="12">
              <v-switch
                color="primary"
                v-model="status"
                :label="statusAction"
              ></v-switch>
            </v-col>
            <v-col cols="10">{{ contentStatus }}</v-col>
          </v-row>
          <v-row no-gutters>
            <v-textarea
              name="description"
              v-model="description"
              label="Matter description"
            ></v-textarea>
          </v-row>
          <v-row no-gutters>
            <v-autocomplete
              v-model="users"
              :items="members.filter(x => x.id !== currentUser.pk)"
              filled
              chips
              label="Invite members"
              item-text="name"
              item-value="id"
              multiple
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.avatar.imageUrl" />
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar.imageUrl" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.group"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-row>
          <v-row no-gutters>
            <v-col>
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
                    :rules="[v => !!v || 'Start date is required']"
                    v-model="startDate"
                    label="Start date"
                    readonly
                    :max="endDate"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="menuStartDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="ml-3">
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
                    :rules="[v => !!v || 'End date is required']"
                    v-model="endDate"
                    :disabled="showEndDate"
                    label="End date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :disabled="showEndDate"
                  :min="startDate"
                  v-model="endDate"
                  @input="menuEndDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-autocomplete
              :rules="[v => !!v || 'Master type is required']"
              v-model="type"
              :items="typeMaster"
              label="Master type"
              item-text="name"
              item-value="id"
              required
            ></v-autocomplete>
          </v-row>
          <v-row no-gutters class="justify-end">
            <v-btn color="primary" @click="add">Create</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { typeMaster } from "../../config";
export default {
  data() {
    return {
      status: false,
      users: [],
      menuStartDate: false,
      menuEndDate: false,
      startDate: "",
      endDate: "",
      nameMaster: "",
      description: "",
      type: "",
      typeMaster,
      valid: true
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    ...mapGetters("ht_store/user", ["currentUser"]),
    contentStatus() {
      const text1 = "This the master accessible and read by every member";
      const text2 = "Only invited members can access this master";
      return this.status ? text1 : text2;
    },
    statusAction() {
      return this.status ? "Public" : "Private";
    },
    showEndDate() {
      return this.startDate ? false : true;
    }
  },
  methods: {
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/matter", ["addDataMatterRequest"]),
    remove(item) {
      const index = this.users.indexOf(item.name);
      if (index >= 0) this.users.splice(index, 1);
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          creator: 1,
          members: this.users,
          startDate: this.startDate,
          endDate: this.endDate,
          title: this.nameMaster,
          description: this.description,
          type: this.type
        };
        const result = await this.addDataMatterRequest(data);
        this.$router.push({
          name: "Detail",
          params: {
            projectId: result.pk
          }
        });
        this.clear();
      }
    },
    clear() {
      this.users = "";
      this.startDate = "";
      this.endDate = "";
      this.title = "";
      this.description = "";
      this.type = "";
    }
  }
};
</script>
