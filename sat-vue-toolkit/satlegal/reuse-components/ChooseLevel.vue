<template>
  <div style="width: 150px">
    <v-edit-dialog>
      <v-btn
        icon>
        <v-icon v-if="level"
                :color="level.color">mdi-flag</v-icon>
        <v-icon v-else
                color="black">mdi-flag</v-icon>
      </v-btn>
      <!--<v-chip
        color="success"
        class="cusor&#45;&#45;pointer d-block text-center"
        style="border-radius: 0px;">
        YES
      </v-chip>-->
      <template v-slot:input>
        <v-card flat>
          <v-card-text>
            <p>Choose level</p>
            <v-radio-group column class="ma-0" v-model="level">
              <v-radio class="radio-custom-slick" v-for="item in list"
                       :key="'mn-priority-'+item.id"
                       :ripple="false"
                       label="red"
                       :color="item.color"
                       :value="item">
                <template v-slot:label class="mb-0">
                  <div class="d-flex align-center">
                    <div class="mr-1 d-flex justify-center" style="width: 30px;">
                      <i v-for="i in item.icon_num"
                         :style="{color: item.color}"
                         :key="i"
                         class="fa fa-exclamation" aria-hidden="true"></i>
                    </div>
                    <small class="black--text">{{item.title}}</small>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </template>
    </v-edit-dialog>
  </div>
</template>

<script>
  export default {
    name: "ChooseLevel",
    data() {
      return {
        level: null,
        list: [
          {title: 'Very Low', color: '#37474f', id: 1, icon_num: 1},
          {title: 'Low', color: '#5e72e4', id: 2, icon_num: 1},
          {title: 'Normal', color: '#ffbb33', id: 3, icon_num: 1},
          {title: 'High', color: '#ff9f1a', id: 4, icon_num: 3},
          {title: 'Very High', color: '#f5365c', id: 5, icon_num: 3},
          {title: 'N/A', color: '#37474f', id: 6, icon_num: 1}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
