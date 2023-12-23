<template>
  <div>
    <attributes-list>
      <template slot-scope="{ data }">
        <div>
          <FeatureDashboard />
        </div>
      </template>
    </attributes-list>
  </div>
</template>

<script>
import FeatureDashboard from '../../../../../features/taskboard/views/Dashboard'
import AttributesList from '../../../../../components/utils/AttributesList'
export default {
  components: { AttributesList, FeatureDashboard },
  created() {
    console.log('$vuetify', this.$vuetify)
  }
}
</script>

<style scoped></style>
