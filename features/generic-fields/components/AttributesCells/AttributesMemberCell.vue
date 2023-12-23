<template>
  <div>
    <ChooseItems v-model="value" multiple>
      <template v-slot:content="props">
        <div class="d-flex">
          <div>
            <div class="fa-user-plus1" v-on="props.on">
              <v-icon small>
                mdi-account-multiple-plus
              </v-icon>
            </div>
          </div>
          <div class="flex-grow-1 text-left">
            <div class="ml-2 d-flex flex-wrap" style="width: 200px;">
              <template v-for="(item, index) in value">
                <div :key="index"><AvatarItem :title="item.name" /> &nbsp;</div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </ChooseItems>
  </div>
</template>

<script>
import ChooseItems from '../../../../components/utils/ChooseItems'
import AvatarItem from '../../../../components/utils/AvatarItem'

export default {
  name: 'AttributesMemberCell',
  components: { AvatarItem, ChooseItems },
  data() {
    return {
      value: [],
      multiple: true
    }
  }
}
</script>

<style scoped lang="scss">
.fa-user-plus1 {
  border-radius: 50%;
  transition: all 0.25s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: dashed 1px #c1c2c3;
  color: #dcdcdc;
  width: 25px;
  height: 25px;

  &:hover,
  &.active {
    * {
    }
  }
}
</style>
