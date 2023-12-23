<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dateModel"
      offset-y
      min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
          v-model="dateModel"
          :label="label"
          readonly
          :error-messages="errorMessages"
          v-bind="vBind || {}"
          v-on="on">
        <template v-slot:label>
          <template v-if="required">
            {{label}} <strong class="error--text">*</strong>
          </template>
          <template v-else>
            {{label}}
          </template>
        </template>
        <template v-slot:append>
          <v-icon :color="`${dateModel}`" small>
            mdi-checkbox-blank-circle
          </v-icon>
        </template>
      </v-text-field>
    </template>
    <v-card max-width="300px">
      <v-card-text>
        <template v-for="color in items">
          <v-btn icon @click="$refs.menu.save(date = color)"
                 :input-value="date === color">
            <v-icon :color="`${color}`">
              mdi-checkbox-blank-circle
            </v-icon>
          </v-btn>
        </template>
      </v-card-text>
    </v-card>
    <!--<v-date-picker v-model="dateModel" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(dateModel)">OK</v-btn>
    </v-date-picker>-->
  </v-menu>
</template>

<script>
  import { COLORS } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
    export default {
        name: "ColorsItem",
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
            date: '',
            menu: false,
            items: COLORS
        }),
        computed: {
          dateModel: {
            get() {
              return this.date
            },
            set(v) {
              this.date = v
              this.$emit('input', v.replace('#',''))
            }
          }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if(v) {
                      this.date = `#${v}`
                    }
                }
            },
            dateModel: {
              immediate: true,
              handler(v) {
                if(v) {
                  this.$emit('input', v.replace('#',''))
                }
              }
            }

        }
    }
</script>

<style scoped>

</style>
