<template >
  <div>
    <AnnouncementBlock
      :user="announcement.user"
      :content="announcement.content"
      :createdDate="announcement.createdDate"
      v-for="announcement in announcements"
      :key="announcement.id"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AnnouncementBlock from "../cards/AnnoucementBlock";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    AnnouncementBlock
  },
  computed: {
    ...mapGetters("ht_store/announcement", ["announcements", "totals"])
  }
};
</script>
