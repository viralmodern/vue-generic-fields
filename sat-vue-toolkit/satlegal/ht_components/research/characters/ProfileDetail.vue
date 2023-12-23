<template>
  <v-card>
    <v-row no-gutters class="card-height">
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="2" class="mt-4 ml-3 justify-center align-center">
            <label class="btn-default">
              <UserAvatar
                class="avatar-custom"
                :imageUrl="dataProfile.avatar || null"
                :name="dataProfile.name || ''"
              />
              <input type="file" @change="updateImage" hidden class="hidden" />
            </label>
          </v-col>
          <v-col cols="10" class="card-height">
            <v-card-title primary-title>
              <div style="width: 100%">
                <v-row no-gutters class="justify-space-between">
                  <div class="text-h5">{{ dataProfile.name }}</div>
                  <v-chip color="red" text-color="white">
                    <v-icon left>star</v-icon>
                    {{ dataProfile.keyChip }}
                  </v-chip>
                </v-row>

                <div>
                  <v-row no-gutters>
                    <v-chip color="primary" text-color="white">{{
                      dataProfile.counsel
                    }}</v-chip>
                    <v-chip color="red" text-color="white">{{
                      dataProfile.level
                    }}</v-chip>
                  </v-row>
                </div>

                <div>
                  <v-row no-gutters>
                    <div>
                      <v-icon small color="primary">mail</v-icon>
                      <span class="ml-1 text-body-1">{{ dataProfile.email }}</span>
                    </div>
                    <div>
                      <v-icon small color="primary" class="ml-3">phone</v-icon>
                      <span class="ml-1 text-body-1">{{ dataProfile.phone }}</span>
                    </div>
                    <div>
                      <v-icon small color="primary" class="ml-3"
                        >location_on</v-icon
                      >
                      <span class="ml-1 text-body-1">{{
                        dataProfile.location
                      }}</span>
                    </div>
                  </v-row>
                </div>

                <div class="mt-3">
                  <div class="title primary--text">
                    {{ dataProfile.nameDescription }}
                  </div>
                  <div>
                    <v-textarea
                      hide-details
                      name="input-7-1"
                      :value="dataProfile.description"
                      class="ma-0 pa-0 custom-text-field input-size"
                      @input="changeDescription"
                      rows="5"
                    ></v-textarea>
                  </div>
                </div>
              </div>
            </v-card-title>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "../../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    dataUser: Object
  },
  data() {
    return {
      imageData: "",
      urlAvatar: null,
      description: ""
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", [
      "updateAvatar",
      "changeDescription"
    ]),
    updateImage() {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.urlAvatar = (window.URL || window.webkitURL).createObjectURL(
        input.files[0]
      );
      this.updateAvatar(this.urlAvatar);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile", ["dataProfile"])
  }
};
</script>
<style scoped>
.card-height {
  height: auto;
}
.hidden {
  display: none !important;
}
.btn-default {
  cursor: pointer;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  font-size: 13px;
}
.avatar-custom {
  margin: auto;
  width: -webkit-fill-available;
  max-width: 150px;
}
</style>
