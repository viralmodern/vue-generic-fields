<template>
  <div style="width: 100px">
    <v-edit-dialog>
      <v-chip
        color="success"
        class="cusor--pointer d-block text-center"
        style="border-radius: 0px;">
        YES
      </v-chip>
      <template v-slot:input>
        <v-card class="card shadow" max-width="180px">
          <v-card-text class="card-body">
            <p class="title_head ma-0 font-weight-bold">
              Need Jury Demand?
            </p>

            <v-switch hide-details
                      class="mt-0"
                      :ripple="false"
            ></v-switch>
          </v-card-text>
        </v-card>
      </template>
    </v-edit-dialog>
  </div>
</template>

<script>
    export default {
        name: "SwitchChoose"
    }
</script>

<style scoped>

</style>
