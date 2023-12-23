<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
         <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Add new injury
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'This field is required']"
              label="Injury"
              required
              append-icon="announcement"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="date"
                  readonly
                  label="Date"
                  v-on="on"
                  append-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="caused"
              :items="causedBy"
              label="Caused by"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ caused.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="injuryLabel"
              :items="label"
              :rules="[v => !!v || 'This field is required']"
              label="Injury Label"
              multiple
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ injuryLabel.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="reposiblities"
              :items="responsiblity"
              label="Responsiblity"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ reposiblities.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="damage"
              :items="damages"
              label="Damage"
              :rules="[v => !!v || 'This field is required']"
              multiple
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ damage.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="damageLabel"
              :items="labels"
              label="Damage Label"
              :rules="[v => !!v || 'This field is required']"
              multiple
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ damageLabel.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="tag"
              :items="tags"
              label="Tag"
              :rules="[v => !!v || 'This field is required']"
              multiple
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ tag.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { causedBy } from "../../config";
import { responsiblity } from "../../config";
export default {
  props: {
    isShow: Boolean,
    dataInvoice: Array
  },
  data() {
    return {
      causedBy,
      responsiblity,
      valid: true,
      menuDate: false,
      date: "",
      reposiblities: "",
      name: "",
      injuryLabel: "",
      damage: "",
      damageLabel: "",
      tag: "",
      caused: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          date: this.date,
          responsiblity: this.reposiblities,
          causedBy: this.caused,
          name: this.name,
          injuryLabel: this.injuryLabel,
          damage: this.damage,
          damageLabel: this.damageLabel,
          tags: this.tag
        };
        this.$emit("addNegligence", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury", ["injurys"]),
    ...mapGetters("ht_store/matter/partient/injury/label", ["label"]),
    ...mapGetters("ht_store/matter/partient/damage", ["damages"]),
    ...mapGetters("ht_store/matter/partient/damage/label", ["labels"]),
    ...mapGetters("ht_store/matter/partient/tag", ["tags"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
