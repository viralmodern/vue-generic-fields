<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create New Tickets
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form no-gutters class="pa-3" ref="form" lazy-validation>
          <v-row class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'This field is required']"
              label="Name"
              required
            ></v-text-field>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-combobox
              v-model="client"
              :items="members"
              chips
              item-text="name"
              item-value="id"
              label="Select or create Client"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip :key="index" class="v-chip--select-multi">
                  <UserAvatar
                    :avatarSize="32"
                    :imageUrl="(item.avatar || {}).imageUrl"
                    :name="item.name || client"
                  />
                  {{ item.name || client }}
                </v-chip>
              </template>
            </v-combobox>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="matterGroup"
              :items="dataMatter"
              label="Matter Group"
              item-value="id"
              item-text="title"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  color="#41B883"
                  small
                  class="white--text"
                >
                  <span>{{ item.title }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="priority"
              :items="evidencesLevel"
              label="Priority"
              item-value="id"
              item-text="name"
              :disabled="keyGroup === 4 ? true : false"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="showClassColor(item.name)"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="urgency"
              :items="evidencesLevel"
              label="Urgency"
              item-value="id"
              item-text="name"
              :disabled="keyGroup === 5 ? true : false"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="showClassColor(item.name)"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="status"
              :items="itemStatus"
              label="Status"
              item-value="id"
              item-text="name"
              :disabled="keyGroup === 2 ? true : false"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="item.color"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="category_id"
              :items="category"
              label="Category"
              item-value="id"
              item-text="name"
              :disabled="keyGroup === 3 ? true : false"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="`#` + item.color"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
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
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
import { evidencesLevel, itemStatus } from "../../config";
export default {
  components: {
    UserAvatar
  },
  props: {
    isShow: Boolean,
    typeName: String,
    keyGroup: [Number, Boolean, String],
    keyName: String
  },
  data() {
    return {
      evidencesLevel,
      itemStatus,
      menuDate: false,
      name: "",
      priority: null,
      urgency: null,
      type: null,
      status: null,
      category_id: null,
      matterGroup: null,
      client: null
    };
  },
  methods: {
    ...mapActions("ht_store/matter/helpDesk/view", ["createTickets"]),
    add() {
      if (this.$refs.form.validate()) {
        const bodyRequest = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          name: this.name,
          priority: this.priority || 1,
          urgency: this.urgency || 1,
          status: this.status || 1,
          category: this.category_id || 1,
          matterGroup: this.matterGroup,
          client_name: this.client.name || this.client,
          keyName: this.keyName
        };
        this.createTickets(bodyRequest);
        this.cancel();
      }
    },
    showClassColor(name) {
      if (name === "Very low") {
        return "#512da8";
      } else if (name === "Very high") {
        return "#ff6f00";
      } else if (name === "Low") {
        return "#76ff03";
      } else if (name === "Normal") {
        return "#f50057";
      } else if (name === "High") {
        return "#00c853";
      }
    },
    cancel() {
      this.$emit("closeModal");
      var { keyGroup } = this;
      this.status = keyGroup === 2 ? this.status : null;
      this.category_id = keyGroup === 3 ? this.category_id : null;
      this.priority = keyGroup === 4 ? this.priority : null;
      this.urgency = keyGroup === 5 ? this.urgency : null;
      this.name = "";
      this.client = null;
      this.type = null;
      this.matterGroup = null;
      this.$refs.form.resetValidation();
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/helpDesk/category", ["category"]),
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  watch: {
    typeName(val) {
      const { keyGroup, itemStatus, category, evidencesLevel } = this;
      if (keyGroup === 1) {
        return;
      } else if (keyGroup === 2) {
        this.status = val ? itemStatus.find(x => x.name === val).id : null;
      } else if (keyGroup === 3) {
        this.category_id = val ? category.find(x => x.name === val).id : null;
      } else if (keyGroup === 4) {
        this.priority = val
          ? evidencesLevel.find(x => x.name === val).id
          : null;
      } else if (keyGroup === 5) {
        this.urgency = val ? evidencesLevel.find(x => x.name === val).id : null;
      }
    }
  }
};
</script>
