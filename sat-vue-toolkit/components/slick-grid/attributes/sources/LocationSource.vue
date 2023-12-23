<template>
  <v-card>
    <v-card-subtitle>Change Location</v-card-subtitle>
    <v-card-text>
      <Location :value="locationRaw"
                @placechanged="getAddressData"
                @input="locationChange"/>
    </v-card-text>
  </v-card>
</template>
<script>
    import {Location} from "@/sat-vue-toolkit/components";
    export default {
        name: 'LocationSource',
        components: {Location},
        data() {
            return {
                location: '',
                val: '',
                uiShowMenu: false,
            }
        },
        computed: {
            locationRaw() {
                return (
                    (this.company && this.company.location && this.company.location.raw) ||
                    ""
                );
            },
        },
        watch: {

        },
        methods: {
            locationChange(event) {
                try {
                    this.location = {
                        raw: event.target.value.trim()
                    };
                }catch (e) {
                    this.location = {
                        raw: event
                    };
                }
            },
            getAddressData(location) {
                this.location = location;
                this.clickItem(location)
            },
            clickItem(val) {
                try {
                    this.$$execute({val})
                    this.uiShowMenu = false
                } catch (e) {
                }
            },
        },
        filters: {
            address(v) {
                try {
                    return  v.target.value
                }catch (e) {
                    return v
                }
            }
        }
    }
</script>
<style scoped></style>


