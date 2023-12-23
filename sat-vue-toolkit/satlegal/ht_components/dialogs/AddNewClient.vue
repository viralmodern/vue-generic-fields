<template>
  <div class="pa-2">
    <v-dialog persistent v-model="dialog" width="650">
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          outline
          @click="isShowModelCreate = true"
          v-on="on"
        >
          <v-icon class="mr-2">add</v-icon>New Client
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="title font-weight-regular white--text">
              Create client
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            label="Client name"
            v-model="name"
            append-icon="person_outline"
          ></v-text-field>

          <div class="pa-1">
            <v-select
              :items="statusOfClient"
              :rules="[v => !!v || 'This field is required']"
              label="Status"
              item-text="name"
              item-value="id"
              return-object
              @change="changeStatus"
            ></v-select>
          </div>

          <div>
            <v-select
              :items="character"
              item-text="email"
              item-value="id"
              label="Character"
              return-object
              placeholder="Character"
              multiple
              @change="changeCharacters"
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
                  <span>{{ item.avatar.nickName }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
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
          </div>

          <div class="pa-1">
            <v-select
              :items="accountTypeOfClient"
              :rules="[v => !!v || 'This field is required']"
              label="Account Type"
              item-text="name"
              item-value="id"
              return-object
              @change="changeAccountType"
            ></v-select>
          </div>

          <div class="pa-1">
            <v-select
              :items="dataMatter"
              :rules="[v => !!v || 'This field is required']"
              label="Matter"
              item-text="title"
              item-value="id"
              return-object
              @change="changeMatter"
            ></v-select>
          </div>

          <div>
            <v-text-field
              v-if="portal === true"
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
            ></v-text-field>
          </div>

          <div>
            <v-checkbox
              v-model="portal"
              label="Enable Client Portal?"
            ></v-checkbox>
            <v-checkbox
              v-model="clientSigned"
              label="This client is signed alreadly."
            ></v-checkbox>
          </div>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="
              dialog = false;
              $refs.form.reset();
            "
            >Cancel</v-btn
          >
          <v-btn class="v-btn theme--light primary" @click="createClient"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { accountTypeOfClient, statusOfClient } from "../../config";
import UserAvatar from "../avatars/UserAvatar";

export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      rules: {
        required: v => !!v || "This field is required.",
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail.";
        }
      },
      dialog: false,
      valid: false,
      name: "",
      newTags: [],
      accountTypeOfClient,
      statusOfClient,
      status: null,
      accountType: null,
      assignee: [],
      filters: {
        value: []
      },
      matter: null,
      portal: false,
      clientSigned: false,
      email: ""
    };
  },
  methods: {
    ...mapActions("ht_store/workspace/client", ["createNewClient"]),
    createClient() {
      if (this.$refs.form.validate()) {
        const uuid = [
          Math.random()
            .toString(16)
            .slice(2, 10),
          Math.random()
            .toString(16)
            .slice(2, 6),
          (Math.random() * 0.0625 + 0.25).toString(16).slice(2, 6),
          (Math.random() * 0.25 + 0.5).toString(16).slice(2, 6),

          Math.random()
            .toString(16)
            .slice(2, 14)
        ].join("-");
        const data = {
          id: Math.random(),
          user: {
            imageUrl:
              "https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png",
            email: this.email,
            first_name: "",
            last_name: "",
            name: this.name,
            nickName: this.name + Math.floor(Math.random() * 10000 + 1),
            type: this.accountType,
            status: this.status,
            assignee: this.assignee,
            matter: this.matter,
            portal: this.portal,
            clientSigned: this.clientSigned
          },
          role: 1,
          uuid,
          name: this.name,
          jobTitle: "Mobile Developer",
          email: this.email,
          username: this.name + Math.floor(Math.random() * 10000 + 1),
          phone: Math.floor(100000000 + Math.random() * 900000000),
          avatar:
            "https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png",
          address: null
        };
        this.createNewClient(data);
        this.dialog = false;
        this.$refs.form.reset();
      }
    },
    changeStatus(e) {
      this.status = e.id;
    },
    changeAccountType(e) {
      this.accountType = e.id;
    },
    changeCharacters(array) {
      this.filters.value = array;
      this.assignee = array.map(e => e.id);
    },
    changeMatter(e) {
      this.matter = e.id;
    },
    cancel() {
      this.isShowAddLabel = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
