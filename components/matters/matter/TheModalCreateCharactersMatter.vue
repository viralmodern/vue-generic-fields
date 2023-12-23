<template>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <v-card :loading="submitting">
      <v-card-title>Create Character</v-card-title>
      <v-card-text style="height: 400px;">
        <v-form @submit.prevent="submit" ref="form_characters">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="first_name"
                label="First name *"
                :error="!!errors['first_name']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="last_name"
                label="Last name *"
                required
                :error="!!errors['last_name']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="model_email"
                :items="items_email"
                :search-input.sync="search_email"
                hide-selected
                hint="ex: mrgt@mail.com, matter@mail.com,..."
                label="Emails"
                multiple
                persistent-hint
                small-chips
                :error="!!errors['emails']"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <template v-if="search_email"
                          >"<strong>{{ search_email }}</strong
                          >".</template
                        >
                        Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="model_phone"
                :items="items_phone"
                :search-input.sync="search_phone"
                hide-selected
                hint="Add phone"
                label="Phone"
                multiple
                persistent-hint
                small-chips
                :error="!!errors['phone']"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <template v-if="search_phone"
                          >"<strong>{{ search_phone }}</strong
                          >".</template
                        >
                        Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                background-color="white"
                clearable
                v-model="matter"
                :items="matters"
                return-object
                dense
                color="blue-grey lighten-2"
                label="Matters"
                item-text="name"
                :error="!!errors['matter']"
                item-value="matterID"
              >
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.start_date"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <!--<v-switch v-model="data.item.activate" :ripple="false" readonly></v-switch>-->
                    <span class="badge badge-success">{{
                      data.item.activate ? 'active' : ''
                    }}</span>
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                background-color="white"
                clearable
                v-model="type"
                :items="types"
                return-object
                dense
                multiple
                chips
                color="blue-grey lighten-2"
                label="Character Types"
                item-text="label"
                item-value="value"
                :error="!!errors['character_types']"
              >
                <template v-slot:item="data">
                  <v-list-item-avatar
                    :color="data.item.color"
                    class="white--text"
                  >
                    <v-icon dark small>{{ data.item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.label"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.label"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" :disabled="!valid" rounded @click="submit"
          >Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheModalCreateCharactersMatter',
  data() {
    return {
      type: null,
      matter: null,
      dialog: false,

      model_email: [],
      model_phone: [],

      search_email: '',
      search_phone: '',

      first_name: '',
      last_name: '',

      items_phone: [],
      items_email: [],

      submitting: false,

      errors: {}
    }
  },
  mounted() {
    let _self = this

    this.$eventHub.$on('modal-character', ({ title, matter }) => {
      _self.title = title
      _self.dialog = !_self.dialog
      if (matter) {
        _self.matter = matter
      }
    })
  },
  computed: {
    types() {
      return this.$store.getters['characters/characterTypes']
    },
    matters() {
      return this.$store.getters['matters/list']
    },
    valid() {
      // return !!1
      console.log(
        this.first_name &&
          this.last_name &&
          this.matter &&
          this.type &&
          this.model_phone.length > 0 &&
          this.model_email.length > 0
      )
      return (
        !!this.first_name &&
        !!this.last_name &&
        !!this.matter &&
        !!this.type &&
        this.model_phone.length > 0 &&
        this.model_email.length > 0
      )
    },
    matterID() {
      try {
        return this.matter.matterID
      } catch (e) {
        return null
      }
    },
    character_types() {
      try {
        return this.type.map((i) => i.value)
      } catch (e) {
        return []
      }
    }
  },
  methods: {
    async submit() {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.model_phone,
        emails: this.model_email,
        character_types: this.character_types
      }
      this.submitting = true
      this.errors = {}
      try {
        let xo = await this.$store.dispatch('characters/createCharacter', {
          data,
          matterID: this.matterID
        })
        this.$refs.form_characters.reset()
      } catch (e) {
        console.log('xo', e.response.data)
        if (e.response.data) {
          this.errors = e.response.data
        }
      }

      this.submitting = false
    }
  }
}
</script>

<style scoped></style>
