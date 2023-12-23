<template>
  <div>
    <!--// Court District, Priority, Matter Type, Risk Level, Matter Stage, Client, Active, Jury Demand,-->
    <v-menu offset-y :close-on-content-click="false" max-height="45vh">
      <template v-slot:activator="{ on }">
        <div
          v-on="on"
          class="d-flex align-center text-caption font-weight-bold cusor--pointer ml-2"
        >
          <v-subheader>
            <v-icon small class="mr-1">mdi-swap-horizontal</v-icon>
            Customize
          </v-subheader>
        </div>
      </template>
      <slot>
<!--        <customize-fields />-->
      </slot>
    </v-menu>
  </div>
</template>

<script>
// import CustomizeFields from './CustomizeFields'

export default {
  name: 'MenuShowHideFields',
  // components: { CustomizeFields }
}
</script>

<style scoped></style>
