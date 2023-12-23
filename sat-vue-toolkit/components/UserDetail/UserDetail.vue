<template>
    <span v-if="user" :title="name">
        <slot name="user" :user="user" :user-name="name">
            <v-avatar color="primary" :size="25">
                <img v-if="user.avatar" :src="user.avatar" :alt="name">
                <span v-else class="white--text font-weight-bold text-caption">
                    {{name.substring(0, 2)}}
                </span>
            </v-avatar>
        </slot>
    </span>
</template>

<script>
    import storeAutoloadable from '../../mixins/store-autoloadable'
    import storeModule from './store'

    export default {
        name: "UserDetail",
        mixins: [storeAutoloadable('users', storeModule)],
        props: {
            pk: {
                type: [Number, String],
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {
            user() {
                try {
                    return this.$store.getters['users/getUserByPK'](this.pk)
                }catch (e) {
                    return null
                }
            },
            name() {
              if (!this.user) {
                return ""
              }
              let name = `${this.user.first_name} ${this.user.last_name}`.trim();
              let fullName = `${this.user.name}`
              return fullName ? fullName : name ? name : this.user.pk.toString();
            }
        },
        created() {
            if (!this.user) {
                this.$store.dispatch("users/fetchUser", this.pk);
            }
        }
    }
</script>
