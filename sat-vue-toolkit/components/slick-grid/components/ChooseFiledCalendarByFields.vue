<template>
  <v-menu :return-value.sync="type" ref="menu" bottom offset-y
          :disabled="disabledChoose">
    <template v-slot:activator="{on}">
      <v-btn class="caption text-capitalize"
             :disabled="disabledChoose"
             rounded text
             :input-value="true"
             color="primary"
             small v-on="on">
        {{label}} {{type | getLabelAttribute}}
        <v-icon right small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list dense v-model="type">
      <template v-for="attribute in attributes">
        <v-list-item @click="$refs.menu.save(attribute)"
                     active-class="primary--text"
                     dense
                     :input-value="attribute === type"
                     :value="attribute">
          <v-list-item-content>
            <v-list-item-title>
              {{attribute.label}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: "ChooseFiledCalendarByFields",
    props: {
      attributes: {
        type: Array,
        default: () => []
      },
      value: {},
      label: {
        type: String,
        default: () => 'Filed By'
      }
    },
    computed: {
      disabledChoose() {
        let {attributes} = this
        return attributes.length <= 0
      },
      type: {
        get() {
          let {disabledChoose, value, attributes} = this
          if(!disabledChoose && !Boolean(value)) {
            this.$emit('input', attributes[0])
          }
          return value
        },
        set(v) {
          this.$emit('input', v)
        }
      }
    },
    filters: {
      getLabelAttribute(attribute) {
        try {
          return `: ${attribute['label']}`
        }catch (e) {
          return ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
