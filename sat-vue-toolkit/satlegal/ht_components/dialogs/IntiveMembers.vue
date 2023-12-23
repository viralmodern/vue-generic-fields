<template>
  <v-dialog v-model="dialog" @input="closeModal" max-width="600px">
    <v-btn v-slot:activator="{ on }">
      <div v-on="on">
        <v-icon size="30">mdi-add_circle_outline</v-icon>
        <span class="ml-2 text-none">Add member</span>
      </div>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="text-h5">Invite members</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-row no-gutters>
            <v-list cols="12" subheader>
              <h3 class="text-body-1 ml-1">Invite via email address</h3>
            </v-list>
            <v-col cols="12" sm="10">
              <v-form v-model="readOnly" ref="form">
                <v-text-field
                  v-model="emailAddress"
                  :rules="emailRules"
                  label="Member's email address"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" @click="intivedEmailAddress">Intive</v-btn>
            </v-col>
            <v-list cols="12" subheader>
              <h3 class="text-body-1 ml-1">Invited ({{ numberMember }})</h3>
            </v-list>
          </v-row>
          <v-row no-gutters>
            <div>
              <v-chip v-for="item in detailInvitedMember" :key="item.id">
                <v-avatar>
                  <img :src="item.imageUrl" />
                </v-avatar>
                {{ item.name }}
                <v-icon color="success" right>check_circle</v-icon>
              </v-chip>
              <MenuInvitedMembers
                :members="filterListMember"
                :isShow="isShowCreatePeople"
                @searchText="searchText"
                @toggleSelectMember="toggleSelectMember"
              />
            </div>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="dialog = false">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import MenuInvitedMembers from "../menus/MenuInvitedMembers";
export default {
  components: {
    MenuInvitedMembers
  },
  data() {
    return {
      dialog: false,
      isShowCreatePeople: false,
      searchQuery: "",
      emailAddress: "",
      readOnly: true,
      emailRules: [
        v => !!v || "Email address is required",
        v => /.+@.+/.test(v) || "Email address is invalid "
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/project", ["dataProjectMembers", "detailInvitedMember"]),
    numberMember() {
      return this.detailInvitedMember.length;
    },
    members() {
      const arr = (this.detailInvitedMember || []).reduce((result, current) => {
        result[current.id] = { ...current };
        return result;
      }, {});
      const result = this.dataProjectMembers.map(x => {
        if (arr[x.id]) {
          return { ...x, isActive: true };
        }
        return { ...x, isActive: false };
      });
      return result;
    },
    filterListMember() {
      if (this.searchQuery) {
        return this.members.filter(item => {
          return item.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.members;
      }
    }
  },
  mounted() {
    this.getProjectMembers();
    this.getDetailInvitedMemberRequest();
  },
  methods: {
    ...mapActions("ht_store/project", [
      "inviteMemberToProjectRequest",
      "getProjectMembers",
      "getDetailInvitedMemberRequest"
    ]),
    ...mapMutations("ht_store/project", [
      "inviteMemberToProjectSuccess",
      "selectMember",
      "invitedMember"
    ]),
    toggleSelectMember(data) {
      if (data.isActive === false) {
        this.invitedMember(data);
      } else {
        this.selectMember(data);
      }
    },
    searchText(text) {
      this.searchQuery = text;
    },
    intivedEmailAddress() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          email: this.emailAddress,
          name: this.emailAddress.substring(
            0,
            this.emailAddress.lastIndexOf("@")
          ),
          nickName: this.emailAddress.substring(
            0,
            this.emailAddress.lastIndexOf("@")
          ),
          imageUrl:
            "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        };
        this.inviteMemberToProjectRequest(data);
        this.$refs.form.reset();
      }
    },
    closeModal() {
      this.dialog = false;
      this.$refs.form.reset();
    }
  }
};
</script>
