<template>
  <div class="px-2">
    <div>
      <CreateBy :creator="items.creator" :members="members"/>
      <v-divider></v-divider>
    </div>
    <div v-if="items.type === 'evidences'">
      <Disputes :disputed="items.disputed" @update="change('disputed', $event)"/>
      <v-divider></v-divider>
    </div>
    <div v-if="items.type === 'evidences'">
      <SliderRow text="Relevant" :value="items.relevant" @update="change('relevant', $event)"/>
      <v-divider></v-divider>
      <SliderRow
        text="Materiality"
        :value="items.materiality"
        @update="change('materiality', $event)"
      />
      <v-divider></v-divider>
      <SliderRow
        text="Admissibility"
        :value="items.admissibility"
        @update="change('admissibility', $event)"
      />
      <v-divider></v-divider>
    </div>
    <div v-if="items.type === 'hearsay'">
      <SwitchRow text="Exception" :value="items.exception" @update="updateException"/>
      <v-divider></v-divider>
      <SwitchRow
        text="Declarant available"
        :value="items.available"
        @update="change('available', $event)"
      />
      <v-divider></v-divider>
      <ExceptionType
        :available="items.available"
        :exception="items.exception"
        :exceptionType="items.exceptionType"
        @update="change('exceptionType', $event)"
      />
      <v-divider></v-divider>
    </div>
    <div v-if="items.type === 'testimony'">
      <SwitchRow text="Under Oath" :value="items.underOath" @update="change('underOath', $event)"/>
      <v-divider></v-divider>
    </div>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Originial Date</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <IndexDetailOriginial :originial="items.originial" @update="change('originial', $event)"/>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Favorable</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="favorableJoin"
          :items="favorablesMapColor"
          keyText="name"
          keyColor="color"
          @select="change('favorable', $event.id)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Provided by</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="providedJoin"
          :items="favorablesMapColor"
          keyText="name"
          keyColor="color"
          @select="change('provided', $event.id)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div>
      <AuthoredBy
        :listCharacter="character"
        :characters="items.characters"
        @update="updateIndexDetail"
      />
      <v-divider></v-divider>
    </div>
    <v-row no-gutters class="pa-2">
      <v-col cols="3">
        <span class="subheading font-weight-bold">Tag</span>
      </v-col>
      <v-col cols="9" align-center class="label text-xs-center">
        <IndexDetailTag :tag="items.tag"/>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { favorables, colorsListForAvatars } from "../../config";
import IndexDetailTag from "./IndexDetailTag";
import IndexDetailOriginial from "./IndexDetailOriginial";
import SelectInline from "../menus/SelectInline";
import CreateBy from "./right/CreateBy";
import Disputes from "./right/Disputes";
import SliderRow from "./right/SliderRow";
import SwitchRow from "./right/SwitchRow";
import ExceptionType from "./right/ExceptionType";
import AuthoredBy from "./right/AuthoredBy";
export default {
  components: {
    IndexDetailTag,
    IndexDetailOriginial,
    SelectInline,
    CreateBy,
    Disputes,
    SliderRow,
    SwitchRow,
    ExceptionType,
    AuthoredBy
  },
  props: {
    items: Object
  },
  data() {
    return {
      favorables,
      colorsListForAvatars
    };
  },
  computed: {
    favorablesMapColor() {
      return this.favorables.map((x, i) => ({
        ...x,
        color: this.colorsListForAvatars[i]
      }));
    },
    providedJoin() {
      return (
        this.favorablesMapColor.find(x => x.id === this.items.provided) || {}
      );
    },
    favorableJoin() {
      return (
        this.favorablesMapColor.find(x => x.id === this.items.favorable) || {}
      );
    },
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    change(name, value) {
      const data = { [name]: value };
      this.updateIndexDetail(data);
    },
    updateException(status) {
      if (!status) {
        this.change("exceptionType", "N/A");
      }
      this.change("exception", status);
    },
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["updateIndexDetail"])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.label /deep/ .label-item {
  flex-wrap: wrap;
}
</style>

