<template>
  <div class="content_item_thumb">
    <attributes-list>
      <div>
        <!--        <div v-if="!isEditing" @click.prevent="startEditing">-->
        <div v-if="!isEditing" @click.prevent="startEditing">
          <v-divider></v-divider>
          <v-card flat>
            <v-btn v-if="isNewItem" color="primary" block depressed text>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-card-text v-else>
              <p class="ma-0 subheading" style="color: #000;">
                {{ displayText }}
              </p>
            </v-card-text>
          </v-card>
        </div>
        <v-card v-else flat>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="save">
              <v-text-field
                outlined
                dense
                hide-details
                class="pa-0 ma-0"
                autofocus
                v-model.trim="form.text"
                validate-on-blur
                @blur.prevent="cancel"
              ></v-text-field>
              <div
                v-if="showAction"
                :class="[
                  isNewItem ? 'text-center' : 'd-flex justify-content-between',
                ]"
              >
                <div class="mt-2 text-left">
                  <button
                    class="btn_ct"
                    style="background: #24b314;"
                    @click.prevent="save"
                  >
                    Save
                  </button>
                  &nbsp;
                  <button
                    class="btn_ct"
                    style="background: #757575;"
                    @click.prevent="cancel"
                  >
                    Cancel
                  </button>
                  &nbsp;
                  <button
                    v-show="!isNewItem"
                    class="btn_ct"
                    @click.prevent="remove"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card
          v-if="!isNewItem"
          flat
          @click="$eventHub.$emit('task-detail-dialog', item)"
        >
          <v-card-text class="pt-0">
            <div>
              <template v-for="attribute in systemAttributes">
                <div :key="`item_card_${attribute.pk}`">
                  <v-chip small light color="transparent">
                    <v-icon small left>
                      {{ $$attrByProp({ type: attribute.type, prop: 'icon' }) }}
                    </v-icon>
                    {{ attribute.name }}
                  </v-chip>
                </div>
              </template>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </attributes-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AttributesMemberCell from '../../../generic-fields/components/AttributesCells/AttributesMemberCell'
import AttributesDateTimeCell from '../../../generic-fields/components/AttributesCells/AttributesDateTimeCell'
import AttributesList from '../../../../components/utils/AttributesList'
import { $$attrByProp } from '@/sat-vue-toolkit/functions'

export default {
  name: 'TaskListItem',
  components: { AttributesList, AttributesDateTimeCell, AttributesMemberCell },
  props: ['item', 'list', 'board', 'systemAttributes'],
  computed: {
    isNewItem() {
      return this.item.pk == ''
    },
    displayText() {
      return this.isNewItem ? '+ New Item' : this.item.text
    },
  },
  data() {
    return {
      isEditing: false,
      form: {
        id: '',
        pk: '',
        text: '',
      },
      showAction: false,
    }
  },
  methods: {
    ...mapActions('da_taskboard', {
      saveTaskListItem: 'saveTaskListItem',
      deleteTaskListItem: 'deleteTaskListItem',
    }),
    $$attrByProp,
    startEditing() {
      this.form.pk = this.item.pk
      this.form.text = this.item.text
      this.isEditing = true
      this.$emit('item-editing')
    },

    clearForm() {
      this.form.pk = ''
      this.form.text = ''
    },
    save() {
      const updatedItem = {
        id: this.form.pk,
        pk: this.form.pk,
        text: this.form.text,
        name: this.form.text,
      }
      this.saveTaskListItem({
        boardId: this.board.pk,
        listId: this.list.pk,
        matterID: this.$route.params.matter || this.$route.params.projectId,
        item: updatedItem,
      })
      this.form.text = ''
      // this.isEditing = false
      this.$emit('item-edited')
      return false
    },
    cancel() {
      this.isEditing = false
      this.$emit('item-cancelled')
    },
    remove() {
      this.deleteTaskListItem({
        boardId: this.board.pk,
        listId: this.list.pk,
        item: this.item,
      })
      this.$emit('item-deleted')
    },
  },
}
</script>

<style lang="scss">
.tasklist-item {
}

.btn_ct {
  display: inline-block;
  background: #ff3d00;
  padding: 3px 5px;
  color: #ffffff;
  font-size: 12px;
  outline: none;
  border-radius: 2px;
}

.content_item_thumb {
  /*border: solid 1px red;*/
}
</style>
