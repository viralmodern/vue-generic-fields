<template>
  <v-list>
    <v-row no-gutters class="my-2">
      <v-btn class="primary">Send All Signature Packets</v-btn>
      <v-btn class="primary" @click="$emit('openModelUploadManyManual')"
        >Upload Manual Signatures</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="secondary" @click="$emit('showRight')"
        >Released Signatures</v-btn
      >
    </v-row>
    <v-data-table
      :headers="users"
      :loading="loadingDataContract"
      :items="desserts.contracts"
      :total-items="100"
      hide-actions
      class="elevation-1 filterable-table"
    >
      <template slot="headerCell" slot-scope="props">
        <FilingRoomAvatar
          v-if="props.header.user"
          heading="caption"
          :imageUrl="props.header.avatar"
          :size="35"
          :name="props.header.user"
          :text="props.header.user"
          :role="props.header.role"
        />
      </template>
      <template slot="items" slot-scope="props">
        <td
          class="text-xs-center"
          v-for="(item, index) in users"
          :key="item.id"
        >
          <v-col
            v-if="!index"
            cols="12"
            class="text-xs-left"
            style="width:240px"
            >{{ props.item.name }}</v-col
          >
          <SignatureOptions
            v-else
            :color="signatureStatus(props.item.listSignature, index)[1]"
            :status="signatureStatus(props.item.listSignature, index)[0]"
            @upload="$emit('upload', item.id)"
            @send="$emit('send', item.id)"
          />
        </td>
      </template>
    </v-data-table>
  </v-list>
</template>

<script>
import FilingRoomAvatar from "../avatars/FilingRoomAvatar";
import SignatureOptions from "../menus/SignatureOptions";

export default {
  components: {
    FilingRoomAvatar,
    SignatureOptions
  },
  props: {
    desserts: Object,
    users: Array,
    loadingDataContract: Boolean
  },
  computed: {
    pages() {
      if (
        !this.pagination ||
        !this.pagination.rowsPerPage ||
        !this.desserts.totals
      )
        return 0;
      return Math.ceil(this.desserts.totals / this.pagination.rowsPerPage);
    }
  },
  methods: {
    signatureStatus(list, index) {
      const findUser = list.find(e => e.userId === this.users[index].id);
      const signature = findUser && findUser.signed;
      if (signature) {
        return ["Signed", "success"];
      } else if (signature === false) {
        return ["Not Signed", "secondary"];
      } else {
        return ["N/A", "default"];
      }
    }
  }
};
</script>
