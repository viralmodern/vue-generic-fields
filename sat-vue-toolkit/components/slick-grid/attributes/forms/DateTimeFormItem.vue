<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dateTime"
      transition="scale-transition"
      offset-y
      min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field v-model="dateTime"
                    :label="label"
                    readonly
                    :error-messages="errorMessages"
                    v-bind="vBind || {}"
                    v-on="on"></v-text-field>
    </template>
    <v-card>
      <div class="d-flex">
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click:minute="$refs.menu.save(`${date} ${time}`)">OK</v-btn>
        </v-date-picker>
        <v-time-picker @click:minute="$refs.menu.save(`${date} ${time}`)"
                       scrollable landscape
                       v-model="time"></v-time-picker>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
    export default {
        name: "DateTimeFormItem",
        props: {
            label: {
                type: [String],
                default: () => 'Date & Time'
            },
            value: {},
            placeholder: {},
            errorMessages: {

            },
            vBind: {}
        },
        data: () => ({
            dateTime: '',
            date: new Date().toISOString().substr(0, 10),
            time: '',
            menu: false,
        }),
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    this.date = v
                }
            },
            dateTime: {
                immediate: true,
                handler(v) {
                    this.$emit('input', v)
                }
            }
        },
        methods: {
            change() {

            }
        }
    }
</script>

<style scoped>

</style>
