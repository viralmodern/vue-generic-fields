<template>
  <GenericFieldsBaseViews>
    <FormDrivenFields />
  </GenericFieldsBaseViews>
</template>

<script>
import FormDrivenFields from '../../features/generic-fields/components/FormDrivenFields'
import GenericFieldsBaseViews from '../../features/generic-fields/components/GenericFieldsBaseViews'

export default {
  components: { GenericFieldsBaseViews, FormDrivenFields },
  layout: 'app',
  head() {
    return {
      title: 'Generic fields',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },

  computed: {},
}
</script>
