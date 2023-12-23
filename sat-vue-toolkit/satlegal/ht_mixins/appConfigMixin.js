import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigListContentType",
      "appConfigConstants",
      "appConfigChoices"
    ])
  },
  methods: {
    $_appConfigMixin_filterValueByContentType(type, relations) {
      const result = relations ? relations.first_class_relations : [];
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      if (result) {
        return result.filter(x => x.content_type_id === contentTypeId);
      }
      return [];
    }
  }
};
