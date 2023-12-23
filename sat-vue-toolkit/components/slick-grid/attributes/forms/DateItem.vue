<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dateModel"
      transition="scale-transition"
      offset-y
      min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
          v-model="dateModel"
          :label="label"
          readonly
          v-bind="vBind || {}"
          :error-messages="errorMessages"
          append-icon="mdi-calendar"
          v-on="on">
        <template v-slot:label>
          <template v-if="required">
            {{label}} <strong class="error--text">*</strong>
          </template>
          <template v-else>
            {{label}}
          </template>
        </template>
      </v-text-field>
    </template>
    <v-date-picker v-model="dateModel" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(dateModel)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
    export default {
        name: "DateItem",
        props: {
            label: {
                type: [String],
                default: () => 'Date & Time'
            },
            placeholder: {
                type: [String],
                default: () => 'Date & Time'
            },

            value: {

            },
            required: {

            },
            errorMessages: {

            },
            vBind: {}
        },
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            menu: false,
        }),
        computed: {
          dateModel: {
            get() {
              return this.date
            },
            set(v) {
              this.date = v
              this.$emit('input', v)
            }
          }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    this.date = v
                }
            },

        }
    }
</script>

<style scoped>

</style>
