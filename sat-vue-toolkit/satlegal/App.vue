<template>
  <div @click="appClick">
    <component :is="layout">
      <router-view v-if="isValidDomain"/>
    </component>
  </div>
</template>

<script>
    import {mapMutations, mapActions} from "vuex";
    import {$$STORE_PREFIX, getSubdomain, isValidSubdomain, SESSION, setSESSION} from "./utils";
    // LoggedIn | NotLoggedIn
    const DefaultLayout = "LoggedIn";
    // const DefaultLayout = "NotLoggedIn";
    export default {
        name: "App",
        created() {
            if (this.$route.query.token) {
                setSESSION(SESSION.TOKEN, this.$route.query.token);
            }
            if (process.env.NODE_ENV !== "production") {
                let routes = [];
                this.$router.options.routes.forEach(route => {
                    let {path, name} = route;
                    if (path !== "*") {
                        if (!name) {
                            return alert(`Rout ${path} must have a name`);
                        }
                        routes.push({path, name});
                    }
                });
                if (!routes.length) {
                    this.$http.post("/sync-routes", routes).catch(() => {
                    });
                }
            }
            this.$http.interceptors.response.use(undefined, err => {
                return new Promise(() => {
                    if (
                        err.response.status === 401 &&
                        err.config &&
                        !err.config.__isRetryRequest
                    ) {
                        this.$store.dispatch("ht_store/auth/logout").then(() => {
                            this.$router.push({
                                path: "/signin",
                                query: {redirect: this.$route.fullPath}
                            });
                        });
                    }
                    throw err;
                });
            });
            // this.$store.getters["ht_store/auth/isLoggedIn"]
            if (
                this.$store.getters['ht_store/auth/token'] &&
                !this.$store.getters['ht_store/auth/user'].pk &&
                isValidSubdomain(getSubdomain(location.hostname))
            ) {
                this.$store
                    .dispatch("ht_store/auth/getUser")
                    .then(async data => {
                        this.getDataAppConfigRequest();
                        //this.$store.dispatch("user/setCurrentUser", data);
                        this.setCurrentUser(data);
                        let subdomain = getSubdomain(location.hostname);
                        if (this.$route.name !== "inviteMembers") {
                            if (this.$router.currentRoute.meta.layout === "NotLoggedIn") {
                                this.$router.replace({name: "HomeProject"});
                            }
                            // console.log('ROUTER',this.$router);
                        }
                        if (subdomain) {
                            for (let i = 0; i < data.companies.length; i++) {
                                if (data.companies[i].subdomain === subdomain) {
                                    this.$store
                                        .dispatch("ht_store/company/loadCompany", data.companies[i].pk)
                                        .catch(() => {
                                        });
                                    break;
                                }
                            }
                        }
                    })
                    .catch(() => {
                    });
            } else if (
                this.$route.name !== "password_reset_confirm" &&
                this.$route.name !== "createproject" &&
                this.$route.name !== "inviteMembers" &&
                this.$route.name !== "join-invite"
            ) {
                // TODO: when remove token
                this.$router.replace({name: "signin"});
            }
        },
        computed: {
            layout() {
                return this.$route.meta.layout || DefaultLayout;
            },
            isValidDomain() {
                let subdomain = getSubdomain(location.hostname);
                return !subdomain || isValidSubdomain(subdomain);
            }
        },
        methods: {
            ...mapMutations("ht_store/user", ["setCurrentUser"]),
            ...mapActions("ht_store/workspace/appConfigs", ["getDataAppConfigRequest"]),
            appClick(e) {
                this.$eventHub.$emit(this.$eventTypes.appClick, e);
            }
        }
    };
</script>
<style lang="scss">
  .application {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial,
    sans-serif !important;
    line-height: 1.5;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
    .v-application {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif !important;

      * {
        /*font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;*/
      }
    }
  }


</style>
