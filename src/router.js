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
			path: '/about',
			name: 'about',
			component: () =>
				import(/* webpackChunkName: "about" */ './views/About.vue'),
		},
		{
			path: '/residencies',
			name: 'residencies',
			component: () =>
				import(/* webpackChunkName: "members" */ './views/Residencies.vue'),
		},
		{
			path: '/members',
			name: 'members',
			component: () =>
				import(/* webpackChunkName: "members" */ './views/Members.vue'),
		},
	],
});
