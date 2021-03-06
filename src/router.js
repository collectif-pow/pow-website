import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/references',
      name: 'references',
      component: () =>
        import(/* webpackChunkName: "members" */ './views/References.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () =>
        import(/* webpackChunkName: "members" */ './views/Projects.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () =>
        import(/* webpackChunkName: "members" */ './views/Project.vue'),
    },
    {
      path: '/members',
      name: 'members',
      component: () =>
        import(/* webpackChunkName: "members" */ './views/Members.vue'),
    },
  ],
})
