<template>
  <div class="item-create-new">
    <div class="item-create-new--container" :class="{active: addNew}">
      <v-btn small
          :title="`Add new ${title}`"
          style="text-transform: unset; font-size: 12px;"
          text
          class="mt-0"
          color="primary"
          @click="clickMe"
          v-if="!addNew"
      >
        <v-icon small>mdi-plus</v-icon>
        New {{ title }}
      </v-btn>
      <v-card v-else flat>
        <v-card-text class="d-flex align-center py-0 px-2">
          <div class="add-new-left-container">
            <v-text-field
                v-model="message"
                :title="`${title} name`"
                solo
                dense
                :label="`${title} name`"
                type="text"
                autofocus
                :loading="pending"
                :error="error"
                style="border-radius: 0px; overflow: hidden;"
                hide-details
                @keyup.enter="addRow">
              <template v-slot:prepend-inner>
                <v-icon small @click="addNew = false">mdi-close</v-icon>
              </template>
            </v-text-field>
          </div>
          <div class="flex-grow-1"></div>
          <div class="add-new-right-container d-flex align-center" style="position: sticky; right: 10px;">
            <slot name="append-inner"></slot>
            <slot name="append-save">
              <v-btn :disabled="!message" small
                     @click="addRow"
                     depressed
                     class="text-capitalize ml-2"
                     color="primary"
              >
                {{ saveText }}
              </v-btn>
            </slot>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'CreateNewRowGrid',
        data: () => ({
            message: '',
            addNew: false,
            // addNew: true,
            error: false,

            data_crt: {},
            est_time: null,
            date_filled: null,
            members: [],
            pending: false
        }),
        props: {
            title: {
                type: String,
                default: () => 'Label'
            },
            saveText: {
                type: String,
                default: () => 'Save'
            },
            value: {}
        },
        methods: {
            clickMe() {
                try {
                    this.addNew = true
                    this.$emit('click')
                } catch (e) {
                }
            },
            async addRow() {
                let isValid = !!this.message
                this.error = !isValid
                if (!isValid) {
                    return
                }
                try {
                    this.$emit('addRow', {name: this.message})
                    this.message = ''
                } catch (e) {
                    this.error = true
                }
                return false
            }
        },
        computed: {},
        watch: {},
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
  .btn_input {
    border: dashed 1px #c1c2c3;
  }

  .item-create-new {
    padding-left: 34px;
    display: block;
    min-width: 100%;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 1;

    .item-create-new--container {
      border: solid 1px transparent;

      &.active {
        border-color: #7957d5;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.15);
      }
    }
    .add-new-left-container {
      position: sticky;
      left: 0;
    }
  }
</style>
