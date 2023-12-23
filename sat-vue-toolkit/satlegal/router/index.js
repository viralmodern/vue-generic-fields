import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import Meta from "vue-meta";
Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths,
  // scrollBehavior: function(to, from, savedPosition) {
  scrollBehavior: function(to) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return {x: 0, y: 0}
    }
  },
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!store.getters["auth/isLoggedIn"]) {
//       next({
//         path: "/signin",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();

//     }
//   } else {
//     next(); // make sure to always call next()!
//   }
// });

export default router;
