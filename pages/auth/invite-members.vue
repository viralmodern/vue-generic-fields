<template>
  <v-container fluid>
    <v-card width="100%" max-width="480px" class="mx-auto">
      <v-card-text>
        <v-form
          lazy-validation
          class="form_auth"
          ref="form"
          @submit.prevent="submit"
        >
          <h4 class="mb-4 text-primary text-h5 font-weight-bold">
            Invite members
          </h4>
          <v-layout
            v-for="(_, index) in emails"
            :key="index"
            class="align-center"
          >
            <v-text-field
              v-model.trim="emails[index]"
              autofocus
              label="Email"
              placeholder="name@example.com"
              required
              type="email"
              solo
              outlined
              :append-icon="emails.length > 1 ? 'mdi-account-remove' : ''"
              :rules="emailRules"
              @click:append="remove(index)"
            />
          </v-layout>
          <div>
            <v-btn
              :disabled="submitting"
              text
              small
              color="secondary"
              @click.stop="add"
              class="text-capitalize caption text--primary"
            >
              <v-icon left>mdi-plus</v-icon>
              Add another invitation
            </v-btn>
            <div class="d-flex">
              <div class="flex-grow-1"></div>
              <v-btn
                class="text-capitalize caption"
                type="submit"
                small
                color="primary"
                :loading="submitting"
              >
                Send Invitations
                <v-icon right>mdi-send</v-icon>
              </v-btn>
            </div>
            <router-link :to="defaultPage" class="text-decoration-none">
              Maybe later
              <v-icon small color="primary">mdi-chevron-double-right</v-icon>
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getSubdomain } from '@/sat-vue-toolkit/satlegal/utils'
import urlMixin from '@/mixins/mx_url'
import emailRulesMixin from '@/mixins/mx_emailRules'

export default {
  name: 'InviteMembers',
  mixins: [urlMixin, emailRulesMixin],
  layout: 'default',
  head() {
    return {
      title: 'Invite Members',
    }
  },
  data() {
    return {
      overlay: true,
      emails: [''],
      submitting: false,
    }
  },
  methods: {
    submit() {
      const workspace = getSubdomain(location.hostname)
      const emails = this.emails.filter((email) => email)
      const urlTemplate = 'auth/invitation/join/{key}'
      if (!emails) {
        return false
      }
      this.submitting = true
      this.$axios
        .post('/api/users/auth/invitations/send', {
          workspace,
          emails,
          url_template: urlTemplate,
        })
        .then(() => {
          this.$router.push({ path: this.defaultPage })
        })
        .catch(() => {
          this.submitting = false
        })
        .finally(() => {
          this.submitting = false
        })
    },
    add() {
      this.emails.push('')
      this.$nextTick(() => {
        const inputs = document.querySelectorAll("input[type='email']")
        const newAdded = inputs[inputs.length - 1]
        if (newAdded) {
          newAdded.focus()
        }
      })
    },
    remove(index) {
      this.emails.splice(index, 1)
    },
  },
}
</script>
