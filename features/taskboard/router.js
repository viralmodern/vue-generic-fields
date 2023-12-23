function view(name, resolve) {
  // eslint-disable-line
  return function(resolve) {
    return require([`./views/${name}.vue`], resolve)
  }
}
export default [
  {
    path: '/ui-dashboard',
    name: 'ui-dashboard',
    component: view('Dashboard')
  },
  {
    path: '/ui-taskboard/:id',
    name: 'ui-task-board',
    component: view('TaskBoard')
  },
  { path: '*', component: view('NotFound') }
]
// import router from "@/router";
// router.addRoutes(paths)
