<template>
  <div>
    <v-alert v-show="hasErrorMessage" type="error" border="left" outlined dense>
      {{ errorMessage }}
    </v-alert>
    <div>
      <div class="title mb-4">Sign in to your workspace</div>
      <div class="text-caption mb-2">
        Enter your workspace's {{ $$productName }} URL.
      </div>
      <div>
        <v-form @submit.prevent="checkingWorkspace">
          <v-text-field
            v-model="workspaceName"
            maxlength="21"
            placeholder="your-workspace-name"
            class="custom_field"
            outlined
            autofocus
            dense
          >
            <template v-slot:append-outer>
              <span class="title">.{{ domain }}</span>
            </template>
          </v-text-field>

          <v-btn
            block
            color="primary"
            :disabled="!validWorkspaceName || submitting"
            :loading="submitting"
            type="submit"
          >
            Continue
          </v-btn>
          <v-card-actions class="px-0">
            Need to get your firm started on {{ $$productName }}?&nbsp;
            <router-link class="subheading link_bt" :to="linkCreateWorkspace">
              Create a new workspace
            </router-link>
          </v-card-actions>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import slugify from 'slugify'
import { getSubdomainURL, getAppDomain } from '@/sat-vue-toolkit/satlegal/utils'

export default {
  name: 'CheckWorkspace',
  layout: 'default',
  data() {
    return {
      workspaceName: '',
      domain: getAppDomain(),
      isValidSubDomain: false,
      submitting: false,
      errorMessage: '',
    }
  },
  computed: {
    validWorkspaceName() {
      return this.workspaceName.length > 0 && this.workspaceName.length <= 21
    },
    hasErrorMessage() {
      return this.errorMessage.length > 0
    },
    linkCreateWorkspace() {
      const { query } = this.$route
      return { path: '/auth/create-workspace', query }
    },
  },
  watch: {
    workspaceName(val) {
      this.workspaceName = slugify(val).trim()
    },
  },
  methods: {
    checkingWorkspace() {
      const slugedWorkspaceName = slugify(this.workspaceName)
      this.submitting = true
      this.$axios
        .get(`/api/workspaces/${slugedWorkspaceName}/check/`)
        .then((response) => {
          let searchLocation = window.location.search
          let href = `${getSubdomainURL(
            slugedWorkspaceName
          )}/auth/login${searchLocation}`
          console.error('HREF', href, this.$route)
          window.location.href = href
        })
        .catch((error) => {
          this.errorMessage = 'Sorry, We could not find your workspace.'
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>

<style scoped>
.right-text >>> input {
  text-align: right;
}

.custom_field /deep/ .v-text-field__slot {
  text-align: right;
}

.v-text-field >>> input {
  font-size: 1.2em;
}
</style>
