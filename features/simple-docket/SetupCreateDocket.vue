<template>
  <v-dialog
    persistent
    v-model="uiShowDialog"
    max-width="45vw"
    width="100%"
    overlay-opacity="0.3"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small text class="text-body-2 text-transform-unset">
        Setup create new docket
      </v-btn>
    </template>
    <template v-if="$$loadingDocket">
      <v-card color="primary" dark class="mx-auto">
        <v-card-text class="py-4">
          <p>
            Please wait setting Docket
          </p>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <v-card flat :loading="submitting">
        <v-card-title>
          Setup Docket
          <v-spacer />
        </v-card-title>
        <v-card-text>
          Enter two required fields <code>Docket number</code> and
          <code>Court District</code> to enable all docket CAFs.
        </v-card-text>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="createDocket">
            <v-text-field
              persistent-hint
              label="Docket Number"
              v-model.trim="docket_number"
              :rules="textRules"
              outlined
              dense
              required
              clearable
              autofocus
            />
            <v-autocomplete
              :items="courts"
              v-model="jurisdiction"
              label="Court District"
              required
              :rules="textRules"
              dense
              item-value="id"
              item-text="full_name"
              outlined
            ></v-autocomplete>
            <div class="d-flex">
              <v-btn
                :to="$$path"
                depressed
                class="text-transform-unset text-subtitle-2"
              >
                <v-icon left>mdi-chevron-double-left</v-icon> Back
              </v-btn>
              <v-spacer />
              <v-btn
                class="text-transform-unset text-subtitle-1"
                type="submit"
                :disabled="!valid || submitting"
                color="primary"
                :loading="submitting"
              >
                Save
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import mx_docket from '../../mixins/mx_docket'
import mx_emailRules from '~/mixins/mx_emailRules'
import mx_matterId from '~/mixins/mx_matterId'
import { Matter } from '~/models/matter'

export default {
  name: 'SetupCreateDocket',
  data() {
    return {
      valid: true,
      uiShowDialog: true,
      courts: [],
      errors: {},
      jurisdiction: null,
      docket_number: null,
      submitting: false,
    }
  },
  async mounted() {
    let resCourts = await this.$api.get('/api/courts/')
    this.courts = resCourts['data']
  },
  computed: {
    $$path() {
      return `/matters/${this.$$matterId}`
    },
  },
  mixins: [mx_docket, mx_emailRules, mx_matterId],
  methods: {
    click() {
      this.uiShowDialog = false
      this.$emit('click')
    },
    async createDocket() {
      let jurisdiction = this.jurisdiction,
        docket_number = this.docket_number
      let data = { jurisdiction, docket_number }
      try {
        this.submitting = true
        let res = await this.$api.patch(
          `/api/matters/${this.$$matterId}/`,
          data
        )
        let matter = new Matter(res['data'])
        this.$store.commit('matters/resetDetail', matter)
      } catch (e) {
        console.log(e.response)
      } finally {
        this.submitting = false
      }
    },
  },
  beforeDestroy() {
    this.submitting = false
    this.jurisdiction = null
    this.docket_number = null
  },
}
</script>

<style scoped></style>
