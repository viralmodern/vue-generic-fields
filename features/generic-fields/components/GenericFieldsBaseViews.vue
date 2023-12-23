<template>
  <v-main class="fill-height">
    <!--<v-card flat>
      <v-card-title class="text-h5">
        Workspace Settings
      </v-card-title>
      <v-card-text>
        Law practice management software made easy.
        <nuxt-link to="/matters">All Matters</nuxt-link>
      </v-card-text>
    </v-card>-->
    <v-container fluid>
      <div>
        <v-btn
          to="/generic-fields"
          depressed
          exact
          class="text-transform-unset"
        >
          Attributes
        </v-btn>
        <v-btn
          depressed
          to="/generic-fields/caf-setting"
          class="text-transform-unset"
        >
          CAF Settings
        </v-btn>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn depressed v-on="on" exact class="text-transform-unset">
              <v-icon small>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Template</span>
        </v-tooltip>
      </div>
      <div class="mx-n3">
        <slot></slot>
      </div>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'GenericFieldsBaseViews',
}
</script>

<style scoped></style>
