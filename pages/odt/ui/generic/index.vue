<template>
  <div>
    <v-container fluid>
      <GenericPage>
        <template
          #default="{
            pages,
            selections,
            selectionPageId,
            currentPageSelected,
            subs,
            subsOfPageSelected,
            subSelected,
          }"
        >
          <v-row>
            <v-col cols="12" sm="2">
              <v-sheet rounded="lg" min-height="268">
                <!--  -->
                <TreeGeneric
                  :pages="pages"
                  :selection-page-id="selectionPageId"
                />
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="8">
              <v-sheet min-height="70vh" rounded="lg">
                <!--  -->
                <v-card flat v-show="currentPageSelected">
                  <v-card-text>
                    <TitleGeneric :page="currentPageSelected" />
                    <NavigationGeneric :selections="selections" />
                    <BaseSubsGeneric
                      :page="currentPageSelected"
                      :subs="subsOfPageSelected"
                    />
                    <v-divider style="opacity: 0.5" />
                    <div>
                      <SubOptionsGeneric :sub="subSelected">
                        <template v-slot:field_dictionary>
                          <v-divider class="mx-4" style="opacity: 0.5" />
                          <v-card-text class="py-0">
                            <!--<GridFieldsGeneric />-->
                            <FieldsOfSubGeneric
                              @onFieldsChange="onFieldsChange"
                            >
                              <template v-slot:title>
                                Field Dictionary
                              </template>
                            </FieldsOfSubGeneric>
                          </v-card-text>
                        </template>
                      </SubOptionsGeneric>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </template>
      </GenericPage>
    </v-container>
  </div>
</template>

<script>
import TreeGeneric from '~/features/odt/generic/TreeGeneric'
import TitleGeneric from '~/features/odt/generic/TitleGeneric'
import NavigationGeneric from '~/features/odt/generic/NavigationGeneric'
import BaseSubsGeneric from '~/features/odt/generic/BaseSubsGeneric'
import GridFieldsGeneric from '~/features/odt/generic/GridFieldsGeneric'
import GenericPage from '~/features/odt/generic/genericCore'
import SubOptionsGeneric from '~/features/odt/generic/SubOptionsGeneric'
import FieldsOfSubGeneric from '~/features/odt/generic/FieldsOfSubGeneric'

export default {
  components: {
    FieldsOfSubGeneric,
    SubOptionsGeneric,
    GenericPage,
    GridFieldsGeneric,
    BaseSubsGeneric,
    NavigationGeneric,
    TitleGeneric,
    TreeGeneric,
  },
  methods: {
    onFieldsChange() {},
  },
}
</script>

<style scoped></style>
