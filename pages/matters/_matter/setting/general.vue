<template>
  <div class="mt-4">
    <v-card class="mb-4">
      <v-card-title class="text-capitalize">
        Archive Matter
      </v-card-title>
      <v-card-subtitle>
        Archiving the matter will make it entirely read-only. It is hidden from
        All Matters and doesn't show up in searches. The matter cannot be
        written to. Archive project can be written to when unarchive by matter
        admin.
      </v-card-subtitle>
      <v-card-subtitle>
        <v-btn @click="archive" class="text-capitalize" color="warning"
          >Archive Matter</v-btn
        >
      </v-card-subtitle>
    </v-card>
    <v-card class="mb-4">
      <v-card-title class="text-capitalize">
        Rename Matter
      </v-card-title>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-text style="max-width: 350px;">
        <label class="mb-2 d-block black--text">Matter name</label>
        <v-text-field
          dense
          background-color="rgb(245, 245, 250)"
          solo
          flat
          @keyup.enter="rename($event)"
          :value="matterInfo.name"
          label="Matter name"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-title class="text-capitalize">
        Transfer Matter
      </v-card-title>
      <v-card-text>
        <ul>
          <li>
            Be careful. Changing the project's namespace can have unintended
            side effects.
          </li>
          <li>
            You can only transfer the project to namespaces you manage.
          </li>
          <li>
            You will need to update your local repositories to point to the new
            location.
          </li>
          <li>
            Project visibility level will be changed to match namespace rules
            when transferring to a group.
          </li>
        </ul>
      </v-card-text>
      <v-card-text>
        <setting-transfer-matter></setting-transfer-matter>
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-title class="text-capitalize">
        Remove Matter
      </v-card-title>
      <v-card-subtitle>
        Removing the matter will delete its everything. It is gone, no trace,
        total goodbye from everything related, written, uploaded, commented,
        EVERYTHING!!! <br />
        Removed matters cannot be restored!
      </v-card-subtitle>
      <v-card-subtitle>
        <v-btn
          @click="
            $eventHub.$emit('confirm-matter-remove', del, matterInfo.name)
          "
          class="text-capitalize"
          color="error"
          >Remove Matter
        </v-btn>
      </v-card-subtitle>
    </v-card>
    <TheModalRemoveMatter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AutocompleteList from '../../../../components/utils/AutocompleteList'
import SettingTransferMatter from '../../../../components/matters/matter/settings/SettingTransferMatter'
import TheModalRemoveMatter from '../../../../components/matters/matter/TheModalRemoveMatter'
import matterMixin from '@/mixins/mx_matter'

export default {
  name: 'general',
  mixins: [matterMixin],
  components: { TheModalRemoveMatter, SettingTransferMatter, AutocompleteList },
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'general'
    })
  },

  computed: {
    ...mapGetters({
      matterDetail: 'matters/matterDetail'
    }),
    matterInfo() {
      try {
        return this.matterDetail
      } catch (e) {
        return {}
      }
    }
  },
  methods: {
    async del() {
      // delete matter
      try {
        await this.$store.dispatch('matters/deleteMatter', {
          matterID: this.matterInfo.matterID
        })
      } catch (e) {
        console.log('del', e.message)
      }
    },
    async archive() {
      try {
        await this.$_updateMatter({
          matterID: this.matterInfo.matterID,
          data: { archive: true }
        })
      } catch (e) {
        console.log('archive', e.message)
      }
    },
    async rename(e) {
      try {
        await this.$_updateMatter({
          matterID: this.matterInfo.matterID,
          data: { name: e.target.value }
        })
      } catch (e) {
        console.log('rename', e.message)
      }
    }
  }
}
</script>

<style scoped></style>
