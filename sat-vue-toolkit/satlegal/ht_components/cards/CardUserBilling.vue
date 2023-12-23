<template>
  <v-card>
    <v-row no-gutters class="card-height">
      <v-col cols="12">
        <v-row no-gutters="">
          <v-col cols="2" class="div-image-user" justify="center" align="center">
            <UserAvatar
              :avatarSize="90"
              :imageUrl="dataUser.imageUrl"
              :name="dataUser.name"
            />
          </v-col>
          <v-col cols="8" class="card-height">
            <v-card-title primary-title>
              <div>
                <div class="text-h5">{{ dataUser.name }}</div>
                <label class="btn-default">
                  Change avatar
                  <input
                    type="file"
                    @change="updateImage"
                    hidden
                    class="hidden"
                  />
                </label>
              </div>
            </v-card-title>
          </v-col>
          <v-col cols="2" class="card-height div-display">
            <v-btn rounded>
              <v-icon class="mr-2">mdi-monetization_on</v-icon>
              <span class="text-capitalize">Upgrade to Pro</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
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
      urlAvatar: null
    };
  },
  methods: {
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
      this.$emit("changeAvatar", this.urlAvatar);
    }
  }
};
</script>
<style scoped>
.card-height {
  height: 125px;
}
.div-image-user {
  display: flex;
}
.hidden {
  display: none !important;
}
.btn-default {
  cursor: pointer;
}
.div-display {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
