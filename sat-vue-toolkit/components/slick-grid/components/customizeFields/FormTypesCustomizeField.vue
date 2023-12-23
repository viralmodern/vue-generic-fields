<template>
  <div>
    <template v-if="isModeDropDown">
      <v-list dense
              max-height="45vh">
        <template v-for="fieldType in fieldTypes">
          <v-list-item dense
                       @click="chooseFieldType($event, fieldType)">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left
                        small>
                  {{ fieldType.ICON }}
                </v-icon>
                {{ fieldType.LABEL }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </template>
    <template v-else>
      <v-scroll-x-transition tag="div"
                             class="d-flex flex-wrap mx-n2"
                             group
                             hide-on-leave
      >
        <template v-for="(fieldType, index) in fieldTypes">
          <div class="pa-1"
               style="width: 33.333%"
               :key="fieldType.TYPE">
            <v-chip color="#f5f5fa"
                    :title="fieldType.LABEL"
                    @click="chooseFieldType($event, fieldType)">
              <v-icon left
                      small>
                {{ fieldType.ICON }}
              </v-icon>
              {{ fieldType.LABEL }}
            </v-chip>
          </div>
          <!--<div style="width: 33.333%" class="pa-1" :key="fieldType.TYPE">
            <v-hover v-slot:default="{hover}">
              <v-card flat class="fill-height"
                      rounded
                      @click="chooseFieldType($event, fieldType)"
                      outlined hover
                      :color="hover ? `primary` : ``"
                      :dark="checkActiveType(fieldType, hover)">
                <v-card-subtitle class="d-flex align-center">
                  <span class="font-weight-black">
                    {{fieldType.LABEL}}
                  </span>
                  <v-spacer/>
                  <v-icon small>
                    {{fieldType.ICON}}
                  </v-icon>
                </v-card-subtitle>
                &lt;!&ndash;<v-card-text>
                  <p class="ma-0 caption">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>

                </v-card-text>&ndash;&gt;
              </v-card>
            </v-hover>
          </div>-->
        </template>
      </v-scroll-x-transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "FormTypesCustomizeField",
  props: {
    fieldTypes: {
      type: [Array, Object],
      default: () => []
    },
    fieldTypesSelected: {
      type: [Array, Object],
      default: () => []
    },

    value: {},
    isModeDropDown: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    chooseFieldType(evt, fieldType) {
      this.$emit("chooseFieldType", {evt, fieldType})
      this.$emit("processField", {data: fieldType, k: "field_type"})
    },
    checkActiveType(fieldType, hover = false) {
      let {value} = this
      let isSelectedType = fieldType["TYPE"] === value
      return hover || isSelectedType
    }
  },
  filters: {}
}
</script>

<style scoped>

</style>
