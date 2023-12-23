<template>
  <v-data-table
    :headers="users"
    :items="dataSignature"
    :server-items-length="100"
    hide-default-footer
    hide-default-header
    class="elevation-1 filterable-table"
  >
    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.name">
            <v-row class="py-2 d-flex justify-center align-center" no-gutters v-if="header.name">
              <UserAvatar
                :imageUrl="(header.avatar || {}).imageUrl"
                :avatarSize="35"
                :name="header.name || ''"
              />
              <v-col cols="12" class="pa-0 d-flex justify-center align-center">
                <span class="pt-1 caption">{{ header.name }}</span>
              </v-col>
            </v-row>
          </th>
        </tr>
      </thead>
    </template>

    <template v-slot:body="{ items, headers }">
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td class="align-center" v-for="(item1, index) in users" :key="item1.id">
            <v-col v-if="!index" cols="12" class="text-xs-left" style="width:240px">{{ item.name }}</v-col>
            <div v-else class="d-flex justify-center">
              <SelectInline
                :item="signatureStatus(item.listSignature, index)"
                :items="list"
                keyText="name"
                keyColor="color"
                @select="
                select({ item, userId: item1.id, signed: $event.id })
              "
              />
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import UserAvatar from "../../../avatars/UserAvatar";
import SelectInline from "../../../menus/SelectInline";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    UserAvatar,
    SelectInline
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "Signed",
          color: "success"
        },
        {
          id: 2,
          name: "Not Signed",
          color: "secondary"
        },
        {
          id: 3,
          name: "N/A",
          color: "default"
        }
      ]
    };
  },
  computed: {
    users() {
      return [
        { id: 0, sortable: false },
        ...this.members.map(x => ({ ...x, sortable: false }))
      ];
    },
    ...mapGetters("ht_store/matter/partient/profile/detail/agreementDetail/signature", [
      "dataSignature"
    ]),
    ...mapGetters("ht_store/workspace/member", ["members"])
  },
  methods: {
    signatureStatus(list, index) {
      const findUser = list.find(e => e.userId === this.users[index].id);
      const signature = findUser && findUser.signed;
      return (
        (this.list || []).find(x => x.id === signature) || {
          id: 3,
          name: "N/A",
          color: "default"
        }
      );
    },
    select({ item, userId, signed }) {
      const clone = JSON.parse(JSON.stringify(item.listSignature));
      const find = clone.find(x => x.userId === userId) || {};
      if (find.signed !== signed) {
        find.signed = signed;
        this.updateSignatureRequest({ id: item.id, listSignature: clone });
      }
    },
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/matter/partient/profile/detail/agreementDetail/signature", [
      "getDataSignatureRequest",
      "updateSignatureRequest"
    ])
  },
  mounted() {
    this.getDataSignatureRequest();
    this.getDataMemberRequest();
  }
};
</script>
