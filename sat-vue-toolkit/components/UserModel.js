/*
<template>
    <span v-if="user" :title="name">
    <slot
    :user="user" :name="name">
    <v-avatar color="primary"
    :size="25">
    <img v-if="user.avatar" :src="user.avatar" :alt="name">
                <span v-else class="white--text font-weight-bold caption">
                    {{name.substring(0, 2)}}
                </span>
</v-avatar>
</slot>
</span>
</template>
*/
import storeAutoloadable from '../mixins/store-autoloadable'
import storeModule from './UserDetail/store'
export default {
    name: "UserModel",
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
            try {
                this.$store.dispatch("users/fetchUser", this.pk);
            }catch (e) {

            }
        }
    },
    render() {
        return this.$scopedSlots.default({
            user: this.user,
            name: this.name
        })
    },
}
