import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

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
			path: '/collaborations',
			name: 'collaborations',
			component: () =>
				import(/* webpackChunkName: "members" */ './views/Collaborations.vue'),
		},
		{
			path: '/projects',
			name: 'projects',
			component: () =>
				import(/* webpackChunkName: "members" */ './views/Projects.vue'),
		},
		{
			path: '/members',
			name: 'members',
			component: () =>
				import(/* webpackChunkName: "members" */ './views/Members.vue'),
		},
	],
});
