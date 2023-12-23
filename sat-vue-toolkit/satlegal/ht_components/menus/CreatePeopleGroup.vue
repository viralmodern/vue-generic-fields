<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Name people group "
                  v-model="groupName"
                  :rules="[v => !!v || 'Name people group required']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-autocomplete
                :items="members"
                v-model="dataMember"
                box
                chips
                label="Invite members"
                item-text="name"
                item-value="id"
                multiple
                :rules="[v => !!v.length || 'Member project required']"
                return-object
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
                    {{ data.item.avatar.name }}
                  </v-chip>
                </template>
                <template slot="item" slot-scope="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar.imageUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.avatar.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.group"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-row>
          </v-form>
        </v-col>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    members: Array
  },
  data() {
    return {
      dataMember: [],
      isShow: "",
      groupName: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.isShow = false;
        this.$emit("addGroup", {
          members: this.dataMember.map(e => e.id),
          groupName: this.groupName,
          objectMember: this.dataMember
        });
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    },
    remove(item) {
      let index = this.dataMember.findIndex(v => v.id === item.id);
      if (index >= 0) this.dataMember.splice(index, 1);
    }
  }
};
</script>
