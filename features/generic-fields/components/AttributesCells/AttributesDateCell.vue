<template>
  <div>
    <ChooseDate v-model="date">
      <!--<template v-slot:activator_date="props">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <div class="fa-user-plus1">
              <v-icon small v-on="props.on" color="#c1c2c3">
                mdi-calendar-plus
              </v-icon>
            </div>
          </div>
          <div class="text-no-wrap px-2 text-caption">
            {{date}}
          </div>
        </div>
      </template>-->
    </ChooseDate>
  </div>
</template>

<script>
import ChooseDate from '../../../../components/utils/ChooseDate'
export default {
  name: 'AttributesDateCell',
  components: { ChooseDate },
  data() {
    return {
      date: '',
    }
  },
}
</script>

<style scoped></style>
